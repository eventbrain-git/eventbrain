"use client";

import PublicNavbar from "../(components)/PublicNavbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen bg-[var(--bg-main-light)] text-[var(--text-main-light)] dark:text-[var(--text-main-dark)] dark:bg-[var(--bg-main-dark)]">
      <main className="flex flex-col w-full h-full py-7 px-9">
        <PublicNavbar />
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
