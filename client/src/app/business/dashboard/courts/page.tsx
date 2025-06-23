"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, MapPin, Clock, Users, Camera } from "lucide-react"

const courts = [
  {
    id: 1,
    name: "Indoor Court 1",
    type: "Indoor",
    pricePerHour: 500,
    maxPlayers: 4,
    status: "active",
    availability: "6:00 AM - 10:00 PM",
    location: "Ground Floor, Main Building",
    description: "Premium indoor court with air conditioning and professional lighting",
    images: 3,
  },
  {
    id: 2,
    name: "Indoor Court 2",
    type: "Indoor",
    pricePerHour: 500,
    maxPlayers: 4,
    status: "active",
    availability: "6:00 AM - 10:00 PM",
    location: "Ground Floor, Main Building",
    description: "Premium indoor court with air conditioning and professional lighting",
    images: 2,
  },
  {
    id: 3,
    name: "Outdoor Court 1",
    type: "Outdoor",
    pricePerHour: 400,
    maxPlayers: 4,
    status: "inactive",
    availability: "6:00 AM - 8:00 PM",
    location: "Outdoor Area, East Wing",
    description: "Open-air court with natural lighting and scenic views",
    images: 4,
  },
]

export default function CourtsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCourt, setEditingCourt] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerHour: "",
    maxPlayers: "",
    availability: "",
    location: "",
    description: "",
    status: "active",
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: editingCourt ? "Court updated" : "Court added",
      description: editingCourt
        ? "Court details have been updated successfully."
        : "New court has been added successfully.",
    })
    setIsAddDialogOpen(false)
    setEditingCourt(null)
    setFormData({
      name: "",
      type: "",
      pricePerHour: "",
      maxPlayers: "",
      availability: "",
      location: "",
      description: "",
      status: "active",
    })
  }

  const handleEdit = (court: any) => {
    setEditingCourt(court)
    setFormData({
      name: court.name,
      type: court.type,
      pricePerHour: court.pricePerHour.toString(),
      maxPlayers: court.maxPlayers.toString(),
      availability: court.availability,
      location: court.location,
      description: court.description,
      status: court.status,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (courtId: number) => {
    toast({
      title: "Court deleted",
      description: "Court has been removed successfully.",
    })
  }

  const toggleCourtStatus = (courtId: number) => {
    toast({
      title: "Court status updated",
      description: "Court availability has been updated.",
    })
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Court
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCourt ? "Edit Court" : "Add New Court"}</DialogTitle>
                <DialogDescription>
                  {editingCourt
                    ? "Update court details and settings"
                    : "Create a new court listing with details and pricing"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Court Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Indoor Court 1"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Court Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select court type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indoor">Indoor</SelectItem>
                        <SelectItem value="Outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerHour">Price per Hour (₹) *</Label>
                    <Input
                      id="pricePerHour"
                      type="number"
                      placeholder="500"
                      value={formData.pricePerHour}
                      onChange={(e) => handleInputChange("pricePerHour", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPlayers">Max Players *</Label>
                    <Input
                      id="maxPlayers"
                      type="number"
                      placeholder="4"
                      value={formData.maxPlayers}
                      onChange={(e) => handleInputChange("maxPlayers", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability *</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., 6:00 AM - 10:00 PM"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Ground Floor, Main Building"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the court features and amenities"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Court Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload court images or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each (max 5 images)</p>
                    <Button type="button" variant="outline" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                  />
                  <Label htmlFor="status">Court is active and available for booking</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false)
                      setEditingCourt(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">{editingCourt ? "Update Court" : "Add Court"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courts</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 active, 1 inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹467</div>
              <p className="text-xs text-muted-foreground">per hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">players simultaneously</p>
            </CardContent>
          </Card>
        </div>

        {/* Courts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Courts</CardTitle>
            <CardDescription>Manage all your pickleball courts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Court Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price/Hour</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courts.map((court) => (
                  <TableRow key={court.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{court.name}</div>
                        <div className="text-sm text-muted-foreground">{court.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={court.type === "Indoor" ? "default" : "secondary"}>{court.type}</Badge>
                    </TableCell>
                    <TableCell>₹{court.pricePerHour}</TableCell>
                    <TableCell>{court.maxPlayers} players</TableCell>
                    <TableCell className="text-sm">{court.availability}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant={court.status === "active" ? "default" : "secondary"}>{court.status}</Badge>
                        <Switch
                          checked={court.status === "active"}
                          onCheckedChange={() => toggleCourtStatus(court.id)}
                          size="sm"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{court.images}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(court)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(court.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
