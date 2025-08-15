"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/app/context/SessionContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p>Chargement...</p>;

  return user ? <>{children}</> : null;
}
