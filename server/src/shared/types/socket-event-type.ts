// SHARED IMPORTS
import { UserType, RoomType } from '@types';

type SocketEventType = {
  timestamp: number;
  type: string;
  data: {
    user?: UserType;
    room?: RoomType;
    message?: string;
  };
};

export default SocketEventType;
