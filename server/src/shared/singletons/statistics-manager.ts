// EXTERNAL IMPORTS
import { RedisClientType } from '@redis/client';

// SHARED IMPORTS
import { CountStatisticsType } from '@types';
import { IStatisticsManager } from '@interfaces';
import { Cache } from '@singletons';

// Constants
const PUBLIC_ROOMS_COUNT = 'statistics:publicRoomsCount';
const PRIVATE_ROOMS_COUNT = 'statistics:privateRoomsCount';
const USERS_COUNT = 'statistics:usersCount';
const CURRENT = 'current';
const MAX = 'max';
const TOTAL = 'total';

class StatisticsManager implements IStatisticsManager {
  publicRoomsCount: CountStatisticsType;
  privateRoomsCount: CountStatisticsType;
  usersCount: CountStatisticsType;
  cache: RedisClientType | undefined;

  constructor() {
    this.publicRoomsCount = { current: 0, max: 0, total: 0 };
    this.privateRoomsCount = { current: 0, max: 0, total: 0 };
    this.usersCount = { current: 0, max: 0, total: 0 };
    this.cache = undefined;
  }

  async initialize(): Promise<void> {
    this.cache = (await Cache.getClient()) as RedisClientType;

    if (!(await this.cache.exists(PUBLIC_ROOMS_COUNT))) {
      await this.cache.hSet(PUBLIC_ROOMS_COUNT, CURRENT, 0);
      await this.cache.hSet(PUBLIC_ROOMS_COUNT, MAX, 0);
      await this.cache.hSet(PUBLIC_ROOMS_COUNT, TOTAL, 0);
    } else {
      this.publicRoomsCount.current = Number(await this.cache.hGet(PUBLIC_ROOMS_COUNT, CURRENT));
      this.publicRoomsCount.max = Number(await this.cache.hGet(PUBLIC_ROOMS_COUNT, MAX));
      this.publicRoomsCount.total = Number(await this.cache.hGet(PUBLIC_ROOMS_COUNT, TOTAL));
    }

    if (!(await this.cache.exists(PRIVATE_ROOMS_COUNT))) {
      await this.cache.hSet(PRIVATE_ROOMS_COUNT, CURRENT, 0);
      await this.cache.hSet(PRIVATE_ROOMS_COUNT, MAX, 0);
      await this.cache.hSet(PRIVATE_ROOMS_COUNT, TOTAL, 0);
    } else {
      this.privateRoomsCount.current = Number(await this.cache.hGet(PRIVATE_ROOMS_COUNT, CURRENT));
      this.privateRoomsCount.max = Number(await this.cache.hGet(PRIVATE_ROOMS_COUNT, MAX));
      this.privateRoomsCount.total = Number(await this.cache.hGet(PRIVATE_ROOMS_COUNT, TOTAL));
    }

    if (!(await this.cache.exists(USERS_COUNT))) {
      await this.cache.hSet(USERS_COUNT, CURRENT, 0);
      await this.cache.hSet(USERS_COUNT, MAX, 0);
      await this.cache.hSet(USERS_COUNT, TOTAL, 0);
    } else {
      this.usersCount.current = Number(await this.cache.hGet(USERS_COUNT, CURRENT));
      this.usersCount.max = Number(await this.cache.hGet(USERS_COUNT, MAX));
      this.usersCount.total = Number(await this.cache.hGet(USERS_COUNT, TOTAL));
    }
  }

  async updatePublicRoomsCountBy(count: CountStatisticsType): Promise<void> {
    if (count.current !== undefined) {
      await this.cache!.hIncrBy(PUBLIC_ROOMS_COUNT, CURRENT, count.current);
      this.publicRoomsCount.current = Number(await this.cache!.hGet(PUBLIC_ROOMS_COUNT, CURRENT));
    }

    if (count.max !== undefined) {
      await this.cache!.hIncrBy(PUBLIC_ROOMS_COUNT, CURRENT, count.max);
      this.publicRoomsCount.max = Number(await this.cache!.hGet(PUBLIC_ROOMS_COUNT, MAX));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(PUBLIC_ROOMS_COUNT, CURRENT, count.total);
      this.publicRoomsCount.total = Number(await this.cache!.hGet(PUBLIC_ROOMS_COUNT, TOTAL));
    }
  }

  async updatePrivateRoomsCountBy(count: CountStatisticsType): Promise<void> {
    if (count.current !== undefined) {
      await this.cache!.hIncrBy(PRIVATE_ROOMS_COUNT, CURRENT, count.current);
      this.privateRoomsCount.current = Number(await this.cache!.hGet(PRIVATE_ROOMS_COUNT, CURRENT));
    }

    if (count.max !== undefined) {
      await this.cache!.hIncrBy(PRIVATE_ROOMS_COUNT, CURRENT, count.max);
      this.privateRoomsCount.max = Number(await this.cache!.hGet(PRIVATE_ROOMS_COUNT, MAX));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(PRIVATE_ROOMS_COUNT, CURRENT, count.total);
      this.privateRoomsCount.total = Number(await this.cache!.hGet(PRIVATE_ROOMS_COUNT, TOTAL));
    }
  }

  async updateUsersCountBy(count: CountStatisticsType): Promise<void> {
    if (count.current !== undefined) {
      await this.cache!.hIncrBy(USERS_COUNT, CURRENT, count.current);
      this.usersCount.current = Number(await this.cache!.hGet(USERS_COUNT, CURRENT));
    }

    if (count.max !== undefined) {
      await this.cache!.hIncrBy(USERS_COUNT, CURRENT, count.max);
      this.usersCount.max = Number(await this.cache!.hGet(USERS_COUNT, MAX));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(USERS_COUNT, CURRENT, count.total);
      this.usersCount.total = Number(await this.cache!.hGet(USERS_COUNT, TOTAL));
    }
  }
}

export default StatisticsManager;
