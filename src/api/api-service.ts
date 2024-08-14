import { DataListResult, GetDetailsBody, GetDetailsResult } from '../types/index';

export default interface ApiService {
  getDataList(): Promise<DataListResult>;
  getDetails(body: GetDetailsBody): Promise<GetDetailsResult>;
}
