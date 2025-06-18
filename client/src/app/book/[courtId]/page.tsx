'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Info, Shield, CheckCircle } from 'lucide-react';
import { TimeSlotSelector } from '@/components/book/time-slot-selector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
  isSelected: boolean;
}

interface Court {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  memberPrice: number;
  image: string;
  type: 'indoor' | 'outdoor';
  surface: 'concrete' | 'asphalt' | 'wood' | 'synthetic';
  capacity: number;
  business: string;
  openingTime: string;
  closingTime: string;
  amenities: string[];
  status: 'active' | 'maintenance' | 'inactive';
  city: string;
}

export default function BookCourtPage() {
  const params = useParams();
  const router = useRouter();
  const [court, setCourt] = useState<Court | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await fetch(`/api/courts/${params.courtId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch court details');
        }
        const result = await response.json();
        setCourt(result.data);
      } catch (err) {
        console.error('Error fetching court details:', err);
        setError('Failed to load court details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourtDetails();
  }, [params.courtId]);

  const handleSlotSelect = (slots: TimeSlot[]) => {
    setSelectedSlots(slots);
    // Don't automatically move to confirm step - let user continue when ready
  };

  const handleContinue = () => {
    if (selectedSlots.length > 0) {
      setStep('confirm');
    } else {
      toast.error('Please select at least one time slot');
    }
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0 || !court) return;

    try {
      // Sort slots by start time to ensure proper order
      const sortedSlots = [...selectedSlots].sort((a, b) => 
        a.startTime.localeCompare(b.startTime)
      );

      const firstSlot = sortedSlots[0];
      const lastSlot = sortedSlots[sortedSlots.length - 1];
      const totalAmount = selectedSlots.reduce((total, slot) => total + slot.price, 0);

      const response = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          court: court._id,
          startTime: new Date(`${selectedDate}T${firstSlot.startTime}`).toISOString(),
          endTime: new Date(`${selectedDate}T${lastSlot.endTime}`).toISOString(),
          totalAmount: totalAmount,
          players: 2, // Default minimum players
          notes: '', // Optional notes
          status: 'pending', // Initial status
          timeSlots: selectedSlots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            price: slot.price
          }))
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }

      const data = await response.json();
      
      // Store booking ID in local storage for reference
      localStorage.setItem('lastBookingId', data.data._id);
      
      toast.success('Booking created successfully!');
      router.push('/bookings/success');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  const getTotalPrice = () => {
    return selectedSlots.reduce((total, slot) => total + slot.price, 0);
  };

  const getTimeRange = () => {
    if (selectedSlots.length === 0) return '';
    
    const sortedSlots = [...selectedSlots].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
    
    const firstSlot = sortedSlots[0];
    const lastSlot = sortedSlots[sortedSlots.length - 1];
    
    return `${firstSlot.startTime} - ${lastSlot.endTime}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!court) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Court not found</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courts
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Court Details */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">{court.name}</h1>
                    <div className="flex items-center text-white/80">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{court.location}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Court Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>9:00 AM - 9:00 PM</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>2-4 Players</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Regular Price</span>
                      <span className="font-semibold">₹{court.price}/hour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Price</span>
                      <span className="font-semibold text-primary">₹{court.memberPrice}/hour</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Section */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                {step === 'select' && (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <TimeSlotSelector
                      courtId={params.courtId as string}
                      date={selectedDate}
                      onSlotSelect={handleSlotSelect}
                      selectedSlots={selectedSlots}
                    />
                    
                    {/* Continue Button */}
                    <div className="mt-6">
                      <Button
                        className="w-full"
                        onClick={handleContinue}
                        disabled={selectedSlots.length === 0}
                      >
                        Continue to Review ({selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} selected)
                      </Button>
                    </div>
                  </>
                )}

                {step === 'confirm' && selectedSlots.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Review Your Booking</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep('select')}
                      >
                        Back to Selection
                      </Button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium">{format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Range</p>
                          <p className="font-medium">{getTimeRange()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Slots</p>
                          <div className="mt-1 space-y-1">
                            {selectedSlots.map((slot, index) => (
                              <div key={slot.id} className="flex justify-between text-sm">
                                <span>{slot.startTime} - {slot.endTime}</span>
                                <span>₹{slot.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Total Price</span>
                            <span className="font-bold text-lg text-primary">₹{getTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleBooking}
                    >
                      Confirm and Book Now
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 