import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const zip = searchParams.get('zip');

  if (!zip || zip.length !== 5) {
    return NextResponse.json(
      { error: 'Invalid zip code format' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Invalid zip code' },
        { status: 404 }
      );
    }

    const data = await response.json();
    
    // Check if we have places data
    if (!data || !data.places || !Array.isArray(data.places) || data.places.length === 0) {
      return NextResponse.json(
        { error: 'Invalid zip code' },
        { status: 404 }
      );
    }

    // Get the first place
    const place = data.places[0];
    const cityName = place['place name'] || '';
    const state = place.state || '';
    const stateAbbreviation = place['state abbreviation'] || '';
    
    // Check if it's from New York
    const isNewYork = state === 'New York' || stateAbbreviation === 'NY';
    
    return NextResponse.json({
      valid: !isNewYork,
      isNewYork,
      city: cityName,
      state: state,
      stateAbbreviation: stateAbbreviation,
      error: isNewYork ? 'We don\'t provide service in your area' : undefined
    });
  } catch (error) {
    console.error('Zip code validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate zip code' },
      { status: 500 }
    );
  }
}

