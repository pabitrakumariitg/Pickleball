'use client';

import { useState } from 'react';
import { Plus, Search, Image as ImageIcon, Edit, Trash2 } from 'lucide-react';

// Mock data - replace with actual data from your API
const courts = [
  {
    id: 1,
    name: 'Court 1',
    venue: 'Main Sports Complex',
    type: 'Indoor',
    price: 50,
    status: 'Active',
    image: '/court1.jpg'
  },
  // Add more mock courts...
];

export default function CourtsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Courts & Venues</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Court
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search courts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court.id} className="bg-card rounded-lg shadow overflow-hidden">
            <div className="relative h-48 bg-muted">
              {court.image ? (
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{court.name}</h3>
                  <p className="text-sm text-muted-foreground">{court.venue}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    court.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {court.status}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="text-foreground">{court.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per hour:</span>
                  <span className="text-foreground">${court.price}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-md">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Court Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Court</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Court Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter court name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter venue name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Type
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Indoor</option>
                    <option>Outdoor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Price per Hour
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Court Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-input rounded-md">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="flex text-sm text-muted-foreground">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
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
                    Add Court
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