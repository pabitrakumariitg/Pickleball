"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
  isSelected: boolean;
}

interface TimeSlotSelectorProps {
  courtId: string;
  onSlotSelect: (slot: TimeSlot) => void;
  selectedSlot: TimeSlot | null;
}

export function TimeSlotSelector({ courtId, onSlotSelect, selectedSlot }: TimeSlotSelectorProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`/api/courts/${courtId}/slots`);
        if (!response.ok) {
          throw new Error('Failed to fetch time slots');
        }
        const result = await response.json();
        setSlots(result.data);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load time slots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [courtId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Clock className="w-5 h-5" />
        <span>Select Time Slot</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <TooltipProvider key={slot.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={slot.isSelected ? "default" : "outline"}
                  className={`w-full h-12 ${
                    !slot.isAvailable
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : slot.isSelected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10"
                  }`}
                  disabled={!slot.isAvailable}
                  onClick={() => onSlotSelect(slot)}
                >
                  {slot.startTime}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{slot.startTime} - {slot.endTime}</p>
                <p className="text-sm text-muted-foreground">₹{slot.price}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
} 