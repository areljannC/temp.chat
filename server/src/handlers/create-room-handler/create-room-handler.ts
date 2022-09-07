// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { Cache, Statistics } from '@singletons';
import { socketEventSchema } from '@schemas';
import { getTimestamp, encrypt, decrypt } from '@utils';

// LOCAL IMPORTS
import { subscriptionHandler } from '../';

const createRoomHandler = async (socketManager: ISocketManager, socketEventBuffer: string) => {
  // Parse socket event buffer to a JSON.
  const socketEvent = JSON.parse(socketEventBuffer) as SocketEventType;

  // Validate the socket event.
  const validation = socketEventSchema.validate(socketEvent);
  if (validation.error) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.INVALID_SOCKET_EVENT,
      data: { message: validation.error.message }
    });
    return;
  }

  // Set the socket user info.
  socketManager.setUser({
    uuid: socketEvent.data.user!.uuid,
    name: encrypt(socketEvent.data.user!.name)
  });

  // Set the socket room info.
  socketManager.setRoom({
    uuid: socketEvent.data.room!.uuid,
    name: encrypt(socketEvent.data.room!.name),
    password: socketEvent.data.room!.password
      ? encrypt(socketEvent.data.room!.password!)
      : undefined,
    cacheKey: socketEvent.data.room!.password
      ? `rooms:private:${socketEvent.data.room!.uuid}`
      : `rooms:public:${socketEvent.data.room!.uuid}`
  });

  // Get the cache client.
  const cache = await Cache.getClient();

  // If the room exists, do not create it.
  if (await cache.exists(socketManager.room!.cacheKey!)) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.ROOM_EXISTS,
      data: { message: 'Chatroom already exists.' }
    });
    return;
  }

  // Create a room hash set with user UUIDs with a timestamp of when they joined.
  await cache.hSet(socketManager.room!.cacheKey!, socketManager.user!.uuid, getTimestamp());

  // If the room is private, add the password to the room hash set.
  if (socketManager.room!.password) {
    await cache.hSet(socketManager.room!.cacheKey!, 'password', socketManager.room!.password!);
  }

  // Set the room user count to 1.
  await cache.hSet(socketManager.room!.cacheKey!, 'users', 1);

  // Make the socket subscribe to the room channel.
  await socketManager.subscribe(socketManager.room!.cacheKey!, (message: string) => {
    subscriptionHandler(socketManager, message);
  });

  // Notify other users that this user has connected to the room.
  await socketManager.publish(socketManager.room!.cacheKey!, {
    timestamp: getTimestamp(),
    type: SOCKET_EVENT.INFO.USER_CONNECTED,
    data: { message: `${decrypt(socketManager.user!.name)} connected.` }
  });

  // Update users statistics.
  await Statistics.updateUsersCountBy({ current: 1, total: 1 });

  // Update rooms statistics.
  if (socketManager!.room!.password) {
    await Statistics.updatePrivateRoomsCountBy({ current: 1, total: 1 });
  } else {
    await Statistics.updatePublicRoomsCountBy({ current: 1, total: 1 });
  }
};

export default createRoomHandler;
