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

  // Récupère le token à chaque mount
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Initialise la query getMe uniquement si token présent
  const { data, isFetching, refetch, isUninitialized } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!isUninitialized) {
      setUser(data?.user ?? null);
      setLoading(isFetching);
    }
  }, [data, isFetching, isUninitialized]);

  // RefreshUser force le refetch même si la query était initialement skip
  const refreshUser = async (): Promise<User | null> => {
    setLoading(true);
    try {
      const result = await refetch(); // refetch forcé
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
    console.log("👋 Déconnexion utilisateur");
    localStorage.removeItem("token");
    setUser(null);
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
