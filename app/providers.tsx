"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ProfileProvider } from "@/lib/profile-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

