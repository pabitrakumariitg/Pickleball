'use client';

import { useState } from 'react';
import { Search, Calendar, CreditCard, Download, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// Mock data - replace with actual data from your API
const transactions = [
  {
    id: 1,
    type: 'Booking',
    amount: 50,
    status: 'Completed',
    date: '2024-03-15',
    time: '09:00 AM',
    customer: 'John Doe',
    paymentMethod: 'Credit Card',
    reference: 'BK-2024-001'
  },
  // Add more mock transactions...
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Payments & Transactions</h1>
        <button
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-input rounded-md hover:bg-accent"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card rounded-lg shadow p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-3 py-2 border border-input rounded-md"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-3 py-2 border border-input rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-card rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment Method</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reference</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border last:border-0">
                  <td className="py-3 px-4 text-sm text-foreground">
                    <div className="flex items-center">
                      {transaction.type === 'Booking' ? (
                        <ArrowDownLeft className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
                      )}
                      {transaction.type}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    ${transaction.amount}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {transaction.date} at {transaction.time}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {transaction.customer}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
                      {transaction.paymentMethod}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {transaction.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-foreground">₹12,345</p>
          <p className="text-sm text-green-500">+12% from last month</p>
        </div>
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Payments</h3>
          <p className="text-2xl font-bold text-foreground">₹1,234</p>
          <p className="text-sm text-yellow-500">5 transactions pending</p>
        </div>
        <div className="bg-card rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Failed Transactions</h3>
          <p className="text-2xl font-bold text-foreground">₹123</p>
          <p className="text-sm text-red-500">2 transactions failed</p>
        </div>
      </div>
    </div>
  );
} 