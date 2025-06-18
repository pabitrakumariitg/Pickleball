"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Minus } from 'lucide-react';
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
  date: string;
  onSlotSelect: (slots: TimeSlot[]) => void;
  selectedSlots: TimeSlot[];
}

export function TimeSlotSelector({ courtId, date, onSlotSelect, selectedSlots }: TimeSlotSelectorProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`/api/courts/${courtId}/slots?date=${date}`);
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
  }, [courtId, date]);

  const handleSlotClick = (clickedSlot: TimeSlot) => {
    if (!clickedSlot.isAvailable) return;

    let newSelectedSlots: TimeSlot[] = [];

    if (selectedSlots.find(slot => slot.id === clickedSlot.id)) {
      // Remove slot if already selected
      newSelectedSlots = selectedSlots.filter(slot => slot.id !== clickedSlot.id);
    } else {
      // Add slot if it's consecutive to existing selection
      if (selectedSlots.length === 0) {
        // First selection
        newSelectedSlots = [clickedSlot];
      } else {
        // Check if it's consecutive
        const allSlots = slots.filter(slot => slot.isAvailable);
        const selectedIndices = selectedSlots.map(slot => 
          allSlots.findIndex(s => s.id === slot.id)
        ).sort((a, b) => a - b);
        
        const clickedIndex = allSlots.findIndex(slot => slot.id === clickedSlot.id);
        
        // Check if clicked slot is adjacent to any selected slot
        const isAdjacent = selectedIndices.some(index => 
          Math.abs(index - clickedIndex) === 1
        );
        
        if (isAdjacent) {
          newSelectedSlots = [...selectedSlots, clickedSlot];
          // Sort by start time
          newSelectedSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        } else {
          // Not adjacent, replace selection
          newSelectedSlots = [clickedSlot];
        }
      }
    }

    onSlotSelect(newSelectedSlots);
  };

  const isSlotSelected = (slot: TimeSlot) => {
    return selectedSlots.some(selectedSlot => selectedSlot.id === slot.id);
  };

  const isSlotInRange = (slot: TimeSlot) => {
    if (selectedSlots.length === 0) return false;
    
    const allSlots = slots.filter(s => s.isAvailable);
    const selectedIndices = selectedSlots.map(s => 
      allSlots.findIndex(availableSlot => availableSlot.id === s.id)
    ).sort((a, b) => a - b);
    
    const slotIndex = allSlots.findIndex(s => s.id === slot.id);
    
    if (slotIndex === -1) return false;
    
    const minIndex = Math.min(...selectedIndices);
    const maxIndex = Math.max(...selectedIndices);
    
    return slotIndex >= minIndex && slotIndex <= maxIndex;
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
        <span>Select Time Slots</span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Click consecutive time slots to book extended sessions. You can select multiple hours in a row. Click "Continue to Review" when you're done selecting.
      </div>

      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <TooltipProvider key={slot.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isSlotSelected(slot) ? "primary" : "outline"}
                  className={`w-full h-12 relative ${
                    !slot.isAvailable
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSlotSelected(slot)
                      ? "bg-primary text-primary-foreground"
                      : isSlotInRange(slot)
                      ? "bg-primary/20 border-primary/30"
                      : "hover:bg-primary/10"
                  }`}
                  disabled={!slot.isAvailable}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.startTime}
                  {isSlotSelected(slot) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-xs text-white">✓</span>
                    </motion.div>
                  )}
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

      {/* Selection Summary */}
      {selectedSlots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-primary">Selected Time Slots</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSlotSelect([])}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Time Range:</span>
              <span className="font-medium">{getTimeRange()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Duration:</span>
              <span className="font-medium">{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Price:</span>
              <span className="font-bold text-primary">₹{getTotalPrice()}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-primary/20">
            <p className="text-xs text-gray-600">
              Click "Continue to Review" below to proceed with your booking
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
} 