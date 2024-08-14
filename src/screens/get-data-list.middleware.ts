import i18next from 'i18next';
import { AppStartListening } from '../store/listenerMiddleware';
import { ApiUseCases } from '../usecase';
import { getDataList, getDataListFailed, getDataListSuccess } from './store-slice';
import { Toast } from 'react-native-toast-notifications';

export const getDataListMiddleware = (startListening: AppStartListening) => {
  startListening({
    actionCreator: getDataList,
    effect: async (_, listenerApi) => {
      await ApiUseCases.GetDataList.execute()
        .then(data => {
          listenerApi.dispatch(getDataListSuccess(data));
        })
        .catch(() => {
          listenerApi.dispatch(getDataListFailed());
          Toast.show(i18next.t('common:somethingWentWrong'), { type: 'danger' });
        });
    },
  });
};
