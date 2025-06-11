import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { courtId: string } }
) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/courts/${params.courtId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch court');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching court:', error);
    return NextResponse.json(
      { error: 'Failed to fetch court details' },
      { status: 500 }
    );
  }
} 