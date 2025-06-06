'use client';

import { useState } from 'react';
import { Calendar, Download, BarChart2, TrendingUp, Users, CreditCard, Calendar as CalendarIcon } from 'lucide-react';

// Mock data - replace with actual data from your API
const metrics = {
  totalRevenue: 12345,
  revenueChange: 12,
  totalBookings: 234,
  bookingsChange: 8,
  activeUsers: 567,
  usersChange: 15,
  averageRating: 4.5,
  ratingChange: 0.2
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedReport, setSelectedReport] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <button
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-3 py-2 border border-input rounded-md"
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-3 py-2 border border-input rounded-md"
          />
        </div>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="px-3 py-2 border border-input rounded-md"
        >
          <option value="overview">Overview</option>
          <option value="revenue">Revenue</option>
          <option value="bookings">Bookings</option>
          <option value="users">Users</option>
        </select>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">${metrics.totalRevenue}</p>
          <p className={`text-sm ${metrics.revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}% from last period
          </p>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{metrics.totalBookings}</p>
          <p className={`text-sm ${metrics.bookingsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.bookingsChange >= 0 ? '+' : ''}{metrics.bookingsChange}% from last period
          </p>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{metrics.activeUsers}</p>
          <p className={`text-sm ${metrics.usersChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.usersChange >= 0 ? '+' : ''}{metrics.usersChange}% from last period
          </p>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{metrics.averageRating}</p>
          <p className={`text-sm ${metrics.ratingChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.ratingChange >= 0 ? '+' : ''}{metrics.ratingChange} from last period
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Revenue chart will be displayed here</p>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Booking trends chart will be displayed here</p>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">User activity chart will be displayed here</p>
          </div>
        </div>

        {/* Popular Courts Chart */}
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Courts</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Popular courts chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Peak Hours Analysis</h3>
          <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Peak hours analysis will be displayed here</p>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Court Type</h3>
          <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Revenue by court type will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
} 