import { DataListResult, GetDetailsResult, GetDetailsBody } from '../types';
import publicApi from './api';

import ApiService from './api-service';

export default class ApiServiceImpl implements ApiService {
  async getDataList(): Promise<DataListResult> {
    const res = await publicApi.get('/characters');

    return await res.data;
  }

  async getDetails(body: GetDetailsBody): Promise<GetDetailsResult> {
    const res = await publicApi.get('/character/' + body.id);

    return await res.data[0];
  }
}
