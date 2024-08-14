import ApiService from './api-service';
import UseCases from './usecases';

const cApiDataSources = ApiService();
const cUseCase = UseCases(cApiDataSources.ApiServiceImpl);

export const ApiUseCases = {
  GetDetails: cUseCase.GetDetails,
  GetDataList: cUseCase.GetDataList,
};
