// EXTERNAL IMPORTS
import { WebSocket } from 'ws';
import { RedisClientType } from 'redis';

// SHARED IMPORTS
import { RoomType, SocketEventType, UserType } from '@types';
import { ISocketManager } from '@interfaces';

class SocketManager implements ISocketManager {
  public socket: WebSocket;
  public subscriber: RedisClientType;
  public publisher: RedisClientType;
  public user: UserType | undefined;
  public room: (RoomType & { cacheKey?: string }) | undefined;

  constructor(socket: WebSocket, subscriber: RedisClientType, publisher: RedisClientType) {
    this.socket = socket;
    this.subscriber = subscriber;
    this.publisher = publisher;
    this.user = undefined;
    this.room = undefined;
  }

  setUser(user: UserType): void {
    this.user = user;
  }

  setRoom(room: RoomType & { cacheKey?: string }): void {
    this.room = room;
  }

  async connect(connections: { subscriber: boolean; publisher: boolean }): Promise<void> {
    if (connections.subscriber && !this.subscriber.isOpen) await this.subscriber.connect();
    if (connections.publisher && !this.publisher.isOpen) await this.publisher.connect();
  }

  async disconnect(connections: {
    socket: boolean;
    subscriber: boolean;
    publisher: boolean;
  }): Promise<void> {
    if (connections.socket && this.socket.readyState === WebSocket.OPEN) this.socket.close();
    if (connections.subscriber && this.subscriber.isOpen) await this.subscriber.disconnect();
    if (connections.publisher && this.publisher.isOpen) await this.publisher.disconnect();
  }

  send(socketEvent: SocketEventType): void {
    this.socket.send(JSON.stringify(socketEvent));
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    await this.subscriber.subscribe(channel, callback);
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }

  async publish(channel: string, message: any): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(message));
  }
}

export default SocketManager;
