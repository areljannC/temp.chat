// EXTERNAL IMPORTS
import { createClient } from 'redis';

// SHARED IMPORTS
import { CONFIG } from '@constants';

const getRedisClient = async () =>
  createClient({
    password: CONFIG.REDIS.PASSWORD,
    socket: {
      host: CONFIG.REDIS.HOST,
      port: CONFIG.REDIS.PORT
    }
  });

export default getRedisClient;
