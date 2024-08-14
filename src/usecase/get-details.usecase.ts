import ApiService from '../api/api-service';
import { GetDetailsBody, GetDetailsResult } from '../types';

export class GetDetails {
  constructor(private readonly apiService: ApiService) {}

  execute = async (body: GetDetailsBody): Promise<GetDetailsResult> => {
    try {
      return await this.apiService.getDetails(body);
    } catch (error: unknown) {
      throw error;
    }
  };
}
