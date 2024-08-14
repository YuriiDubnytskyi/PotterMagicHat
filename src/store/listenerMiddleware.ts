import type { TypedStartListening } from '@reduxjs/toolkit';
import { createListenerMiddleware } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '.';
import { getDetailsMiddleware } from '../screens/get-details.middleware';
import { getDataListMiddleware } from '../screens/get-data-list.middleware';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

getDetailsMiddleware(startAppListening);
getDataListMiddleware(startAppListening);

export { listenerMiddleware };
