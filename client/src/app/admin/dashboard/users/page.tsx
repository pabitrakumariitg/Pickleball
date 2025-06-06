'use client';

import { useState } from 'react';
import { Search, Mail, Phone, MoreVertical, Edit, Trash2, UserPlus } from 'lucide-react';

// Mock data - replace with actual data from your API
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Member',
    status: 'Active',
    joinDate: '2024-01-15'
  },
  // Add more mock users...
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDetails, setShowUserDetails] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="py-3 px-4 text-sm text-foreground">{user.name}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{user.role}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{user.joinDate}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowUserDetails(user.id)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-md"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:bg-accent rounded-md">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">User Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={users.find(u => u.id === showUserDetails)?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={users.find(u => u.id === showUserDetails)?.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={users.find(u => u.id === showUserDetails)?.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Suspended</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUserDetails(null)}
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
    </div>
  );
} 