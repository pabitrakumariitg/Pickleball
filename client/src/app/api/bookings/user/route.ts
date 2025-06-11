import { NextResponse } from 'next/server';
import { mockBookings } from '../../courts/[courtId]/slots/route';

export async function GET() {
  try {
    // Convert Map to array and filter by user ID (in a real app, this would be done in the database)
    const bookings = Array.from(mockBookings.values());

    // Sort bookings by date and time
    bookings.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });

    return NextResponse.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 