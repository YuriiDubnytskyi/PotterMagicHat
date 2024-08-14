import ApiServiceImpl from '../../api/api-service-impl';
import { GetDataList } from '../get-data-list.usecase';
import { GetDetails } from '../get-details.usecase';

export interface ISessionTemplatesServiceImpl {
  ApiServiceImpl: ApiServiceImpl;
}

export interface IUseCases {
  GetDetails: GetDetails;
  GetDataList: GetDataList;
}
