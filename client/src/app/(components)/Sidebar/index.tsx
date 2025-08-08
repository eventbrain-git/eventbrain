"use client";

import React from 'react'
import {
  Layout, 
  LucideIcon, 
  Menu, 
  Settings
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/production");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)] gap-3 transition-colors ${
          isActive ? "bg-[var(--bg-highlight-light)] dark:bg-[var(--bg-highlight-dark)] text-[var(--text-main-light)] dark:text-[var(--text-main-dark)]" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 text-[var(--text-main-light)] dark:text-[var(--text-main-dark)]" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-[var(--text-main-light)] dark:text-[var(--text-main-dark)]`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
    );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }

  const sidebarClassName = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-[var(--bg-high-light)] transition-all duration-300 overflow-hidden h-full shadow-md z-40 dark:bg-[var(--bg-high-dark)]`;
  
  return (
    <div className={sidebarClassName}>
      {/* TOP LOGO */}
      <div 
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1 
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          EVENTBRAIN
        </h1>
        <button 
          className='md:hidden px-3 py-3 rounded-full bg-[var(--bg-highlight-light)] dark:bg-[var(--bg-highlight-dark)] hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)]'
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className='flex-grow mt-8'>
        <SidebarLinks 
          href='/production' 
          icon={Layout}
          label='Production' 
          isCollapsed={isSidebarCollapsed} 
        />
        <SidebarLinks 
          href='/settings' 
          icon={Settings}
          label='Settings' 
          isCollapsed={isSidebarCollapsed} 
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className='text-center text-xs text-[var(--text-main-light)] dark:text-[var(--text-main-dark)]'>&copy; 2025 EventBrain</p>
      </div>
    </div>
  )
}

export default Sidebar