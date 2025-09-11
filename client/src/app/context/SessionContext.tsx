"use client";

import { useGetMeQuery } from "@/state/api";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<User | null>;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { data, isFetching, refetch, isUninitialized } = useGetMeQuery(undefined, { skip: false });

  useEffect(() => {
    if (!isUninitialized && !isFetching) {
      setUser(data?.user ?? null);
      setLoading(false);
    } else if (isFetching) {
      setLoading(true);
    }
  }, [data, isFetching, isUninitialized]);

  const refreshUser = async (): Promise<User | null> => {
    setLoading(true);
    try {
      const result = await refetch();
      const newUser = result.data?.user ?? null;
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error("❌ Erreur refreshUser:", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLoading(false);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <SessionContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession doit être utilisé dans un SessionProvider");
  return context;
};
