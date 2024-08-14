import { ISessionTemplatesServiceImpl } from './interfaces/interfaces';
import ApiServiceImpl from '../api/api-service-impl';

export default (): ISessionTemplatesServiceImpl => {
  return {
    ApiServiceImpl: new ApiServiceImpl(),
  };
};
