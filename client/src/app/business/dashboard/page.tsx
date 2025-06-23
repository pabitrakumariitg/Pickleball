"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      console.log("businessToken", localStorage.getItem("businessToken"));
      console.log("fetchDashboard")
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get("/api/v1/businesses/dashboard")
        setStats(res.data.data.stats)
        setBusiness(res.data.data.business)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {business?.name || "Business"}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courts</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCourts ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total courts managed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats?.totalRevenue ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.averageRating?.toFixed(2) ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">Across all courts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Email</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{business?.email}</div>
              <p className="text-xs text-muted-foreground">Contact email</p>
            </CardContent>
          </Card>
        </div>

        {/* You can add more sections here, e.g., recent bookings, notifications, etc., by fetching from the backend as needed */}
      </div>
    </DashboardLayout>
  )
}
