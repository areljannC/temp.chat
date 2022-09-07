// SHARED IMPORT
import { CountStatisticsType } from '@types';

interface IStatistics {
  publicRoomsCount: CountStatisticsType;
  privateRoomsCount: CountStatisticsType;
  usersCount: CountStatisticsType;

  initialize(): Promise<void>;
  updatePublicRoomsCountBy(count: CountStatisticsType): Promise<void>;
  updatePrivateRoomsCountBy(count: CountStatisticsType): Promise<void>;
  updateUsersCountBy(count: CountStatisticsType): Promise<void>;
}

export default IStatistics;
