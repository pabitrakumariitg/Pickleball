"use client"

import { useEffect, useState } from 'react';
import { Plus, Search, Image as ImageIcon, Edit, Trash2, MapPin, Clock, Users, Camera } from 'lucide-react';
import { Court } from "@/types";
import { getApiUrl } from '@/config';
import { useRouter } from 'next/navigation';
import PhotoUpload from '@/components/ui/PhotoUpload';
import { CloudinaryPhoto } from '@/lib/cloudinary';
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import axios from '@/lib/axios';

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
  createdBy: string;
  status: 'active' | 'maintenance' | 'inactive';
  amenities?: ('parking' | 'showers' | 'lockers' | 'equipment_rental' | 'cafe' | 'wifi')[];
  imageUrl?: string;
}

export default function CourtsPage() {
  const router = useRouter();
  const { toast } = useToast();
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
    createdBy: '',
    amenities: []
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<Court | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('businessToken');
    if (!token) {
      router.replace('/business/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    const initializeData = async () => {
      console.log("businessToken", localStorage.getItem("businessToken"));
      console.log("Initializing dashboard data");
      setLoading(true);
      setError(null);
      
      try {
        // First fetch business name
        const res = await axios.get("/api/v1/businesses/dashboard");
        const businessCompany = res.data.data.business.company;
        console.log("Business company:", businessCompany);
        
        setCompanyName(businessCompany);
        setFormData(prev => ({ ...prev, createdBy: businessCompany }));
        
        // Then fetch courts with the company name
        await fetchCourtsForBusiness(businessCompany);
        
      } catch (err: any) {
        console.error("Error initializing data:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data.");
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    initializeData();
  }, []);

  const fetchCourtsForBusiness = async (businessCompany: string) => {
    try {
      const token = localStorage.getItem('businessToken');
      if (!token) {
        router.replace('/business/login');
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

      // Filter courts using the passed company name
      console.log("Filtering courts for company:", businessCompany);
      console.log("All courts:", data.data);
      
      const businessCourts = data.data.filter(
        (court: any) => court.createdBy === businessCompany
      );

      console.log("Filtered business courts:", businessCourts);
      setCourts(businessCourts);
      
    } catch (err) {
      console.error('Error fetching courts:', err);
      toast({
        title: "Error",
        description: "Failed to load courts",
        variant: "destructive"
      });
    }
  };

  // Refresh courts function that can be called after operations
  const refreshCourts = async () => {
    if (companyName) {
      await fetchCourtsForBusiness(companyName);
    }
  };

  // Calculate statistics
  const activeCourts = courts.filter(court => court.status === 'active').length;
  const averagePrice = courts.length > 0 
    ? Math.round(courts.reduce((sum, court) => sum + court.price, 0) / courts.length)
    : 0;
  const totalCapacity = courts.reduce((sum, court) => sum + court.capacity, 0);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Court Management</h1>
              <p className="text-muted-foreground">Manage your pickleball courts, pricing, and availability</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading courts...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
    toast({
      title: "Upload Error",
      description: error,
      variant: "destructive"
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('businessToken');
      if (!token) {
        router.replace('/business/login');
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
        image: formData.imageUrl,
        createdBy: formData.createdBy
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
        console.log(formData)
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
        createdBy: companyName || '',
        amenities: []
      });
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Court created successfully",
      });
      
      // Refresh courts list
      await refreshCourts();
    } catch (err) {
      console.error('Error creating court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create court';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
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
      status: court.status,
      createdBy: companyName || '',
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
      const token = localStorage.getItem('businessToken');
      if (!token) {
        router.replace('/business/login');
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
      toast({
        title: "Success",
        description: "Court deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete court';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourt) return;

    try {
      const token = localStorage.getItem('businessToken');
      if (!token) {
        router.replace('/business/login');
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
        createdBy: companyName || '',
        amenities: []
      });
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Court updated successfully",
      });
      
      // Refresh courts list
      await refreshCourts();
    } catch (err) {
      console.error('Error updating court:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update court';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const toggleCourtStatus = async (court: Court) => {
    try {
      const token = localStorage.getItem('businessToken');
      if (!token) {
        router.replace('/business/login');
        return;
      }

      const newStatus = court.status === 'active' ? 'inactive' : 'active';
      
      const response = await fetch(getApiUrl(`api/v1/courts/${court._id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update court status');
      }

      setCourts(prev => prev.map(c => 
        c._id === court._id ? { ...c, status: newStatus } : c
      ));
      
      toast({
        title: "Success",
        description: `Court status updated to ${newStatus}`,
      });
    } catch (err) {
      console.error('Error updating court status:', err);
      toast({
        title: "Error",
        description: "Failed to update court status",
        variant: "destructive"
      });
    }
  };
  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Court Management</h1>
              <p className="text-muted-foreground">Manage your pickleball courts, pricing, and availability</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading courts...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Court Management</h1>
            <p className="text-muted-foreground">Manage your pickleball courts, pricing, and availability</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Court
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search courts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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
          <Dialog open={showCreateForm || showUpdateForm} onOpenChange={(open) => {
            if (!open) {
              setShowCreateForm(false);
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
                createdBy: '',
                amenities: []
              });
              setImagePreview(null);
            }
          }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{showCreateForm ? 'Add New Court' : 'Update Court'}</DialogTitle>
                <DialogDescription>
                  {showCreateForm
                    ? 'Create a new court listing with details and pricing'
                    : 'Update court details and settings'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={showCreateForm ? handleSubmit : handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Court Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Indoor Court 1"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      name="venue"
                      placeholder="e.g., Ground Floor, Main Building"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Court Type *</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value: 'indoor' | 'outdoor') => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select court type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surface">Surface *</Label>
                    <Select 
                      value={formData.surface} 
                      onValueChange={(value: 'concrete' | 'asphalt' | 'wood' | 'synthetic') => 
                        setFormData(prev => ({ ...prev, surface: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select surface type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="asphalt">Asphalt</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="synthetic">Synthetic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Hour (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="500"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="4"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="2"
                      max="4"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime">Opening Time *</Label>
                    <Input
                      id="openingTime"
                      name="openingTime"
                      type="time"
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingTime">Closing Time *</Label>
                    <Input
                      id="closingTime"
                      name="closingTime"
                      type="time"
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the court features and amenities"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Amenities</Label>
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

                <div className="space-y-2">
                  <Label>Court Image</Label>
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        status: checked ? "active" : "inactive" 
                      }))
                    }
                  />
                  <Label htmlFor="status">Court is active and available for booking</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
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
                        createdBy: '',
                        amenities: []
                      });
                      setImagePreview(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {showCreateForm ? 'Add Court' : 'Update Court'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
