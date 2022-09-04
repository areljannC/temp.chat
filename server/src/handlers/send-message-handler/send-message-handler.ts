// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { Cache } from '@singletons';
import { socketEventSchema } from '@schemas';
import { getTimestamp, encrypt } from '@utils';

const sendMessageHandler = async (socketManager: ISocketManager, socketEventBuffer: string) => {
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

  // Get the cache client.
  const cache = await Cache.getClient();

  // If the room does not exist, do not send the message.
  if (!(await cache.exists(socketManager.room!.cacheKey!))) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.ROOM_NOT_EXIST,
      data: { message: 'Chatroom does not exist.' }
    });
    return;
  }

  // If the user is not in the room, do not send the message.
  if (!(await cache.hExists(socketManager.room!.cacheKey!, socketManager.user!.uuid))) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.USER_NOT_IN_ROOM,
      data: { message: 'User not in room.' }
    });
    return;
  }

  // Publish the message to the room channel.
  await socketManager.publish(socketManager.room!.cacheKey!, {
    timestamp: getTimestamp(),
    type: SOCKET_EVENT.MESSAGE.SEND,
    data: {
      user: {
        uuid: socketManager.user!.uuid,
        name: socketManager.user!.name
      },
      room: {
        uuid: socketManager.room!.uuid,
        name: socketManager.room!.name
      },
      message: encrypt(socketEvent.data.message!)
    }
  });
};

export default sendMessageHandler;
