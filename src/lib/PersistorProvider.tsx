"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";
import LoadingPage from "@/app/loading";

const PersistorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistorProvider;
