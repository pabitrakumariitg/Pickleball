'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, CreditCard, CheckCircle, XCircle, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/config';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Membership {
  _id: string;
  userId: User;
  type: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

export default function MembershipsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMembershipDetails, setShowMembershipDetails] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    fetchMemberships();
    fetchUsers();
  }, []);

  const fetchMemberships = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(getApiUrl('api/v1/memberships'), { headers });

      if (!response.ok) {
        if (response.status === 403) {
          router.replace('/admin/login');
          return;
        }
        throw new Error('Failed to fetch memberships');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        setMemberships(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching memberships:', err);
      setError('Failed to load memberships. Please try again.');
      toast.error('Failed to load memberships');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(getApiUrl('api/v1/admin/users'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDeleteMembership = async (membershipId: string) => {
    if (!window.confirm('Are you sure you want to delete this membership?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const response = await fetch(getApiUrl(`api/v1/memberships/${membershipId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete membership');
      }

      setMemberships(memberships.filter(m => m._id !== membershipId));
      toast.success('Membership deleted successfully');
    } catch (err) {
      console.error('Error deleting membership:', err);
      toast.error('Failed to delete membership');
    }
  };

  const handleUpdateMembership = async (membershipId: string, updatedData: Partial<Membership>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const response = await fetch(getApiUrl(`api/v1/memberships/${membershipId}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update membership');
      }

      const data = await response.json();
      setMemberships(memberships.map(m => 
        m._id === membershipId ? data.data : m
      ));
      
      setShowMembershipDetails(null);
      toast.success('Membership updated successfully');
    } catch (err) {
      console.error('Error updating membership:', err);
      toast.error('Failed to update membership');
    }
  };

  const handleCreateMembership = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const membershipData = {
        userId: formData.get('userId') as string,
        type: formData.get('type') as 'monthly' | 'yearly',
        price: parseFloat(formData.get('price') as string),
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string
      };

      const response = await fetch(getApiUrl('api/v1/memberships'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(membershipData)
      });

      if (!response.ok) {
        throw new Error('Failed to create membership');
      }

      const data = await response.json();
      setMemberships([data.data, ...memberships]);
      setShowCreateForm(false);
      toast.success('Membership created successfully');
    } catch (err) {
      console.error('Error creating membership:', err);
      toast.error('Failed to create membership');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMemberships = memberships.filter(membership =>
    membership.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    membership.userId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    membership.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

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
              {filteredMemberships.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    {searchQuery ? 'No memberships found matching your search' : 'No memberships found'}
                  </td>
                </tr>
              ) : (
                filteredMemberships.map((membership) => (
                  <tr key={membership._id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm">
                      <div>
                        <div className="font-medium text-foreground">{membership.userId.name}</div>
                        <div className="text-muted-foreground">{membership.userId.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground capitalize">{membership.type}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(membership.status)}`}>
                        {membership.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        {formatDate(membership.startDate)} - {formatDate(membership.endDate)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">₹{membership.price}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(membership.paymentStatus)}`}>
                        {membership.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowMembershipDetails(membership._id)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteMembership(membership._id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
              {(() => {
                const membership = memberships.find(m => m._id === showMembershipDetails);
                if (!membership) return null;

                return (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleUpdateMembership(membership._id, {
                      type: formData.get('type') as 'monthly' | 'yearly',
                      status: formData.get('status') as 'active' | 'expired' | 'cancelled',
                      startDate: formData.get('startDate') as string,
                      endDate: formData.get('endDate') as string,
                      price: parseFloat(formData.get('price') as string),
                      paymentStatus: formData.get('paymentStatus') as 'pending' | 'paid' | 'failed'
                    });
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        User
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-input rounded-md bg-gray-50"
                        value={membership.userId.name}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Membership Type
                      </label>
                      <select 
                        name="type"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        defaultValue={membership.type}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Start Date
                        </label>
                        <input
                          name="startDate"
                          type="date"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          defaultValue={membership.startDate.split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          End Date
                        </label>
                        <input
                          name="endDate"
                          type="date"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          defaultValue={membership.endDate.split('T')[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        defaultValue={membership.price}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Status
                      </label>
                      <select 
                        name="status"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        defaultValue={membership.status}
                      >
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Payment Status
                      </label>
                      <select 
                        name="paymentStatus"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        defaultValue={membership.paymentStatus}
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
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
                );
              })()}
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
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateMembership(new FormData(e.currentTarget));
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    User
                  </label>
                  <select 
                    name="userId"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    required
                  >
                    <option value="">Select a user...</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Membership Type
                  </label>
                  <select 
                    name="type"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Start Date
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      End Date
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter price"
                    required
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