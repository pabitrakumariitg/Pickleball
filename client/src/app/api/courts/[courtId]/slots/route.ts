import { NextResponse } from 'next/server';

// Mock data for time slots (replace with actual database call later)
const generateTimeSlots = (courtId: string) => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 21; // 9 PM

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      id: `${courtId}-${hour}`,
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      isAvailable: Math.random() > 0.3, // Randomly make some slots unavailable
      price: 300, // Base price in rupees
      isSelected: false
    });
  }

  return slots;
};

type RouteContext = {
  params: {
    courtId: string;
  };
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const slots = generateTimeSlots(params.courtId);
    return NextResponse.json({ data: slots });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 