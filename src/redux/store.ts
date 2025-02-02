import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import cartReducer from "@/redux/features/cartSlice";
import userReducer from "@/redux/features/userDetailsSlice";

const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Use localStorage
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    userDetails: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks for redux-persist
    }),
});

export const persistor = persistStore(store);

// Define RootState based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch for dispatching actions
export type AppDispatch = typeof store.dispatch;