# LinkedIn Portfolio Integration - Documentation

## Project Overview

This Next.js application is a professional portfolio website that integrates with LinkedIn API to automatically populate profile information, experience, education, and skills data. The application features a modern design using Bootstrap and Tailwind CSS with a customizable dark grey and blue color scheme.

## Features

### ✅ Completed Features

1. **LinkedIn API Integration**
   - OAuth 2.0 authentication support
   - Profile data fetching (name, headline, location, profile picture)
   - Experience data with company information
   - Education background
   - Skills with endorsement counts
   - Fallback to mock data when API is not configured

2. **Responsive Layout**
   - Header with navigation and profile preview
   - Hero section with profile information
   - Experience cards with company screenshots
   - Separate pages for Experience, Education, Skills, and Contact
   - Footer with project information

3. **UI/UX Components**
   - Bootstrap 5.3.7 for layout and components
   - Tailwind CSS 4.1.11 for utility classes
   - Custom dark grey (#374151) and blue (#0369a1) color scheme
   - Hover animations and transitions
   - Loading states with placeholder animations
   - Responsive design for mobile devices

4. **Company Screenshot Integration**
   - API endpoint to fetch website screenshots
   - Placeholder generation for demo purposes
   - Fallback images for companies

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── linkedin/
│   │   │   └── profile/
│   │   │       └── route.ts          # LinkedIn profile data API
│   │   ├── screenshot/
│   │   │   └── route.ts              # Company screenshot API  
│   │   └── placeholder/
│   │       └── [...params]/
│   │           └── route.ts          # Dynamic placeholder images
│   ├── contact/
│   │   └── page.tsx                  # Contact page
│   ├── education/
│   │   └── page.tsx                  # Education page
│   ├── experience/
│   │   └── page.tsx                  # Experience page
│   ├── skills/
│   │   └── page.tsx                  # Skills page
│   ├── globals.css                   # Global styles and theme
│   ├── layout.tsx                    # Root layout with header/footer
│   └── page.tsx                      # Home page with hero and preview
├── components/
│   └── ui/
│       ├── Header.tsx                # Navigation header
│       ├── Hero.tsx                  # Hero section component
│       ├── ExperienceCard.tsx        # Experience card component
│       └── Footer.tsx                # Footer component
└── lib/
    └── linkedin.ts                   # LinkedIn API utilities
```

## Environment Configuration

Create a `.env.local` file in the root directory:

```env
# LinkedIn API Configuration
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token_here

# Application Configuration
NEXTAUTH_URL=http://localhost:8080
NEXTAUTH_SECRET=your_nextauth_secret_here

# Portfolio Configuration
PORTFOLIO_NAME="Rafael Silva"
PORTFOLIO_TITLE="Senior Software Developer"
PORTFOLIO_EMAIL="your.email@example.com"
```

## LinkedIn API Setup

### Requirements
1. LinkedIn Developer Account
2. LinkedIn App Registration  
3. Access Token Generation (for profile access)

### Authentication Flow
- **Static Access Token**: Uses `LINKEDIN_ACCESS_TOKEN` from environment variables
- **Automatic Fallback**: Falls back to demo data if token not configured
- **No OAuth Required**: Direct token usage without redirect flows

### Available Endpoints
- Profile API: Basic profile information with `profile` and `email` scopes
- Experience API: Professional experience (falls back to mock data)
- Education API: Educational background (falls back to mock data)  
- Skills API: Skills and endorsements (falls back to mock data)

### Limitations
- LinkedIn API access is restricted to approved partners for full profile data
- Most detailed profile APIs require special permissions
- Mock data is provided as fallback for development and demo purposes

### Getting Access Token
1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create or select your app
3. Generate an access token with `profile` and `email` permissions
4. Set `LINKEDIN_ACCESS_TOKEN` in your `.env.local` file

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## API Endpoints

### GET /api/linkedin/auth
Returns LinkedIn access token for API authentication.

**Query Parameters:** None required

**Response:**
```json
{
  "access_token": "AQV...",
  "token_type": "bearer",
  "expires_in": 5184000,
  "scope": "profile email"
}
```

**Notes:**
- Returns static token from `LINKEDIN_ACCESS_TOKEN` environment variable
- Falls back to demo token if not configured
- Demo tokens start with `demo_token_`

### GET /api/linkedin/profile
Returns complete LinkedIn profile data including:
- Profile information (name, headline, location, picture)
- Professional experiences
- Educational background  
- Skills and endorsements

**Query Parameters:**
- `token` (optional): LinkedIn access token for authentication

**Response Example:**
```json
{
  "profile": {
    "id": "rafael-silva-b7567876",
    "name": "Rafael Silva",
    "headline": "Senior Software Developer",
    "location": "Oxnard, CA",
    "vanityName": "rafaelsilva",
    "profilePicture": "/api/placeholder/avatar/150"
  },
  "experiences": [...],
  "education": [...],
  "skills": [...]
}
```

**Notes:**
- Falls back to mock data if LinkedIn API fails
- Uses environment variables for demo profile data
- Supports both real LinkedIn API calls and mock responses

### GET /api/screenshot?url={company_url}
Generates or fetches website screenshots for company homepages.

**Query Parameters:**
- `url` (required): Company website URL to screenshot

**Response:**
```json
{
  "url": "https://example.com",
  "screenshot": "/api/placeholder/screenshot/example.com",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

**Notes:**
- Returns placeholder images in development
- Maps common domains to mock screenshot paths
- Falls back to placeholder generation

### GET /api/placeholder/[...params]
Generates dynamic placeholder images with SVG.

**URL Structure:** `/api/placeholder/{type}/{identifier}/{size?}`

**Parameters:**
- `type`: Image type (`avatar`, `company-logo`, `screenshot`)
- `identifier`: Text or name to display
- `size` (optional): Width in pixels (default: 400)

**Types:**
- **avatar**: Profile pictures with initials (blue background)
- **company-logo**: Company logos with names (dark background)
- **screenshot**: Website screenshots with domain names (light background)

**Response:** SVG image with appropriate caching headers

**Examples:**
- `/api/placeholder/avatar/rafael/150` - Avatar with "R" initial, 150px
- `/api/placeholder/company-logo/tech-corp` - Company logo placeholder
- `/api/placeholder/screenshot/example.com` - Website screenshot placeholder

### GET /api
Basic API health check endpoint.

**Response:**
```json
{
  "msg": "Hello World!"
}
```

**Notes:**
- Simple endpoint for testing API functionality
- Returns basic JSON response

## Color Scheme

The application uses a professional color palette:

### Primary Colors
- **Blue**: #0369a1 (Primary actions, links, highlights)
- **Dark Grey**: #374151 (Headers, navigation, secondary elements)

### CSS Variables
```css
:root {
  --primary-color: #0369a1;
  --secondary-color: #374151;
  --background: #ffffff;
  --foreground: #171717;
}
```

### Theme Customization
Future theme support is available through data attributes:
- `[data-theme="custom"]`: Custom color schemes
- `[data-theme="dark"]`: Dark mode support

## Components Documentation

### Header Component
- Displays profile name and headline
- Responsive navigation menu
- Profile picture integration
- Sticky positioning

### Hero Section
- Large profile introduction
- Call-to-action buttons
- Profile picture display
- Responsive layout

### Experience Cards
- Company information display
- Website screenshot integration
- Job details and duration
- Hover animations

### Skills Display
- Categorized skill listing
- Endorsement counts
- Progress bars for skill levels
- Badge-based overview

## Deployment

### Environment Variables
Ensure all environment variables are set in production:
- LinkedIn API credentials
- Application URLs
- Portfolio contact information

### Build Process
```bash
npm run build
npm start
```

### Considerations
- LinkedIn API rate limits
- Screenshot service integration
- Image optimization
- CDN configuration for assets

## Future Enhancements

### Planned Features
1. **Theme Switcher**
   - Light/dark mode toggle
   - Custom color scheme picker
   - User preference persistence

2. **Enhanced LinkedIn Integration**
   - Real-time data synchronization
   - LinkedIn OAuth authentication
   - Additional profile sections

3. **Content Management**
   - Admin panel for content updates
   - Blog integration
   - Project showcase section

4. **Performance Optimizations**
   - Image lazy loading
   - API response caching
   - Static generation for public pages

### Technical Improvements
- TypeScript strict mode
- Unit test coverage
- E2E testing setup
- CI/CD pipeline
- Docker containerization

## Testing

### LinkedIn API Testing
Visit `/test-linkedin` for step-by-step API testing:

1. **Access Token Test**: Automatically retrieves and displays access token status
2. **Profile API Test**: Tests profile data retrieval with current token  
3. **Response Inspection**: Shows full JSON responses for debugging

**Features:**
- Real-time token status indicators
- Demo vs. real token differentiation  
- API error handling and display
- JSON response formatting

### Manual Testing Steps
1. Configure `.env.local` with your LinkedIn credentials
2. Run `npm run dev` to start development server
3. Visit `http://localhost:8080` to see automatic profile loading
4. Visit `http://localhost:8080/test-linkedin` for detailed API testing
5. Check browser console for any error messages

## Troubleshooting

### Common Issues

1. **LinkedIn API Not Working**
   - Verify `LINKEDIN_ACCESS_TOKEN` is set in `.env.local`
   - Check token permissions include `profile` and `email` scopes
   - Test with `/test-linkedin` page for detailed debugging
   - Application falls back to demo data automatically

2. **Demo Mode Always Showing**
   - Check `.env.local` file exists in project root
   - Verify `LINKEDIN_ACCESS_TOKEN` variable name is correct
   - Ensure token value doesn't equal default placeholder
   - Restart development server after environment changes

3. **Styling Issues**
   - Ensure Bootstrap CSS is loaded in layout
   - Check Tailwind configuration and CSS imports
   - Verify custom CSS variables are defined

4. **Build Errors**
   - Run `npm install` to update dependencies
   - Check TypeScript errors with `npm run build`
   - Verify all imports are correct and files exist

5. **API Route Errors**
   - Check Next.js API routes are in correct folder structure
   - Verify route file naming follows Next.js conventions
   - Check browser network tab for actual HTTP errors

### Development Tips
- Use demo mode for initial development and testing
- Test responsive design on multiple device sizes
- Use browser developer tools to inspect API responses
- Monitor LinkedIn API usage to stay within rate limits
- Keep dependencies updated regularly

### Environment Variables Checklist
Required variables in `.env.local`:
```env
LINKEDIN_ACCESS_TOKEN=your_real_token_here
PORTFOLIO_NAME="Your Name"
PORTFOLIO_TITLE="Your Job Title"
```

Optional variables:
```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:8080
PORTFOLIO_EMAIL=your.email@example.com
```

## Support

For questions or issues:
1. Check this documentation
2. Review the LinkedIn API documentation
3. Check component prop types for usage
4. Test with mock data first

## License

This project is intended for portfolio use. Ensure LinkedIn API usage complies with their terms of service.