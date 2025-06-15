'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  Handshake, 
  Ticket, 
  CalendarDays, 
  CreditCard, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/dashboard/bookings', icon: Calendar },
  { name: 'Courts & Venues', href: '/admin/dashboard/courts', icon: Building2 },
  { name: 'Users', href: '/admin/dashboard/users', icon: Users },
  // { name: 'Partners', href: '/admin/dashboard/partners', icon: Handshake },
  { name: 'Memberships', href: '/admin/dashboard/memberships', icon: Ticket },
  { name: 'Events', href: '/admin/dashboard/events', icon: CalendarDays },
  { name: 'Payments', href: '/admin/dashboard/payments', icon: CreditCard },
  // { name: 'Reports', href: '/admin/dashboard/reports', icon: BarChart3 },
  // { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-primary text-primary-foreground"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-primary/10'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 