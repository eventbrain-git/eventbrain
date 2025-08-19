"use client";

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
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("🔑 Aucun token trouvé, utilisateur déconnecté");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Impossible de récupérer l'utilisateur");

      const data = await res.json();
      console.log("📥 Réponse /auth/me:", data);

      // ✅ Gère les 2 cas possibles : { user: {...} } ou directement {...}
      const userData = data.user ?? data;

      setUser(userData || null);
      console.log("✅ Utilisateur mis à jour dans le contexte:", userData);
    } catch (error) {
      console.error("❌ Erreur refreshUser:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("👋 Déconnexion utilisateur");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession doit être utilisé dans un SessionProvider");
  return context;
};
