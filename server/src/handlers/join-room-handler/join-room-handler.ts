// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { Cache } from '@singletons';
import { socketEventSchema } from '@schemas';
import { getTimestamp, encrypt, decrypt } from '@utils';

// LOCAL IMPORTS
import { subscriptionHandler } from '../';

const joinRoomHandler = async (socketManager: ISocketManager, socketEventBuffer: string) => {
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

  // If the room does not exist, do not join.
  if (!(await cache.exists(socketManager.room!.cacheKey!))) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.ROOM_NOT_EXIST,
      data: { message: 'Chatroom does not exist.' }
    });
    return;
  }

  // If the room is private, verify that the passwords match.
  if (
    socketManager.room!.password &&
    (await cache.hGet(socketManager.room!.cacheKey!, 'password')) !== socketManager.room!.password
  ) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.INCORRECT_ROOM_PASSWORD,
      data: { message: 'Chatroom password incorrect.' }
    });
    return;
  }

  // If the user is already in the room, do not join.
  if (await cache.hExists(socketManager.room!.cacheKey!, socketManager.user!.uuid)) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.USER_ALREADY_IN_ROOM,
      data: { message: 'User already in room.' }
    });
    return;
  }

  // Add the user to the room hash set.
  await cache.hSet(socketManager.room!.cacheKey!, socketManager.user!.uuid, getTimestamp());

  // Increment the room user count by 1.
  await cache.hIncrBy(socketManager.room!.cacheKey!, 'users', 1);

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
};

export default joinRoomHandler;
