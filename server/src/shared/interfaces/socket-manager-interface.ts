// EXTERNAL IMPORTS
import { WebSocket } from 'ws';
import { RedisClientType } from 'redis';

// SHARED IMPORTS
import { RoomType, UserType, SocketEventType } from '@types';

interface ISocketManager {
  socket: WebSocket;
  subscriber: RedisClientType;
  publisher: RedisClientType;
  user: UserType | undefined;
  room: (RoomType & { cacheKey?: string }) | undefined;

  setUser(user: UserType): void;
  setRoom(room: RoomType & { cacheKey?: string }): void;
  connect(connections: { subscriber: boolean; publisher: boolean }): Promise<void>;
  disconnect(connections: {
    socket: boolean;
    subscriber: boolean;
    publisher: boolean;
  }): Promise<void>;
  send(socketEvent: SocketEventType): void;
  subscribe(channel: string, callback: (message: string) => void): Promise<void>;
  unsubscribe(channel: string): Promise<void>;
  publish(channel: string, message: any): Promise<void>;
}

export default ISocketManager;
