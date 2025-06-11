import { NextResponse } from 'next/server';

// Type definitions
interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
  isSelected: boolean;
}

interface Booking {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'confirmed';
  createdAt: string;
}

// Mock data for bookings (replace with actual database call later)
export const mockBookings = new Map<string, Booking>();

// Generate time slots for a specific date
const generateTimeSlots = (courtId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 21; // 9 PM
  const basePrice = 300; // Base price in rupees

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    const slotId = `${courtId}-${date}-${startTime}`;

    // Check if the slot is booked
    const isBooked = mockBookings.has(slotId);

    slots.push({
      id: slotId,
      startTime,
      endTime,
      isAvailable: !isBooked,
      price: basePrice,
      isSelected: false
    });
  }

  return slots;
};

export async function GET(
  request: Request,
  { params }: { params: { courtId: string } }
) {
  try {
    // Get date from query params
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    // Generate slots for the date
    const slots = generateTimeSlots(params.courtId, date);

    return NextResponse.json({ data: slots });
  } catch (error) {
    console.error('Error generating slots:', error);
    return NextResponse.json(
      { error: 'Failed to get available slots' },
      { status: 500 }
    );
  }
} 