"use client";

import { QueryClientProvider } from "@tanstack/react-query"
import React from "react";
import { getQueryClient } from "./getQueryClient";

export default function ReactQueryProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}