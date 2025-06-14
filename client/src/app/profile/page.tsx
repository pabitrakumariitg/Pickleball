"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Mail, Phone, Edit2, Camera, Tag, CheckCircle, ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { getApiUrl } from '@/config';

interface Booking {
  _id: string;
  id: string;
  court: {
    name: string;
    location: string;
  };
  startTime: string;
  endTime: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  players: number;
  totalAmount: number;
  payment?: {
    status: 'success' | 'pending' | 'failed';
  };
  notes?: string;
  cancellationReason?: string;
}

interface MembershipData {
  status: 'active' | 'inactive' | 'expired';
  type: string;
  startDate: string;
  endDate: string;
  benefits: string[];
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
      // Load profile image from localStorage
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
      fetchBookings();
      fetchMembershipStatus();
    }
  }, [user]);

  const fetchMembershipStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login');
        return;
      }

      // First try the membership-specific endpoint
      let response = await fetch(getApiUrl("api/v1/memberships/status"), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setMembershipData(data.data);
          return;
        }
      }

      // If membership endpoint fails or returns no data, try user membership status
      response = await fetch(getApiUrl("api/v1/users/membership-status"), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data.hasActiveMembership) {
          // Create membership data from user info
          setMembershipData({
            type: data.data.membershipType,
            status: data.data.membershipStatus,
            endDate: data.data.membershipExpiry,
            startDate: new Date().toISOString(), // We don't have this from user model
            benefits: getMembershipBenefits(data.data.membershipType)
          });
          return;
        }
      }

      // If both fail, set to null (no membership)
      setMembershipData(null);
    } catch (err) {
      console.error("Failed to fetch membership status:", err);
      // Don't show error toast for membership status - it's optional
      setMembershipData(null);
    }
  };

  // Helper function to get membership benefits
  const getMembershipBenefits = (type: string) => {
    const baseBenefits = [
      'Access to all courts',
      'Priority booking',
      'Free equipment rental',
      'Member-only events'
    ];

    if (type === 'monthly') {
      return [...baseBenefits, '10% discount on lessons'];
    } else if (type === 'yearly') {
      return [
        ...baseBenefits,
        '2 months free',
        'Exclusive tournaments',
        'Personal coach consultation',
        '20% discount on lessons',
        'Free gear bag'
      ];
    }

    return baseBenefits;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
        toast.success("Profile picture updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(getApiUrl("api/v1/bookings/user"), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(getApiUrl("api/v1/users/profile"), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        // Update the user context if needed
        if (updateProfile) {
          await updateProfile({
            name: formData.name,
            email: formData.email
          });
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{booking.court.name}</h3>
            <p className="text-gray-600">{booking.court.location}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-medium">{new Date(booking.startTime).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-medium">
              {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
              {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Players</p>
            <p className="font-medium">{booking.players}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="font-medium">₹{booking.totalAmount}</p>
          </div>
        </div>

        {booking.payment && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">Payment Status</p>
            <p className={`font-medium ${
              booking.payment.status === 'success' ? 'text-green-600' :
              booking.payment.status === 'pending' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
            </p>
          </div>
        )}

        {booking.notes && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">Notes</p>
            <p className="text-gray-800">{booking.notes}</p>
          </div>
        )}

        {booking.cancellationReason && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">Cancellation Reason</p>
            <p className="text-gray-800">{booking.cancellationReason}</p>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-4">
          Booking ID: {booking._id}
          <br />
          Created: {new Date(booking.createdAt).toLocaleString()}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mt-10 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details - Left Column */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Profile Image and Basic Info */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile"
                          width={128}
                          height={128}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-primary" />
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90"
                    >
                      <Camera className="h-4 w-4" />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>

                {/* Membership Status */}
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-5 w-5 text-primary" />
                    <span className="font-medium">Membership Status</span>
                  </div>
                  
                  {membershipData ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{membershipData.type} Membership</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Valid until: {format(new Date(membershipData.endDate), 'MMM d, yyyy')}
                      </div>
                      {membershipData.benefits && membershipData.benefits.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Benefits:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {membershipData.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                            {membershipData.benefits.length > 3 && (
                              <li className="text-xs text-primary">+{membershipData.benefits.length - 3} more benefits</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">No Active Membership</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Get exclusive benefits with a membership
                      </p>
                      <Button
                        onClick={() => router.push('/membership')}
                        size="sm"
                        className="w-full text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Get Membership
                      </Button>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center justify-between">
                    Contact Information
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-primary"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </h3>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{user?.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Booking History - Right Column */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Booking History</h2>
                <Button
                  onClick={() => router.push('/book')}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Book a Court
                </Button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-gray-600 mb-4">No bookings found</p>
                  <Button
                    onClick={() => router.push('/book')}
                    className="inline-flex items-center gap-2"
                  >
                    Book Your First Court
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 