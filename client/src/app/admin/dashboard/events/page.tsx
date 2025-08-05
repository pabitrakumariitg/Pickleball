'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, Plus, Clock, Tag } from 'lucide-react';
import { Create } from '@mui/icons-material';
import axios from 'axios';
import Image from 'next/image';
import CreateEventForm from './CreateEventForm';

// Updated event interface to match the updated backend model
interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  currentParticipants: number;
  maxParticipants: number;
  fee: number;
  status: string;
  images?: string;
  convenience?: {
    percentage: number;
    fixedAmount: number;
  };
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState<string | null>(null);
  const [editEventData, setEditEventData] = useState<Event | null>(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("You are not authenticated. Please log in again.");
          return;
        }
        
        const response = await axios.get(`${apiUrl}/api/v1/admin/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {

          console.log(response.data.data);
          setEvents(response.data.data || []);
        } else {
          setError("Failed to load events");
        }
      } catch (err: any) {
        console.error("Error loading events:", err);
        setError(err.message || "An error occurred while loading events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle edit form submission (deprecated, now using CreateEventForm)
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This function is no longer needed as we're using CreateEventForm
  };

  // Set the event to edit and open the form
  const handleEditClick = (eventId: string) => {
    const eventToEdit = events.find(e => e._id === eventId);
    if (eventToEdit) {
      setEditEventData(eventToEdit);
      setShowEventDetails(eventId);
    }
  };

  // Handle successful form submission
  const handleFormSuccess = () => {
    // Close forms
    setShowCreateForm(false);
    setShowEventDetails(null);
    setEditEventData(null);
    
    // Refresh events list
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("You are not authenticated. Please log in again.");
          return;
        }
        
        const response = await axios.get(`${apiUrl}/api/v1/admin/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setEvents(response.data.data || []);
          console.log(response.data.data);
        } else {
          setError("Failed to load events");
        }
      } catch (err: any) {
        console.error("Error loading events:", err);
        setError(err.message || "An error occurred while loading events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="bg-card rounded-lg shadow p-6 space-y-4">
                {/* Add image if available */}
                {event.images && (
                  <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
                    
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      onError={(e) => {
                        // Fallback to a placeholder image if the actual image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    {/* <p className="text-sm text-muted-foreground">{event.description}</p> */}
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      event.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : event.status === 'ongoing'
                        ? 'bg-green-100 text-green-800'
                        : event.status === 'completed'
                        ? 'bg-gray-100 text-gray-800'
                        : event.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : event.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.startDate)} 
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {event.currentParticipants}/{event.maxParticipants} participants
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="w-4 h-4 mr-2" />
                    ₹{event.fee.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEditClick(event._id)}
                    className="text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                  <button className="text-destructive hover:text-destructive/80">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No events found. Try a different search or create a new event.
            </div>
          )}
        </div>
      )}

      {/* Edit Event Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Event</h2>
                <button
                  onClick={() => {
                    setShowEventDetails(null);
                    setEditEventData(null);
                  }}
                  className="p-1 rounded-full hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Use CreateEventForm for editing */}
              <CreateEventForm 
                mode="edit" 
                eventToEdit={editEventData} 
                onSuccess={handleFormSuccess} 
                onCancel={() => {
                  setShowEventDetails(null);
                  setEditEventData(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Event</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="p-1 rounded-full hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* CreateEventForm for creating */}
              <CreateEventForm 
                mode="create" 
                onSuccess={handleFormSuccess} 
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}