"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/context/SessionContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // ou /home selon ton flux
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </main>
    );
  }

  return <>{children}</>;
}
