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
  const isAdminOrBusinessRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/business');

  return (
    <>
      {!isAdminOrBusinessRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminOrBusinessRoute && <Footer />}
    </>
  );
} 