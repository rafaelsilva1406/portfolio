import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Use static access token from environment
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    if (!accessToken || accessToken === 'your_linkedin_access_token_here') {
      // Return demo token if no real access token configured
      const demoToken = `demo_token_${Date.now()}`;
      return NextResponse.json({
        access_token: demoToken,
        token_type: 'bearer',
        note: 'Using demo token - Configure LINKEDIN_ACCESS_TOKEN in .env.local for real data',
        expires_in: 5184000, // 60 days
        scope: 'profile email'
      });
    }

    // Return the configured access token
    return NextResponse.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 5184000, // 60 days
      scope: 'profile email'
    });

  } catch (error) {
    console.error('LinkedIn auth error:', error);
    
    // Return demo token as fallback
    return NextResponse.json({
      access_token: `demo_token_${Date.now()}`,
      token_type: 'bearer',
      error: String(error),
      note: 'Using demo token due to configuration error'
    });
  }
}

// POST method for direct token requests (optional alternative)
export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    
    if (!accessToken || accessToken === 'your_linkedin_access_token_here') {
      return NextResponse.json(
        { error: 'LinkedIn access token not configured in environment' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 5184000, // 60 days
      scope: 'profile email'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Token retrieval failed', details: String(error) },
      { status: 500 }
    );
  }
}