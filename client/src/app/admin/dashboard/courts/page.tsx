'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Image as ImageIcon, Edit, Trash2 } from 'lucide-react';
import { Court } from "@/types";
import { getApiUrl } from '@/config';
import { useRouter } from 'next/navigation';
import PhotoUpload from '@/components/ui/PhotoUpload';
import { CloudinaryPhoto } from '@/lib/cloudinary';

interface CourtFormData {
  name: string;
  venue: string;
  type: 'indoor' | 'outdoor';
  surface: 'concrete' | 'asphalt' | 'wood' | 'synthetic';
  price: number;
  capacity: number;
  description: string;
  openingTime: string;
  closingTime: string;
  createdBy:string;
  status: 'active' | 'maintenance' | 'inactive';
  amenities?: ('parking' | 'showers' | 'lockers' | 'equipment_rental' | 'cafe' | 'wifi')[];
  imageUrl?: string;
}

export default function CourtsPage() {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [formData, setFormData] = useState<CourtFormData>({
    name: '',
    venue: '',
    type: 'indoor',
    surface: 'concrete',
    price: 0,
    capacity: 2,
    description: '',
    openingTime: '09:00',
    closingTime: '21:00',
    status: 'active',
    createdBy: "Admin",
    
    amenities: []
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<Court | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(getApiUrl('api/v1/courts'), { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch courts');
      }
      const data = await response.json();
      setCourts(data.data);
    } catch (err) {
      console.error('Error fetching courts:', err);
      setError('Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (photo: CloudinaryPhoto) => {
    setFormData(prev => ({ ...prev, imageUrl: photo.url }));
    setImagePreview(photo.url);
  };

  const handleImageError = (error: string) => {
    setError(error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      // Convert time strings to Date objects for the API
      const today = new Date();
      const [openingHour, openingMinute] = formData.openingTime.split(':');
      const [closingHour, closingMinute] = formData.closingTime.split(':');
      
      const openingDate = new Date(today);
      openingDate.setHours(parseInt(openingHour), parseInt(openingMinute), 0);
      
      const closingDate = new Date(today);
      closingDate.setHours(parseInt(closingHour), parseInt(closingMinute), 0);

      const courtData = {
        name: formData.name,
        venue: formData.venue,
        type: formData.type,
        surface: formData.surface,
        price: formData.price,
        capacity: formData.capacity,
        description: formData.description,
        openingTime: openingDate.toISOString(),
        closingTime: closingDate.toISOString(),
        status: formData.status,
        createdBy: "Admin",
        amenities: formData.amenities,
        image: formData.imageUrl
      };

      const response = await fetch(getApiUrl('api/v1/courts'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courtData)
      });

      if (!response.ok) {
        console.log(courtData);
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create court');
      }

      const data = await response.json();
      setCourts(prev => [...prev, data.data]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        venue: '',
        type: 'indoor',
        surface: 'concrete',
        price: 0,
        capacity: 2,
        description: '',
        openingTime: '09:00',
        closingTime: '21:00',
        status: 'active',
        createdBy:"Admin",
        amenities: []
      });
      setImagePreview(null);
    } catch (err) {
      console.error('Error creating court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create court';
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleAmenitiesChange = (amenity: CourtFormData['amenities'][0]) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handleEdit = (court: Court) => {
    // Convert ISO date strings to HH:mm format
    const openingTime = new Date(court.openingTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const closingTime = new Date(court.closingTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    setSelectedCourt(court);
    setFormData({
      name: court.name,
      venue: court.venue,
      type: court.type,
      surface: court.surface,
      price: court.price,
      capacity: court.capacity,
      description: court.description,
      openingTime,
      closingTime,
      createdBy: "Admin",
      status: court.status,
      amenities: court.amenities || [],
      imageUrl: court.image || ''
    });
    setImagePreview(court.image || null);
    setShowUpdateForm(true);
  };

  const handleDelete = async (court: Court) => {
    if (!window.confirm('Are you sure you want to delete this court?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const response = await fetch(getApiUrl(`api/v1/courts/${court._id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete court');
      }

      setCourts(prev => prev.filter(c => c._id !== court._id));
    } catch (err) {
      console.error('Error deleting court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete court';
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourt) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      // Convert time strings to Date objects for the API
      const today = new Date();
      const [openingHour, openingMinute] = formData.openingTime.split(':');
      const [closingHour, closingMinute] = formData.closingTime.split(':');
      
      const openingDate = new Date(today);
      openingDate.setHours(parseInt(openingHour), parseInt(openingMinute), 0);
      
      const closingDate = new Date(today);
      closingDate.setHours(parseInt(closingHour), parseInt(closingMinute), 0);

      const courtData = {
        name: formData.name,
        venue: formData.venue,
        type: formData.type,
        surface: formData.surface,
        price: formData.price,
        capacity: formData.capacity,
        description: formData.description,
        openingTime: openingDate.toISOString(),
        closingTime: closingDate.toISOString(),
        status: formData.status,
        amenities: formData.amenities,
        image: formData.imageUrl
      };

      const response = await fetch(getApiUrl(`api/v1/courts/${selectedCourt._id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courtData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update court');
      }

      const data = await response.json();
      setCourts(prev => prev.map(court => 
        court._id === selectedCourt._id ? data.data : court
      ));
      setShowUpdateForm(false);
      setSelectedCourt(null);
      setFormData({
        name: '',
        venue: '',
        type: 'indoor',
        surface: 'concrete',
        price: 0,
        capacity: 2,
        description: '',
        openingTime: '09:00',
        closingTime: '21:00',
        status: 'active',
        createdBy:"Admin",
        amenities: []
      });
      setImagePreview(null);
    } catch (err) {
      console.error('Error updating court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update court';
      setError(errorMessage);
      alert(errorMessage);
    }
  };

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
          <div key={court._id} className="bg-card rounded-lg shadow overflow-hidden">
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
                    court.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : court.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
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
                  <span className="text-muted-foreground">Surface:</span>
                  <span className="text-foreground">{court.surface}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per hour:</span>
                  <span className="text-foreground">₹{court.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="text-foreground">{court.capacity} players</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  onClick={() => handleEdit(court)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-md"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(court)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Update Court Modal */}
      {(showCreateForm || showUpdateForm) && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-2xl m-4">
              <h2 className="text-xl font-semibold mb-4">
                {showCreateForm ? 'Add New Court' : 'Update Court'}
              </h2>
              <form onSubmit={showCreateForm ? handleSubmit : handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Court Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter court name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Venue*
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter venue name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Type*
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    >
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Surface*
                    </label>
                    <select
                      name="surface"
                      value={formData.surface}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    >
                      <option value="concrete">Concrete</option>
                      <option value="asphalt">Asphalt</option>
                      <option value="wood">Wood</option>
                      <option value="synthetic">Synthetic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Price per Hour*
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Capacity*
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter capacity"
                      min="2"
                      max="4"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Opening Time*
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Closing Time*
                    </label>
                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="Enter court description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['parking', 'showers', 'lockers', 'equipment_rental', 'cafe', 'wifi'].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.amenities?.includes(amenity as any)}
                          onChange={() => handleAmenitiesChange(amenity as any)}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{amenity.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Court Image
                  </label>
                  <PhotoUpload
                    onUpload={handleImageUpload}
                    onError={handleImageError}
                    folder="court-images"
                    description="Court image"
                    maxSize={10 * 1024 * 1024} // 10MB
                    showPreview={true}
                    previewSize="md"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (showCreateForm) {
                        setShowCreateForm(false);
                      } else {
                        setShowUpdateForm(false);
                        setSelectedCourt(null);
                      }
                      setFormData({
                        name: '',
                        venue: '',
                        type: 'indoor',
                        surface: 'concrete',
                        price: 0,
                        capacity: 2,
                        description: '',
                        openingTime: '09:00',
                        closingTime: '21:00',
                        status: 'active',
                        createdBy:"Admin",
                        amenities: []
                      });
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    {showCreateForm ? 'Add Court' : 'Update Court'}
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