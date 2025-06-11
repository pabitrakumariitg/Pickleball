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

interface Booking {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'confirmed';
  createdAt: string;
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
  const [membershipData, setMembershipData] = useState<any>(null);
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
      const response = await fetch("/api/v1/membership/status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setMembershipData(data.data.membership);
      }
    } catch (err) {
      console.error("Failed to fetch membership status:", err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings/user");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings");
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
      await updateProfile({
        name: formData.name,
        email: formData.email
      });
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update profile");
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
                {membershipData && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">Membership Status</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{membershipData.type}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Valid until: {format(new Date(membershipData.expiryDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                )}

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
                    <Card key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium">
                              {format(new Date(booking.date), 'MMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>Court {booking.courtId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-1">
                            {booking.status}
                          </span>
                          <div className="text-sm text-gray-600">
                            ₹{booking.price}
                          </div>
                        </div>
                      </div>
                    </Card>
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