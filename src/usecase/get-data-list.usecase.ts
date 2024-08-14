import ApiService from '../api/api-service';
import { DataListResult } from '../types';

export class GetDataList {
  constructor(private readonly apiService: ApiService) {}

  execute = async (): Promise<DataListResult> => {
    try {
      return await this.apiService.getDataList();
    } catch (error: unknown) {
      throw error;
    }
  };
}
