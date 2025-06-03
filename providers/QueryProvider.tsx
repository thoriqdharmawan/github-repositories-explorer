"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable automatic retry on error globally
      refetchOnWindowFocus: false, // Disable refetch on window focus globally
      refetchOnReconnect: false, // Disable refetch on reconnect globally
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    },
    mutations: {
      retry: false, // Disable retry for mutations as well
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
