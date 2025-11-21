"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type React from "react";
import type { ReactNode } from "react";

export const queryClient = new QueryClient();

type RootProviderProps = {
  children: ReactNode;
};

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default RootProvider;
