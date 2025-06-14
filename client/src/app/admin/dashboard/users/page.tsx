'use client';

import { useEffect, useState } from 'react';
import { Search, Mail, Phone, MoreVertical, Edit, Trash2, UserPlus } from 'lucide-react';
import { getApiUrl } from '@/config';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Member' | 'Admin' | 'Partner';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDetails, setShowUserDetails] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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

      const response = await fetch(getApiUrl('api/v1/admin/users'), { headers });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const response = await fetch(getApiUrl(`api/v1/admin/users/${userId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from state
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleUpdateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const response = await fetch(getApiUrl(`api/v1/admin/users/${userId}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      
      // Update user in state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ...data.data } : user
      ));
      
      setShowUserDetails(null);
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const formData = new FormData(e.currentTarget);
      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        password: formData.get('password'),
      };

      const response = await fetch(getApiUrl('api/v1/admin/users'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      setUsers([...users, data.data]);
      setShowAddUser(false);
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Failed to create user. Please try again.');
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <button 
          onClick={() => setShowAddUser(true)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
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
                  {filteredUsers.map((user) => (
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
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                          >
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
                  {(() => {
                    const user = users.find(u => u.id === showUserDetails);
                    if (!user) return null;

                    return (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleUpdateUser(user.id, {
                          name: formData.get('name') as string,
                          email: formData.get('email') as string,
                          phone: formData.get('phone') as string,
                          role: formData.get('role') as User['role'],
                          status: formData.get('status') as User['status']
                        });
                      }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md"
                            defaultValue={user.name}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border border-input rounded-md"
                            defaultValue={user.email}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Phone
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            className="w-full px-3 py-2 border border-input rounded-md"
                            defaultValue={user.phone}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Role
                          </label>
                          <select 
                            name="role"
                            className="w-full px-3 py-2 border border-input rounded-md"
                            defaultValue={user.role}
                          >
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                            <option value="Partner">Partner</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Status
                          </label>
                          <select 
                            name="status"
                            className="w-full px-3 py-2 border border-input rounded-md"
                            defaultValue={user.status}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
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
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Add User Modal */}
          {showAddUser && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Role
                      </label>
                      <select 
                        name="role"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        defaultValue="Member"
                      >
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                        <option value="Partner">Partner</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAddUser(false)}
                        className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 