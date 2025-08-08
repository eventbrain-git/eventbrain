"use client";

import { ThemeProvider } from "@/app/context/ThemeContext";
import StoreProvider from "./redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
}
