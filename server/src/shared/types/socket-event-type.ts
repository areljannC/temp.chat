// SHARED IMPORTS
import { UserType, RoomType } from '@types';
import { SOCKET_EVENT } from '@constants';

type SocketEventType = {
  timestamp: number;
  type:
    | typeof SOCKET_EVENT.ROOM.CREATE
    | typeof SOCKET_EVENT.ROOM.JOIN
    | typeof SOCKET_EVENT.ROOM.LEAVE
    | typeof SOCKET_EVENT.MESSAGE.SEND
    | typeof SOCKET_EVENT.MESSAGE.RECEIVE
    | typeof SOCKET_EVENT.WHISPER.SEND
    | typeof SOCKET_EVENT.WHISPER.RECEIVE
    | typeof SOCKET_EVENT.INFO.INVALID_SOCKET_EVENT
    | typeof SOCKET_EVENT.INFO.ROOM_EXISTS
    | typeof SOCKET_EVENT.INFO.ROOM_NOT_EXIST
    | typeof SOCKET_EVENT.INFO.INCORRECT_ROOM_PASSWORD
    | typeof SOCKET_EVENT.INFO.USER_ALREADY_IN_ROOM
    | typeof SOCKET_EVENT.INFO.USER_NOT_IN_ROOM
    | typeof SOCKET_EVENT.INFO.USER_CONNECTED
    | typeof SOCKET_EVENT.INFO.USER_DISCONNECTED;
  data: {
    user?: UserType;
    room?: RoomType;
    message?: string;
  };
};

export default SocketEventType;
