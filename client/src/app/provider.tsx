"use client";

import { ThemeProvider } from "@/app/context/ThemeContext";
import { SessionProvider } from "@/app/context/SessionContext";
import StoreProvider from "./redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
