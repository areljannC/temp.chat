// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { Cache } from '@singletons';
import { socketEventSchema } from '@schemas';
import { getTimestamp } from '@utils';

const leaveRoomHandler = async (socketManager: ISocketManager, socketEventBuffer: string) => {
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

  // If the room does not exist, do not leave.
  if (!(await cache.exists(socketManager.room!.cacheKey!))) {
    socketManager.send({
      timestamp: getTimestamp(),
      type: SOCKET_EVENT.INFO.ROOM_NOT_EXIST,
      data: { message: 'Chatroom does not exist.' }
    });
    return;
  }

  // Disconnect the socket.
  socketManager.disconnect({ socket: true, subscriber: false, publisher: false });
};

export default leaveRoomHandler;
