"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userId: number;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        
        if (data.user) {
          setUser({
            userFirstName: data.user.userFirstName,
            userLastName: data.user.userLastName,
            userEmail: data.user.userEmail,
            userId: data.user.userId,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
