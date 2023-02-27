import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { reportReducer } from './report/report-slice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    report: reportReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
