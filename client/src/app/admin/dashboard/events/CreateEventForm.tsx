"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudinaryPhoto } from "@/lib/cloudinary";
import PhotoUpload from "@/components/ui/PhotoUpload";
import { PlusCircle, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  fee: number;
  maxParticipants: number;
  status: string;
  images?: string;
  convenience?: {
    percentage: number;
    fixedAmount: number;
  };
}

interface CreateEventFormProps {
  onSuccess?: () => void;
  eventToEdit?: Event | null;
  mode?: 'create' | 'edit';
  onCancel?: () => void;
}

export default function CreateEventForm({ 
  onSuccess, 
  eventToEdit = null, 
  mode = 'create',
  onCancel 
}: CreateEventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    startDate: "",
    endDate: "",
    fee: "",
    maxParticipants: "100",
    images: "",
  });

  const [fees, setFees] = useState({
    gstPercentage: 18,
    includeGst: false,
    conveniencePercentage: 5,
    convenienceFixedAmount: 0,
    includeConvenience: true
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (photo: CloudinaryPhoto) => {
    setEventData(prev => ({ ...prev, images: photo.url }));
    setImagePreview(photo.url);
  };

  const handleImageError = (error: string) => {
    setError(error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEventData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFeeChange = (field: keyof typeof fees, value: boolean | number) => {
    setFees(prev => ({ ...prev, [field]: value }));
  };

  const calculateFinalPrice = (basePrice: number) => {
    let finalPrice = basePrice;
    
    if (fees.includeGst) {
      finalPrice += (basePrice * fees.gstPercentage) / 100;
    }
    
    if (fees.includeConvenience) {
      finalPrice += (basePrice * fees.conveniencePercentage) / 100;
      finalPrice += fees.convenienceFixedAmount;
    }
    
    return finalPrice;
  };

  // Populate form fields when editing an existing event
  useEffect(() => {
    if (mode === 'edit' && eventToEdit) {
      console.log("Editing event:", eventToEdit);
      
      // Format dates for datetime-local input
      let formattedStartDate = "";
      let formattedEndDate = "";
      
      try {
        if (eventToEdit.startDate) {
          // Format date to YYYY-MM-DDThh:mm format for datetime-local input
          const startDate = new Date(eventToEdit.startDate);
          formattedStartDate = startDate.toISOString().slice(0, 16);
        }
        
        if (eventToEdit.endDate) {
          // Format endDate to YYYY-MM-DDThh:mm format for datetime-local input
          const endDate = new Date(eventToEdit.endDate);
          formattedEndDate = endDate.toISOString().slice(0, 16);
        }
      } catch (err) {
        console.error("Error formatting dates:", err);
      }
      
      // Ensure we have the right field mappings
      const updatedEventData = {
        title: eventToEdit.title || "",
        description: eventToEdit.description || "",
        location: eventToEdit.location || "",
        city: eventToEdit.city || "",
        state: eventToEdit.state || "",
        country: eventToEdit.country || "India",
        pincode: eventToEdit.pincode || "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        fee: eventToEdit.fee ? eventToEdit.fee.toString() : "",
        maxParticipants: eventToEdit.maxParticipants ? eventToEdit.maxParticipants.toString() : "100",
        images: eventToEdit.images || "",
      };
      
      console.log("Mapped form data:", updatedEventData);
      setEventData(updatedEventData);

      // Set image preview if image exists
      if (eventToEdit.images) {
        console.log("Setting image preview:", eventToEdit.images);
        setImagePreview(eventToEdit.images);
      }
      
      // Set convenience fees if they exist
      if (eventToEdit.convenience) {
        const updatedFees = {
          ...fees,
          conveniencePercentage: eventToEdit.convenience.percentage || 5,
          convenienceFixedAmount: eventToEdit.convenience.fixedAmount || 0,
          includeConvenience: true
        };
        console.log("Setting convenience fees:", updatedFees);
        setFees(updatedFees);
      }
    }
  }, [eventToEdit, mode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Simple validation
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.location ||
      !eventData.startDate ||
      !eventData.fee ||
      !eventData.images
    ) {
      setError("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Format the payload according to backend model
      const eventPayload = {
        title: eventData.title,
        description: eventData.description,
        startDate: new Date(eventData.startDate), 
        endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
        location: eventData.location,
        city: eventData.city,
        state: eventData.state,
        country: eventData.country,
        pincode: eventData.pincode,
        convenience: {
          percentage: fees.includeConvenience ? fees.conveniencePercentage : 0,
          fixedAmount: fees.includeConvenience ? fees.convenienceFixedAmount : 0
        },
        images: eventData.images,
        banner: eventData.images, // Add banner field with the same image URL
        fee: parseFloat(eventData.fee),
        maxParticipants: parseInt(eventData.maxParticipants)
      };

      console.log("Submitting event payload:", eventPayload);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      let response;

      // Use different API endpoint based on mode (create vs edit)
      if (mode === 'create') {
        // Create new event
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/admin/events`,
          eventPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Update existing event
        if (!eventToEdit?._id) {
          throw new Error("Event ID not found for editing");
        }
        
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/admin/events/${eventToEdit._id}`,
          eventPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("Event saved successfully:", response.data);
      toast.success(mode === 'create' ? "Event created successfully!" : "Event updated successfully!");
      
      // Reset form on success for create mode
      if (mode === 'create') {
        setEventData({
          title: "",
          description: "",
          location: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
          startDate: "",
          endDate: "",
          fee: "",
          maxParticipants: "100",
          images: "",
        });
        setImagePreview(null);
      }
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error saving event:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to save event";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          {mode === 'create' ? 'Create New Event' : 'Edit Event'}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="bg-card border border-border shadow-lg w-full">
          <CardHeader>
            <CardTitle className="text-foreground">Event Information</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details below to add a new event to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Event Image *</Label>
              <PhotoUpload 
                onUpload={(photo) => {
                  setEventData({
                    ...eventData,
                    images: photo.url,
                  });
                  setImagePreview(photo.url);
                }}
                onError={handleImageError}
                folder="events"
                showPreview={true}
                previewSize="lg"
              />
              {imagePreview && (
                <div className="mt-2 relative w-full h-40 justify-center align-center overflow-hidden">
                  <img 
                    src={imagePreview}
                    alt="Event preview" 
                    className="object-cover w-1/2 h-full"
                  />
                </div>
              )}
              {!eventData.images && !imagePreview && (
                <p className="text-xs text-red-500">Event image is required</p>
              )}
            </div>

            {/* Basic Event Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={handleChange}
                  placeholder="e.g., Annual Tech Conference"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location Address *</Label>
                <Input
                  id="location"
                  value={eventData.location}
                  onChange={handleChange}
                  placeholder="e.g., 123 Main St, City Convention Center"
                  required
                />
              </div>
            </div>
            
            {/* Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={eventData.city}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={eventData.state}
                  onChange={handleChange}
                  placeholder="e.g., Maharashtra"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={eventData.country}
                  onChange={handleChange}
                  placeholder="e.g., India"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={eventData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 400001"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description *</Label>
              <Textarea
                id="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Describe the event..."
                required
              />
            </div>
            
            {/* Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date & Time *</Label>
                <Input
                  id="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                  type="datetime-local"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date & Time *</Label>
                <Input
                  id="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                  type="datetime-local"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fee">Price (₹) *</Label>
              <Input
                id="fee"
                type="number"
                value={eventData.fee}
                onChange={handleChange}
                placeholder="e.g., 500"
                required
              />
              {eventData.fee && (
                <div className="text-xs text-muted-foreground pt-1">
                  Final Price: ₹{calculateFinalPrice(parseFloat(eventData.fee) || 0).toFixed(2)}
                  {(fees.includeGst || fees.includeConvenience) && " (incl. fees)"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Max Participants *</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={eventData.maxParticipants}
                onChange={handleChange}
                placeholder="e.g., 100"
                required
              />
            </div>

            {/* Fees Configuration */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Fee Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GST Configuration */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeGst"
                        checked={fees.includeGst}
                        onCheckedChange={(checked) => handleFeeChange('includeGst', checked as boolean)}
                      />
                      <Label htmlFor="includeGst" className="text-sm font-medium">
                        Include GST
                      </Label>
                    </div>
                    {fees.includeGst && (
                      <div className="space-y-2">
                        <Label htmlFor="gstPercentage">GST Percentage (%)</Label>
                        <Input
                          id="gstPercentage"
                          type="number"
                          value={fees.gstPercentage}
                          onChange={(e) => handleFeeChange('gstPercentage', parseFloat(e.target.value) || 0)}
                          placeholder="18"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Convenience Fee Configuration */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeConvenience"
                        checked={fees.includeConvenience}
                        onCheckedChange={(checked) => handleFeeChange('includeConvenience', checked as boolean)}
                      />
                      <Label htmlFor="includeConvenience" className="text-sm font-medium">
                        Include Convenience Fee
                      </Label>
                    </div>
                    {fees.includeConvenience && (
                      <div className="space-y-2">
                        <div className="space-y-2">
                          <Label htmlFor="conveniencePercentage">Convenience Percentage (%)</Label>
                          <Input
                            id="conveniencePercentage"
                            type="number"
                            value={fees.conveniencePercentage}
                            onChange={(e) => handleFeeChange('conveniencePercentage', parseFloat(e.target.value) || 0)}
                            placeholder="5"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="convenienceFixed">Fixed Amount (₹)</Label>
                          <Input
                            id="convenienceFixed"
                            type="number"
                            value={fees.convenienceFixedAmount}
                            onChange={(e) => handleFeeChange('convenienceFixedAmount', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="p-4 text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2">⏳</span>
                    {mode === 'create' ? 'Creating Event...' : 'Updating Event...'}
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {mode === 'create' ? 'Create Event' : 'Update Event'}
                  </>
                )}
              </Button>
              {mode === 'edit' && (
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}