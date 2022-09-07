// EXTERNAL IMPORTS
import { RedisClientType } from 'redis';

interface ICache {
  getClient(): Promise<RedisClientType>;
}

export default ICache;
