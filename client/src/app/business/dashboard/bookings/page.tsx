"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getApiUrl } from '@/config';
import axios from '@/lib/axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Search, Check, X, Eye, Phone, Mail, MapPin, Clock, Users } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface User {
  _id: string;
  name: string;
  email: string;
}

interface CourtType {
  _id: string;
  name: string;
  createdBy: string;
}

interface Booking {
  _id: string;
  user: User;
  court: CourtType;
  startTime: string;
  endTime: string;
  status: string;
  courtBy?: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [statusFilter, setStatusFilter] = useState("all")
  const [courtFilter, setCourtFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const { toast } = useToast()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [companyName, setCompanyName] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('businessToken');
    if (!token) {
      router.replace('/business/login');
      return;
    }
  }, [router]);

  // Fetch business data and bookings
  useEffect(() => {
    const initializeData = async () => {
      console.log("businessToken", localStorage.getItem("businessToken"));
      console.log("Initializing dashboard data");
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('businessToken');
        if (!token) {
          router.replace('/business/login');
          return;
        }

        // Fetch business data
        const businessRes = await axios.get("/api/v1/businesses/dashboard");
        const businessCompany = businessRes.data.data.business.company;
        console.log("Business company:", businessCompany);
        setCompanyName(businessCompany);

        // Fetch bookings with proper headers
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const bookingsResponse = await fetch(getApiUrl('api/v1/bookings'), { headers });
        console.log("Bookings response:", bookingsResponse);

        if (!bookingsResponse.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const bookingsData = await bookingsResponse.json();
        // console.log("Bookings data:", bookingsData.data);
        // console.log("Company name for filtering:", businessCompany);

        // Filter bookings for this business - check court.createdBy instead of booking.createdBy
        const businessBookings = bookingsData.data.filter(
          (booking: Booking) => {
            // console.log("Booking courtBy:", booking.courtBy);
            // console.log("Comparing with company:", businessCompany);
            return booking.courtBy === businessCompany;
          }
        );

        console.log("Filtered business bookings:", businessBookings);
        console.log("Total bookings found:", businessBookings.length);
        setBookings(businessBookings);

      } catch (err: any) {
        console.error("Error initializing data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load dashboard data.");
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
  }, [router, toast]);

  // Filter bookings based on current filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchQuery === '' ||
      booking.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.court.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    const matchesCourt = courtFilter === 'all' || booking.court._id === courtFilter;

    const matchesDate = !selectedDate ||
      new Date(booking.startTime).toDateString() === selectedDate.toDateString();

    return matchesSearch && matchesStatus && matchesCourt && matchesDate;
  });

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('businessToken');
      const response = await fetch(getApiUrl(`api/v1/bookings/${bookingId}/status`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Update local state
      setBookings(prev => prev.map(booking =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));

      toast({
        title: "Success",
        description: `Booking ${newStatus} successfully`,
      });

    } catch (err) {
      console.error('Error updating booking status:', err);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Manage all court bookings and reservations</p>
        </div>



        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Court</label>
                <Select value={courtFilter} onValueChange={setCourtFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courts</SelectItem>
                    <SelectItem value="Indoor Court 1">Indoor Court 1</SelectItem>
                    <SelectItem value="Indoor Court 2">Indoor Court 2</SelectItem>
                    <SelectItem value="Outdoor Court 1">Outdoor Court 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDate(undefined)
                    setStatusFilter("all")
                    setCourtFilter("all")
                    setSearchTerm("")
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <div className="bg-card rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Court</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-sm text-foreground">{booking.user && booking.user.name ? booking.user.name : '-'}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{booking.court && booking.court.name ? booking.court.name : '-'}</td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {new Date(booking.startTime).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
