'use client';

import { useState } from 'react';
import { Search, Calendar, Users, MapPin, Plus, Clock, Tag } from 'lucide-react';

// Mock data - replace with actual data from your API
const events = [
  {
    id: 1,
    name: 'Pickleball Tournament 2024',
    type: 'Tournament',
    date: '2024-03-15',
    time: '09:00 AM',
    venue: 'Sports Complex',
    participants: 32,
    maxParticipants: 64,
    price: 50,
    status: 'Upcoming'
  },
  // Add more mock events...
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventDetails, setShowEventDetails] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-card rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{event.name}</h3>
                <p className="text-sm text-muted-foreground">{event.type}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  event.status === 'Upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : event.status === 'Ongoing'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {event.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {event.venue}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-2" />
                {event.participants}/{event.maxParticipants} participants
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Tag className="w-4 h-4 mr-2" />
                ${event.price}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                onClick={() => setShowEventDetails(event.id)}
                className="text-primary hover:text-primary/80"
              >
                Edit
              </button>
              <button className="text-destructive hover:text-destructive/80">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={events.find(e => e.id === showEventDetails)?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Type
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Tournament</option>
                    <option>League</option>
                    <option>Workshop</option>
                    <option>Social</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={events.find(e => e.id === showEventDetails)?.date}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={events.find(e => e.id === showEventDetails)?.time}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    defaultValue={events.find(e => e.id === showEventDetails)?.venue}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={events.find(e => e.id === showEventDetails)?.maxParticipants}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      defaultValue={events.find(e => e.id === showEventDetails)?.price}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEventDetails(null)}
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

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Type
                  </label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Tournament</option>
                    <option>League</option>
                    <option>Workshop</option>
                    <option>Social</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter venue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter max participants"
                    />
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
                    Create Event
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