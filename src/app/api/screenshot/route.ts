import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // For demo purposes, we'll return placeholder images
    // In a real implementation, you might use a service like:
    // - Screenshots API (e.g., htmlcsstoimage.com, screenshotapi.net)
    // - Puppeteer on a serverless function
    // - Third-party services like URLbox, ScreenshotLayer, etc.
    
    const domain = new URL(url).hostname;
    
    // Mock screenshot URLs for common companies
    const mockScreenshots: { [key: string]: string } = {
      'techcorp.com': '/images/screenshots/techcorp-screenshot.png',
      'startupco.com': '/images/screenshots/startupco-screenshot.png',
      'microsoft.com': '/images/screenshots/microsoft-screenshot.png',
      'google.com': '/images/screenshots/google-screenshot.png',
      'apple.com': '/images/screenshots/apple-screenshot.png',
      'amazon.com': '/images/screenshots/amazon-screenshot.png',
    };

    const screenshotUrl = mockScreenshots[domain] || `/api/placeholder/screenshot/${encodeURIComponent(domain)}`;

    return NextResponse.json({
      url: url,
      screenshot: screenshotUrl,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating screenshot:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate screenshot',
        url: url,
        screenshot: '/api/placeholder/screenshot/default'
      },
      { status: 500 }
    );
  }
}