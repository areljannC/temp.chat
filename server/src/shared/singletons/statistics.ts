// EXTERNAL IMPORTS
import { RedisClientType } from '@redis/client';

// SHARED IMPORTS
import { CountStatisticsType } from '@types';
import { IStatistics } from '@interfaces';
import { Cache } from '@singletons';

// Constants
const PUBLIC_ROOMS_COUNT = 'statistics:publicRoomsCount';
const PRIVATE_ROOMS_COUNT = 'statistics:privateRoomsCount';
const USERS_COUNT = 'statistics:usersCount';
const CURRENT = 'current';
const TOTAL = 'total';

class Statistics implements IStatistics {
  private isInitialized: boolean;
  private cache: RedisClientType | undefined;
  public publicRoomsCount: CountStatisticsType;
  public privateRoomsCount: CountStatisticsType;
  public usersCount: CountStatisticsType;

  public constructor() {
    this.isInitialized = false;
    this.cache = undefined;
    this.publicRoomsCount = { current: 0, max: 0, total: 0 };
    this.privateRoomsCount = { current: 0, max: 0, total: 0 };
    this.usersCount = { current: 0, max: 0, total: 0 };
  }

  public async initialize(): Promise<void> {
    this.cache = (await Cache.getClient()) as RedisClientType;

    if (!(await this.cache.exists(PUBLIC_ROOMS_COUNT))) {
      await this.cache.hSet(PUBLIC_ROOMS_COUNT, CURRENT, 0);
      await this.cache.hSet(PUBLIC_ROOMS_COUNT, TOTAL, 0);
    } else {
      this.publicRoomsCount.current = Number(await this.cache.hGet(PUBLIC_ROOMS_COUNT, CURRENT));
      this.publicRoomsCount.total = Number(await this.cache.hGet(PUBLIC_ROOMS_COUNT, TOTAL));
    }

    if (!(await this.cache.exists(PRIVATE_ROOMS_COUNT))) {
      await this.cache.hSet(PRIVATE_ROOMS_COUNT, CURRENT, 0);
      await this.cache.hSet(PRIVATE_ROOMS_COUNT, TOTAL, 0);
    } else {
      this.privateRoomsCount.current = Number(await this.cache.hGet(PRIVATE_ROOMS_COUNT, CURRENT));
      this.privateRoomsCount.total = Number(await this.cache.hGet(PRIVATE_ROOMS_COUNT, TOTAL));
    }

    if (!(await this.cache.exists(USERS_COUNT))) {
      await this.cache.hSet(USERS_COUNT, CURRENT, 0);
      await this.cache.hSet(USERS_COUNT, TOTAL, 0);
    } else {
      this.usersCount.current = Number(await this.cache.hGet(USERS_COUNT, CURRENT));
      this.usersCount.total = Number(await this.cache.hGet(USERS_COUNT, TOTAL));
    }

    this.isInitialized = true;
  }

  public async updatePublicRoomsCountBy(count: CountStatisticsType): Promise<void> {
    if (!this.isInitialized) await this.initialize();

    if (count.current !== undefined) {
      await this.cache!.hIncrBy(PUBLIC_ROOMS_COUNT, CURRENT, count.current);
      this.publicRoomsCount.current = Number(await this.cache!.hGet(PUBLIC_ROOMS_COUNT, CURRENT));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(PUBLIC_ROOMS_COUNT, TOTAL, count.total);
      this.publicRoomsCount.total = Number(await this.cache!.hGet(PUBLIC_ROOMS_COUNT, TOTAL));
    }
  }

  public async updatePrivateRoomsCountBy(count: CountStatisticsType): Promise<void> {
    if (!this.isInitialized) await this.initialize();

    if (count.current !== undefined) {
      await this.cache!.hIncrBy(PRIVATE_ROOMS_COUNT, CURRENT, count.current);
      this.privateRoomsCount.current = Number(await this.cache!.hGet(PRIVATE_ROOMS_COUNT, CURRENT));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(PRIVATE_ROOMS_COUNT, TOTAL, count.total);
      this.privateRoomsCount.total = Number(await this.cache!.hGet(PRIVATE_ROOMS_COUNT, TOTAL));
    }
  }

  public async updateUsersCountBy(count: CountStatisticsType): Promise<void> {
    if (!this.isInitialized) await this.initialize();

    if (count.current !== undefined) {
      await this.cache!.hIncrBy(USERS_COUNT, CURRENT, count.current);
      this.usersCount.current = Number(await this.cache!.hGet(USERS_COUNT, CURRENT));
    }

    if (count.total !== undefined) {
      await this.cache!.hIncrBy(USERS_COUNT, TOTAL, count.total);
      this.usersCount.total = Number(await this.cache!.hGet(USERS_COUNT, TOTAL));
    }
  }
}

export default new Statistics();