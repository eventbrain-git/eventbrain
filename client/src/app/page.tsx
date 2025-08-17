"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/context/SessionContext";

export default function RootRedirect() {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/userHome");
    } else {
      router.replace("/home");
    }
  }, [user, loading, router]);

  return <p>Chargement en cours...</p>;
}
