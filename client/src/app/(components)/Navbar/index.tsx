"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Bell, Menu } from "lucide-react";
import React from "react";
import DarkModeToggler from "../DarkModeToggler";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 rounded-full p-2 shadow-2xl bg-[var(--bg-main-light)] dark:bg-[var(--bg-high-dark)]">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 rounded-full bg-[var(--bg-highlight-light)] dark:bg-[var(--bg-highlight-dark)] hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)]"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-[var(--bg-main-light)] dark:bg-[var(--bg-main-dark)] rounded-lg focus:outline-none focus:border-[var(--bg-highlight-light)] dark:focus:border-[var(--bg-highlight-dark)]"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-[var(--text-main-light)] dark:text[var(--text-main-dark)]" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <DarkModeToggler />
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-[var(--text-main-light)] dark:text[var(--text-main-dark)]" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-[var(--text-main-light)] dark:border-[var(--text-main-dark)] mx-3" />
          <div className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full bg-[var(--bg-highlight-light)] dark:bg-[var(--bg-highlight-dark)] hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)]">
            SP
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
