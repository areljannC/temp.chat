// EXTERNAL IMPORTS
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { RedisClientType } from 'redis';

// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { SocketManager } from '@classes';
import { Cache, Statistics } from '@singletons';
import { getTimestamp, getRedisClient, decrypt } from '@utils';

// LOCAL IMPORTS
import {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
  sendMessageHandler
} from './handlers';

// Express
const api = express();

// Middleware
api.use(cors());
api.use(express.json());

// Endpoints
api.get('/ping', (_: Request, response: Response) =>
  response.status(200).json({
    message: 'pong',
    timestamp: getTimestamp()
  })
);

api.get('/uuid', (_: Request, response: Response) =>
  response.status(200).json({
    data: { uuid: uuid() },
    message: 'Successfully generated a UUID.',
    timestamp: getTimestamp()
  })
);

// HTTP Server
const server = http.createServer(api);

// WebSockets
const wss = new WebSocketServer({ server });

wss.on('connection', async (ws: WebSocket) => {
  // Create socket manager.
  let socketManager: ISocketManager | undefined = new SocketManager(
    ws,
    (await getRedisClient()) as RedisClientType,
    (await getRedisClient()) as RedisClientType
  );

  // Connect subscriber and publisher to Redis.
  await socketManager.connect({ subscriber: true, publisher: true });

  ws.on('message', async (event: string) => {
    const { type } = JSON.parse(event) as SocketEventType;

    switch (type) {
      case SOCKET_EVENT.ROOM.CREATE:
        await createRoomHandler(socketManager!, event);
        break;
      case SOCKET_EVENT.ROOM.JOIN:
        await joinRoomHandler(socketManager!, event);
        break;
      case SOCKET_EVENT.ROOM.LEAVE:
        await leaveRoomHandler(socketManager!, event);
        break;
      case SOCKET_EVENT.MESSAGE.SEND:
        await sendMessageHandler(socketManager!, event);
        break;
      case SOCKET_EVENT.WHISPER.SEND:
        break;
      default:
        break;
    }
  });

  ws.on('close', async () => {
    // Get the cache client.
    const cache = await Cache.getClient();

    // Remove the user from the room hash set.
    await cache.hDel(socketManager!.room!.cacheKey!, socketManager!.user!.uuid);

    // Decrement the room user count by 1.
    await cache.hIncrBy(socketManager!.room!.cacheKey!, 'users', -1);

    // Update users statistics.
    await Statistics.updateUsersCountBy({ current: -1 });

    // Delete the room if it is empty.
    if (Number(await cache.hGet(socketManager!.room!.cacheKey!, 'users')) <= 0) {
      await cache.del(socketManager!.room!.cacheKey!);

      // Update rooms statistics.
      if (socketManager!.room!.password) {
        await Statistics.updatePrivateRoomsCountBy({ current: -1 });
      } else {
        await Statistics.updatePublicRoomsCountBy({ current: -1 });
      }
    }

    // Make the user unsubscribe from the channel.
    await socketManager!.unsubscribe(socketManager!.room!.cacheKey!);

    // Notify other users that this user has disconnected from the room.
    await socketManager!.publish(socketManager!.room!.cacheKey!, {
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.USER_DISCONNECTED,
      data: { message: `${decrypt(socketManager!.user!.name)} disconnected.` }
    });

    // Disconnect the subscriber and publisher from the cache.
    socketManager!.disconnect({ socket: false, subscriber: true, publisher: true });

    // Delete socket manager class (garbage-collect).
    socketManager = undefined;
  });
});

// Statistics Manager
async () => {
  await Statistics.initialize();
};

export default server;
