import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listenerMiddleware } from './listenerMiddleware';
import storeSlice from '../screens/store-slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     store: storeSlice,
//   }),
// );
const rootReducer = combineReducers({
  store: persistReducer(persistConfig, storeSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
