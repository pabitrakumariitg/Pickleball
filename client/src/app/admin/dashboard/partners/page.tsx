'use client';

import { useState } from 'react';
import { Search, Building2, Mail, Phone, Edit, Trash2, UserPlus, BarChart2 } from 'lucide-react';

// Mock data - replace with actual data from your API
const partners = [
  {
    id: 1,
    name: 'Sports Complex A',
    owner: 'John Smith',
    email: 'john@sportscomplex.com',
    phone: '+1234567890',
    courts: 5,
    status: 'Active',
    revenue: 25000,
    joinDate: '2024-01-15'
  },
  // Add more mock partners...
];

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPartnerDetails, setShowPartnerDetails] = useState<number | null>(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Business Partners</h1>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Partner
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search partners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-card rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">Owner: {partner.owner}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  partner.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {partner.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                {partner.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                {partner.phone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="w-4 h-4 mr-2" />
                {partner.courts} Courts
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Monthly Revenue:</span>
                <span className="text-foreground font-medium">${partner.revenue}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPerformanceModal(partner.id)}
                className="p-2 text-primary hover:bg-primary/10 rounded-md"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowPartnerDetails(partner.id)}
                className="p-2 text-primary hover:bg-primary/10 rounded-md"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Details Modal */}
      {showPartnerDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Partner Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={partners.find(p => p.id === showPartnerDetails)?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={partners.find(p => p.id === showPartnerDetails)?.owner}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={partners.find(p => p.id === showPartnerDetails)?.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={partners.find(p => p.id === showPartnerDetails)?.phone}
                  />
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
                    onClick={() => setShowPartnerDetails(null)}
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

      {/* Performance Modal */}
      {showPerformanceModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Partner Performance</h2>
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
                    <p className="text-2xl font-semibold mt-1">245</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                    <p className="text-2xl font-semibold mt-1">$12,450</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Utilization</h3>
                    <p className="text-2xl font-semibold mt-1">85%</p>
                  </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Performance Chart</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPerformanceModal(null)}
                    className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 