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
PORTFOLIO_NAME="Your Name"
PORTFOLIO_TITLE="Software Developer"
PORTFOLIO_EMAIL="your.email@example.com"
```

## LinkedIn API Setup

### Requirements
1. LinkedIn Developer Account
2. LinkedIn App Registration
3. API Partner Approval (for full profile access)

### Authentication Flow
- **3-legged OAuth**: For member-specific data access
- **2-legged OAuth**: For application-specific data access

### Available Endpoints
- Profile API: Basic profile information
- Experience API: Professional experience (requires special permissions)
- Education API: Educational background (requires special permissions)
- Skills API: Skills and endorsements (requires special permissions)

### Limitations
- LinkedIn API access is restricted to approved partners
- Most profile data APIs require special permissions
- Mock data is provided as fallback for development

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

### GET /api/linkedin/profile
Returns complete LinkedIn profile data including:
- Profile information (name, headline, location, picture)
- Professional experiences
- Educational background  
- Skills and endorsements

**Response Example:**
```json
{
  "profile": {
    "id": "user-id",
    "name": "John Doe",
    "headline": "Software Developer",
    "location": "San Francisco, CA",
    "vanityName": "johndoe",
    "profilePicture": "/api/placeholder/avatar/150"
  },
  "experiences": [...],
  "education": [...],
  "skills": [...]
}
```

### GET /api/screenshot?url={company_url}
Generates or fetches website screenshots for company homepages.
Returns placeholder images in development.

### GET /api/placeholder/{type}/{identifier}/{size?}
Generates dynamic placeholder images:
- **avatar**: Profile pictures with initials
- **company-logo**: Company logos with names
- **screenshot**: Website screenshots with domain names

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

## Troubleshooting

### Common Issues

1. **LinkedIn API Not Working**
   - Check API credentials in `.env.local`
   - Verify LinkedIn app permissions
   - Review API rate limits
   - Fallback to mock data for development

2. **Styling Issues**
   - Ensure Bootstrap CSS is loaded
   - Check Tailwind configuration
   - Verify custom CSS variables

3. **Build Errors**
   - Run `npm install` to update dependencies
   - Check TypeScript errors
   - Verify all imports are correct

### Development Tips
- Use mock data for initial development
- Test responsive design on multiple devices
- Monitor API usage and rate limits
- Keep dependencies updated

## Support

For questions or issues:
1. Check this documentation
2. Review the LinkedIn API documentation
3. Check component prop types for usage
4. Test with mock data first

## License

This project is intended for portfolio use. Ensure LinkedIn API usage complies with their terms of service.