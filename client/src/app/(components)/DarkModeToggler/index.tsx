"use client";

import { useDarkMode } from '@/app/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative z-0 inline-grid grid-cols-2 gap-0.5 rounded-full bg-gray-950/5 p-0.75 text-gray-600 dark:bg-white/10 dark:text-gray-400"
      aria-label="Toggle dark mode"
      type="button"
    >
      <span
        className={`rounded-full p-1.5 *:size-6 sm:p-0 cursor-pointer transition`}
      >
        <Sun className="w-5 h-5 rounded-full p-1 dark:bg-gray-900 dark:border-1" />
      </span>

      <span
        className={`rounded-full p-1.5 *:size-6 sm:p-0 cursor-pointer transition`}
      >
        <Moon className="w-5 h-5 bg-gray-50 rounded-full p-1 border-1 dark:bg-gray-950/5 dark:border-0" />
      </span>
    </button>
  );
};

export default DarkModeToggler;
