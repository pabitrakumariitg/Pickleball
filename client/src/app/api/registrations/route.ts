import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * POST handler for registration submissions
 * Forwards JSON data to backend API
 */
export async function POST(request: NextRequest) {
  try {
    // Get the JSON data from the request
    const jsonData = await request.json();
    
    // Forward the JSON data to the backend API
    const response = await fetch(`${API_URL}/api/v1/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });

    // Parse the response from the backend
    const data = await response.json();
    console.log('Backend response:', data); // Log the response for debugging

    // Return the response from the backend with the same status code
    // This ensures error messages from the backend are properly passed to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to submit registration' },
      { status: 500 }
    );
  }
}

/**
 * GET handler for checking registration status
 * @param request - The incoming request
 */
export async function GET(request: NextRequest) {
  try {
    // Get the event ID from the URL search params
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { status: 'error', message: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Fetch registration status from backend API
    const response = await fetch(
      `${API_URL}/api/v1/registrations/status/${eventId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Parse the response from the backend
    const data = await response.json();

    // Return the response from the backend with the same status code
    // This ensures error messages from the backend are properly passed to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error checking registration status:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to check registration status' },
      { status: 500 }
    );
  }
}
