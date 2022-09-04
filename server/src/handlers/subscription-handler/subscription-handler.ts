// SHARED IMPORTS
import { SocketEventType } from '@types';
import { ISocketManager } from '@interfaces';
import { SOCKET_EVENT } from '@constants';
import { getTimestamp, decrypt } from '@utils';

const subscriptionHandler = (socketManager: ISocketManager, message: string) => {
  const { type, data } = JSON.parse(message) as SocketEventType;

  switch (type) {
    case SOCKET_EVENT.MESSAGE.SEND:
      socketManager.send({
        timestamp: getTimestamp(),
        type: SOCKET_EVENT.MESSAGE.RECEIVE,
        data: {
          user: {
            uuid: data.user!.uuid,
            name: decrypt(data.user!.name)
          },
          room: {
            uuid: data.room!.uuid,
            name: decrypt(data.room!.name)
          },
          message: decrypt(data.message!)
        }
      });
      break;
    case SOCKET_EVENT.INFO.USER_CONNECTED:
    case SOCKET_EVENT.INFO.USER_DISCONNECTED:
      socketManager.send({
        timestamp: getTimestamp(),
        type,
        data
      });
      break;
    default:
      break;
  }
};

export default subscriptionHandler;
