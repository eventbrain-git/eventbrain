"use client";

import React from "react";
import DarkModeToggler from "../DarkModeToggler";
import { useRouter } from "next/navigation";

const PublicNavbar = () => {
    const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full mb-7 rounded-full p-2 shadow-2xl bg-[var(--bg-main-light)] dark:bg-[var(--bg-high-dark)]">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
        className="flex justify-between items-center gap-5 cursor-pointer"
        onClick={() => router.push("/home")}
        >
        Home
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="flex gap-3">
            <DarkModeToggler />
            <button
            className="flex justify-between items-center gap-5 cursor-pointer"
            onClick={() => router.push("/login")}
            >
            Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
