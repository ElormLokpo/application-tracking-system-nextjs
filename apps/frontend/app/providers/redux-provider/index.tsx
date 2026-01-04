"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../../redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
