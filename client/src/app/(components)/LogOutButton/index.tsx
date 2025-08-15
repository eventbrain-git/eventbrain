"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useSession } from "@/app/context/SessionContext"; 

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useSession();

  const handleLogout = async () => {
    await logout(); 
    router.replace("/home");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 text-sm flex items-center gap-2 text-[var(--text-main-light)] dark:text-[var(--text-main-dark)] hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)]"
    >
      <LogOut /> Se déconnecter
    </button>
  );
}
