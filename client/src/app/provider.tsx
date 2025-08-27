"use client";

import { ThemeProvider } from "@/app/context/ThemeContext";
import { SessionProvider } from "@/app/context/SessionContext";
import StoreProvider from "./redux"; // ton Provider Redux

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
