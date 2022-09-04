// EXTERNAL IMPORTS
import { RedisClientType } from 'redis';

interface ICache {
  client: RedisClientType | undefined;

  getClient(): Promise<RedisClientType>;
}

export default ICache;
