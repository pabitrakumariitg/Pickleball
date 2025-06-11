'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Building2,
  Calendar,
  CreditCard,
  TrendingUp,
  Clock
} from 'lucide-react';
import Image from 'next/image';

interface StatData {
  totalUsers: number;
  totalBookings: number;
  activeMemberships: number;
  monthlyRevenue: number;
  upcomingEvents: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface CourtType {
  _id: string;
  name: string;
}

interface Booking {
  _id: string;
  user: User;
  court: CourtType;
  startTime: string;
  endTime: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatData>({
    totalUsers: 0,
    totalBookings: 0,
    activeMemberships: 0,
    monthlyRevenue: 0,
    upcomingEvents: 0
  });
  const [totalCourts, setTotalCourts] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [courts, setCourts] = useState(null);

  // Client-side auth guard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await fetch('/api/v1/courts', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch courts');
        }
        const data = await response.json();
        setTotalCourts(data.data.length);

      } catch (err) {
        console.error('Error fetching courts:', err);
      }
    };

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await fetch('/api/v1/bookings', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        console.log(data.data);
        setTotalBookings(data.data.length);
        setBookings(data.data);

      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await fetch('/api/v1/admin/stats', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setTotalUsers(data.data.totalUsers || 0);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchCourts();
    fetchBookings();
    fetchUserCount();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={totalUsers} icon={Users} trend="+12%" trendUp />
        <StatCard title="Total Courts" value={totalCourts} icon={Building2} trend="+2" trendUp />
        <StatCard title="Total Bookings" value={totalBookings} icon={Calendar} trend="+8%" trendUp />
        <StatCard title="Active Memberships" value={stats.activeMemberships} icon={Users} trend="+5%" trendUp />
        <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue.toLocaleString()}`} icon={CreditCard} trend="+15%" trendUp />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon={Calendar} trend="+3" trendUp />
      </div>

      <div className="bg-card rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Court</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm text-foreground">{booking.user.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.court.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(booking.startTime).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trendUp ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <Clock className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-2 text-sm font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
