import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { authSlice } from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'] 
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authSlice.reducer),
});

export const store = configureStore({
    reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
