'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function RootLayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') ?? false;

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
} 