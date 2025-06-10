import { NextResponse } from 'next/server';

// Mock data for courts (replace with actual database call later)
const courts = [
  {
    id: "1",
    name: "Kohima Pickleball court",
    location: "Near AKIM Home,Kohima",
    price: 30000,
    memberPrice: 20000,
    image: "/court1.jpg",
    isIndoor: true,
    city: "Kohima",
    available: true,
    description: "State-of-the-art indoor pickleball court with professional equipment",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental", "Water Dispenser"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  },
  {
    id: "2",
    name: "Niathu Resort",
    location: "Chümoukedima, Dimapur",
    price: 25000,
    memberPrice: 15000,
    image: "/court2.jpg",
    isIndoor: true,
    city: "Dimapur",
    available: true,
    description: "Luxury resort pickleball court with premium facilities",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental", "Refreshments"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  },
  {
    id: "3",
    name: "Aiko Arena",
    location: "Purana Bazar, Dimapur",
    price: 20000,
    memberPrice: 12000,
    image: "/court3.jpg",
    isIndoor: false,
    city: "Dimapur",
    available: true,
    description: "Outdoor pickleball court with natural lighting",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  }
];

export async function GET(
  request: Request,
  { params }: { params: { courtId: string } }
) {
  try {
    const court = courts.find(c => c.id === params.courtId);
    
    if (!court) {
      return NextResponse.json(
        { error: 'Court not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: court });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 