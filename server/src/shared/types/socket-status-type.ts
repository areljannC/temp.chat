// SHARED IMPORTS
import { SOCKET_STATUS } from '@constants';

type SocketStatusType =
  | typeof SOCKET_STATUS.CONNECTING
  | typeof SOCKET_STATUS.CONNECTED
  | typeof SOCKET_STATUS.DISCONNECTED
  | typeof SOCKET_STATUS.ERROR;

export default SocketStatusType;
