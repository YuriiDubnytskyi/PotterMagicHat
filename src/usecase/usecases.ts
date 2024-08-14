import { GetDetails } from './get-details.usecase';
import { IUseCases } from './interfaces/interfaces';
import ApiService from '../api/api-service';
import { GetDataList } from './get-data-list.usecase';

export default (ApiUseCase: ApiService): IUseCases => {
  return {
    GetDetails: new GetDetails(ApiUseCase),
    GetDataList: new GetDataList(ApiUseCase),
  };
};
