"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

const bookings = [
  {
    id: "BK001",
    playerName: "Rahul Sharma",
    playerEmail: "rahul@example.com",
    playerPhone: "+91 9876543210",
    court: "Indoor Court 1",
    date: "2024-01-15",
    timeSlot: "10:00 AM - 11:00 AM",
    duration: 1,
    pricePerHour: 500,
    totalAmount: 500,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    bookingDate: "2024-01-10",
    specialRequests: "Need extra lighting",
  },
  {
    id: "BK002",
    playerName: "Priya Patel",
    playerEmail: "priya@example.com",
    playerPhone: "+91 9876543211",
    court: "Outdoor Court 1",
    date: "2024-01-15",
    timeSlot: "2:00 PM - 4:00 PM",
    duration: 2,
    pricePerHour: 400,
    totalAmount: 800,
    paymentStatus: "pending",
    bookingStatus: "pending",
    bookingDate: "2024-01-12",
    specialRequests: "",
  },
  {
    id: "BK003",
    playerName: "Amit Kumar",
    playerEmail: "amit@example.com",
    playerPhone: "+91 9876543212",
    court: "Indoor Court 2",
    date: "2024-01-16",
    timeSlot: "6:00 PM - 7:00 PM",
    duration: 1,
    pricePerHour: 500,
    totalAmount: 500,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    bookingDate: "2024-01-11",
    specialRequests: "",
  },
  {
    id: "BK004",
    playerName: "Sneha Reddy",
    playerEmail: "sneha@example.com",
    playerPhone: "+91 9876543213",
    court: "Indoor Court 1",
    date: "2024-01-14",
    timeSlot: "9:00 AM - 10:00 AM",
    duration: 1,
    pricePerHour: 500,
    totalAmount: 500,
    paymentStatus: "refunded",
    bookingStatus: "cancelled",
    bookingDate: "2024-01-09",
    specialRequests: "",
  },
]

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [statusFilter, setStatusFilter] = useState("all")
  const [courtFilter, setCourtFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const { toast } = useToast()

  const handleAcceptBooking = (bookingId: string) => {
    toast({
      title: "Booking accepted",
      description: `Booking ${bookingId} has been confirmed.`,
    })
  }

  const handleRejectBooking = (bookingId: string) => {
    toast({
      title: "Booking rejected",
      description: `Booking ${bookingId} has been cancelled.`,
    })
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter
    const matchesCourt = courtFilter === "all" || booking.court === courtFilter
    const matchesSearch =
      booking.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = !selectedDate || booking.date === format(selectedDate, "yyyy-MM-dd")

    return matchesStatus && matchesCourt && matchesSearch && matchesDate
  })

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.bookingStatus === "pending").length,
    confirmed: bookings.filter((b) => b.bookingStatus === "confirmed").length,
    cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Manage all court bookings and reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <p className="text-xs text-muted-foreground">Cancelled bookings</p>
            </CardContent>
          </Card>
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
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              Showing {filteredBookings.length} of {bookings.length} bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Player Details</TableHead>
                  <TableHead>Court & Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.playerName}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {booking.playerEmail}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {booking.playerPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.court}</div>
                        <div className="text-sm text-muted-foreground">{booking.date}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{booking.timeSlot}</div>
                        <div className="text-muted-foreground">{booking.duration}h duration</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">₹{booking.totalAmount}</div>
                        <div className="text-sm text-muted-foreground">₹{booking.pricePerHour}/hr</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.paymentStatus === "paid"
                            ? "default"
                            : booking.paymentStatus === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.bookingStatus === "confirmed"
                            ? "default"
                            : booking.bookingStatus === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                              <DialogDescription>Complete booking information and player details</DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Player Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.playerName}
                                        </div>
                                        <div className="flex items-center">
                                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.playerEmail}
                                        </div>
                                        <div className="flex items-center">
                                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.playerPhone}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Booking Details</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.court}
                                        </div>
                                        <div className="flex items-center">
                                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.date}
                                        </div>
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                          {selectedBooking.timeSlot}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Payment Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                          <span>Duration:</span>
                                          <span>{selectedBooking.duration} hour(s)</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span>Rate per hour:</span>
                                          <span>₹{selectedBooking.pricePerHour}</span>
                                        </div>
                                        <div className="flex items-center justify-between font-medium">
                                          <span>Total Amount:</span>
                                          <span>₹{selectedBooking.totalAmount}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span>Payment Status:</span>
                                          <Badge
                                            variant={
                                              selectedBooking.paymentStatus === "paid"
                                                ? "default"
                                                : selectedBooking.paymentStatus === "pending"
                                                  ? "secondary"
                                                  : "destructive"
                                            }
                                          >
                                            {selectedBooking.paymentStatus}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Additional Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                          <span>Booking Date:</span>
                                          <span>{selectedBooking.bookingDate}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span>Status:</span>
                                          <Badge
                                            variant={
                                              selectedBooking.bookingStatus === "confirmed"
                                                ? "default"
                                                : selectedBooking.bookingStatus === "pending"
                                                  ? "secondary"
                                                  : "destructive"
                                            }
                                          >
                                            {selectedBooking.bookingStatus}
                                          </Badge>
                                        </div>
                                        {selectedBooking.specialRequests && (
                                          <div>
                                            <span className="font-medium">Special Requests:</span>
                                            <p className="text-muted-foreground mt-1">
                                              {selectedBooking.specialRequests}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {selectedBooking.bookingStatus === "pending" && (
                                  <div className="flex justify-end space-x-2 pt-4 border-t">
                                    <Button variant="outline" onClick={() => handleRejectBooking(selectedBooking.id)}>
                                      <X className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button onClick={() => handleAcceptBooking(selectedBooking.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      Accept
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {booking.bookingStatus === "pending" && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleAcceptBooking(booking.id)}>
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRejectBooking(booking.id)}>
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
