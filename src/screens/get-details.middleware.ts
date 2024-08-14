import i18next from 'i18next';
import { AppStartListening } from '../store/listenerMiddleware';
import { ApiUseCases } from '../usecase';
import { getDetails, getDetailsFailed, getDetailsSuccess } from './store-slice';
import { Toast } from 'react-native-toast-notifications';

export const getDetailsMiddleware = (startListening: AppStartListening) => {
  startListening({
    actionCreator: getDetails,
    effect: async ({ payload }, listenerApi) => {
      await ApiUseCases.GetDetails.execute(payload)
        .then(data => {
          listenerApi.dispatch(getDetailsSuccess(data));
        })
        .catch(() => {
          listenerApi.dispatch(getDetailsFailed());
          Toast.show(i18next.t('common:somethingWentWrong'), { type: 'danger' });
        });
    },
  });
};
