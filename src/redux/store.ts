import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import userDetailsReducer from "./features/userDetailsSlice";
import { baseApi } from "./api/baseApi";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storageFallback = typeof window !== "undefined" ? storage : createNoopStorage(); // ✅ Fallback for SSR

const persistConfig = {
  key: "auth",
  version: 1,
  storage: storageFallback, // ✅ Ensures storage is never undefined
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
    userDetails: userDetailsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export persistor for usage in `_app.tsx`
export const persistor = persistStore(store);
