'use client';

import { useState } from 'react';
import { Search, Calendar, CreditCard, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

// Mock data - replace with actual data from your API
const memberships = [
  {
    id: 1,
    user: 'John Doe',
    type: 'Premium',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    price: 299,
    paymentStatus: 'Paid'
  },
  // Add more mock memberships...
];

export default function MembershipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMembershipDetails, setShowMembershipDetails] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Membership Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Membership
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search memberships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Memberships Table */}
      <div className="bg-card rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership) => (
                <tr key={membership.id} className="border-b border-border last:border-0">
                  <td className="py-3 px-4 text-sm text-foreground">{membership.user}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{membership.type}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        membership.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {membership.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {membership.startDate} - {membership.endDate}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">${membership.price}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        membership.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {membership.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowMembershipDetails(membership.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        Edit
                      </button>
                      <button className="text-destructive hover:text-destructive/80">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Membership Details Modal */}
      {showMembershipDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Membership</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    User
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={memberships.find(m => m.id === showMembershipDetails)?.user}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Membership Type
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Basic</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={memberships.find(m => m.id === showMembershipDetails)?.startDate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={memberships.find(m => m.id === showMembershipDetails)?.endDate}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Active</option>
                    <option>Expired</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Payment Status
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowMembershipDetails(null)}
                    className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Membership Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Membership</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    User
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Search user..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Membership Type
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Basic</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter price"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Create Membership
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 