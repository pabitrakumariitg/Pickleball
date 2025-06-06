'use client';

import { 
  Users, 
  Building2, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

// Mock data - replace with actual data from your API
const stats = {
  totalUsers: 1250,
  totalCourts: 15,
  totalBookings: 3420,
  activeMemberships: 850,
  monthlyRevenue: 45000,
  upcomingEvents: 8
};

const recentBookings = [
  { id: 1, user: 'John Doe', court: 'Court 1', date: '2024-03-20', time: '14:00', status: 'Confirmed' },
  { id: 2, user: 'Jane Smith', court: 'Court 2', date: '2024-03-20', time: '15:30', status: 'Pending' },
  { id: 3, user: 'Mike Johnson', court: 'Court 3', date: '2024-03-21', time: '10:00', status: 'Confirmed' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Total Courts"
          value={stats.totalCourts}
          icon={Building2}
          trend="+2"
          trendUp={true}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          title="Active Memberships"
          value={stats.activeMemberships}
          icon={Users}
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={CreditCard}
          trend="+15%"
          trendUp={true}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={Calendar}
          trend="+3"
          trendUp={true}
        />
      </div>

      {/* Recent Bookings */}
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
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm text-foreground">{booking.user}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.court}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.date}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{booking.time}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed'
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
        <span
          className={`ml-2 text-sm font-medium ${
            trendUp ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
} 