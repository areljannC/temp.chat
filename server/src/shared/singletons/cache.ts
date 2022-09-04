// EXTERNAL IMPORTS
import { RedisClientType } from 'redis';

// SHARED IMPORTS
import { ICache } from '@interfaces';
import { getRedisClient } from '@utils';

class Cache implements ICache {
  client: RedisClientType | undefined;

  constructor() {
    this.client = undefined;
  }

  async getClient(): Promise<RedisClientType> {
    if (this.client) return this.client;
    const client = (await getRedisClient()) as RedisClientType;
    await client.connect();
    this.client = client;
    return this.client;
  }
}

export default new Cache();
