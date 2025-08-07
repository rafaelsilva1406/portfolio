import { NextRequest, NextResponse } from 'next/server';
import { createLinkedInAPI, formatLinkedInProfile } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get('token');
  try {
    const linkedInAPI = createLinkedInAPI(accessToken);
    
    if (!linkedInAPI) {
      return NextResponse.json(
        { error: 'LinkedIn API not configured. Access token required.' },
        { status: 400 }
      );
    }

    const profile = await linkedInAPI.getProfile();
    const profilePicture = await linkedInAPI.getProfilePicture();
    const experiences = await linkedInAPI.getExperiences();
    const education = await linkedInAPI.getEducation();
    const skills = await linkedInAPI.getSkills();

    const formattedProfile = formatLinkedInProfile(profile);

    return NextResponse.json({
      profile: {
        ...formattedProfile,
        profilePicture
      },
      experiences,
      education,
      skills
    });

  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    
    // Return mock data if API fails
    return NextResponse.json({
      profile: {
        id: 'mock-id',
        name: process.env.PORTFOLIO_NAME || 'John Doe',
        headline: process.env.PORTFOLIO_TITLE || 'Software Developer',
        location: 'Oxnard, CA',
        vanityName: 'rafaelsilva',
        profilePicture: '/api/placeholder/avatar/150'
      },
      experiences: [
        {
          id: '1',
          company: {
            name: 'Tech Corp',
            logo: '/api/placeholder/company-logo/tech-corp',
            website: 'https://techcorp.com'
          },
          title: 'Senior Software Developer',
          description: 'Led development of scalable web applications using React, Node.js, and cloud technologies. Managed a team of 5 developers and implemented CI/CD pipelines.',
          startDate: { year: 2022, month: 3 },
          location: { name: 'San Francisco, CA' }
        },
        {
          id: '2',
          company: {
            name: 'StartupCo',
            logo: '/api/placeholder/company-logo/startupco',
            website: 'https://startupco.com'
          },
          title: 'Full Stack Developer',
          description: 'Developed and maintained full-stack applications using JavaScript, Python, and PostgreSQL. Collaborated with product team to deliver features.',
          startDate: { year: 2020, month: 1 },
          endDate: { year: 2022, month: 2 },
          location: { name: 'New York, NY' }
        }
      ],
      education: [
        {
          id: '1',
          schoolName: 'University of Technology',
          fieldOfStudy: 'Computer Science',
          degreeName: 'Bachelor of Science',
          startDate: { year: 2016 },
          endDate: { year: 2020 }
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', endorsementCount: 25 },
        { id: '2', name: 'React', endorsementCount: 20 },
        { id: '3', name: 'Node.js', endorsementCount: 18 },
        { id: '4', name: 'TypeScript', endorsementCount: 15 },
        { id: '5', name: 'Python', endorsementCount: 12 },
        { id: '6', name: 'AWS', endorsementCount: 10 }
      ]
    });
  }
}