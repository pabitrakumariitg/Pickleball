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
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
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

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('confirm');
  };

  const handleBooking = async () => {
    if (!selectedSlot || !court) return;

    try {
      const response = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          court: court._id,
          startTime: new Date(`${selectedDate}T${selectedSlot.startTime}`).toISOString(),
          endTime: new Date(`${selectedDate}T${selectedSlot.endTime}`).toISOString(),
          totalAmount: selectedSlot.price,
          players: 2, // Default minimum players
          notes: '', // Optional notes
          status: 'pending' // Initial status
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
                    selectedSlot={selectedSlot}
                  />
                </>
              )}

              {step === 'confirm' && selectedSlot && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Confirm Booking</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep('select')}
                    >
                      Change
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-medium">₹{selectedSlot.price}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 