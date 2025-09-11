"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/context/SessionContext";

export default function RootRedirect() {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    console.log("loading:", loading, "user:", user);
  
    if (loading) return;
  
    if (user) {
      router.replace("/userHome");
    } else {
      router.replace("/home");
    }
  }, [user, loading, router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <p>Chargement en cours...</p>
    </main>
  );
}
