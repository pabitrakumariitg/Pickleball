import { NextResponse } from 'next/server';

// Mock data for courts (replace with actual database call later)
const courts = [
  {
    id: "1",
    name: "Akim Astro Turf",
    location: "M4V4+F9, Kohima, Nagaland 797001",
    price: 28000,
    memberPrice: 18000,
    image: "/court1.jpg",
    isIndoor: true,
    city: "Kohima",
    available: true,
    description: "High-quality turf pickleball court in the heart of Kohima, perfect for all skill levels.",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental", "Water Dispenser"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  },
  {
    id: "2",
    name: "Aiko Greens",
    location: "Purana Bazar, Dimapur, Nagaland 797112, India",
    price: 22000,
    memberPrice: 14000,
    image: "/court2.jpg",
    isIndoor: false,
    city: "Dimapur",
    available: true,
    description: "Beautiful outdoor pickleball court with green surroundings and modern facilities.",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  },
  {
    id: "3",
    name: "Niathu Resort",
    location: "Chumukedima, 7th Mile, Dimapur, Nagaland 797103",
    price: 25000,
    memberPrice: 15000,
    image: "/court3.jpg",
    isIndoor: true,
    city: "Dimapur",
    available: true,
    description: "Luxury resort court offering top-notch indoor pickleball experience.",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental", "Refreshments"],
    operatingHours: {
      start: "09:00",
      end: "21:00"
    }
  },
  {
    id: "4",
    name: "Noune Resort",
    location: "Seithekiema-A Village, Seithekima-A, Dimapur, Nagaland 797103",
    price: 23000,
    memberPrice: 13000,
    image: "/court4.jpg",
    isIndoor: false,
    city: "Dimapur",
    available: true,
    description: "Scenic outdoor pickleball court located inside Noune Resort, surrounded by nature.",
    amenities: ["Parking", "Changing Rooms", "Equipment Rental", "Cafeteria"],
    operatingHours: {
      start: "08:00",
      end: "20:00"
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