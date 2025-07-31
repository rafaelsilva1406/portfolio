import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ params: string[] }> }
) {
  const { params } = await context.params;
  const [type, identifier, size] = params;
  
  // Generate placeholder image based on type
  const width = size ? parseInt(size) : 400;
  const height = type === 'avatar' ? width : Math.floor(width * 0.6);
  
  let backgroundColor = '#e5e7eb';
  let text = 'Image';
  
  switch (type) {
    case 'avatar':
      backgroundColor = '#3b82f6';
      text = identifier ? identifier.charAt(0).toUpperCase() : 'A';
      break;
    case 'company-logo':
      backgroundColor = '#1f2937';
      text = identifier ? identifier.split('-')[0].toUpperCase() : 'LOGO';
      break;
    case 'screenshot':
      backgroundColor = '#f3f4f6';
      text = identifier ? decodeURIComponent(identifier).replace(/\.(com|org|net|io)$/, '').toUpperCase() : 'SITE';
      break;
  }
  
  // Generate SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            fill="white" 
            font-family="Arial, sans-serif" 
            font-size="${Math.min(width, height) / 8}"
            font-weight="bold">
        ${text}
      </text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}