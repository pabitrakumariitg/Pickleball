import { NextResponse } from 'next/server';
import { mockBookings } from '../courts/[courtId]/slots/route';

interface BookingRequest {
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
}

const mockUser = {
  id: '1', // In a real app, this would come from the session/auth token
  name: 'Test User',
  email: 'test@example.com',
};

export async function POST(request: Request) {
  try {
    const booking: BookingRequest = await request.json();
    const { courtId, date, startTime, endTime, price } = booking;

    // Validate required fields
    if (!courtId || !date || !startTime || !endTime || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate booking ID using date and start time
    const bookingId = `${courtId}-${date}-${startTime}`;

    // Check if the slot is already booked
    if (mockBookings.has(bookingId)) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      );
    }

    // Create the booking record
    const bookingData = {
      id: bookingId,
      courtId,
      date,
      startTime,
      endTime,
      price,
      userId: mockUser.id, // Add user information
      userName: mockUser.name,
      userEmail: mockUser.email,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to our mock database
    mockBookings.set(bookingId, bookingData);

    return NextResponse.json({
      success: true,
      data: bookingData
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 