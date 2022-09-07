// EXTERNAL IMPORTS
import { createClient } from 'redis';

// SHARED IMPORTS
import { CONFIG } from '@constants';

const getRedisClient = async () =>
  createClient({
    socket: {
      host: CONFIG.REDIS.HOST,
      port: CONFIG.REDIS.PORT
    }
  });

export default getRedisClient;
