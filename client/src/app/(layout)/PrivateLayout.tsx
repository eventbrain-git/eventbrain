"use client";

import { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import { useAppSelector } from "../redux";
import RequireAuth from "../(components)/RequireAuth";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  useEffect(() => {
    console.log("isSidebarCollapsed changé :", isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  return (
    <RequireAuth>
        <div className="flex w-full min-h-screen bg-[var(--bg-main-light)] text-[var(--text-main-light)] dark:text-[var(--text-main-dark)] dark:bg-[var(--bg-main-dark)]">
          <Sidebar />
          <main
            className={`flex flex-col w-full h-full py-7 px-9 transition-all duration-300 ${
              isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
            }`}
          >
            <Navbar />
            {children}
          </main>
        </div>
    </RequireAuth>
  );
};

export default PrivateLayout;
