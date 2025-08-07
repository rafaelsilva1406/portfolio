interface LinkedInProfile {
  id: string;
  firstName: {
    localized: { en_US: string };
    preferredLocale: { country: string; language: string };
  };
  lastName: {
    localized: { en_US: string };
    preferredLocale: { country: string; language: string };
  };
  headline?: {
    localized: { en_US: string };
  };
  profilePicture?: {
    displayImage: string;
  };
  location?: {
    name: string;
  };
  vanityName?: string;
}

interface LinkedInExperience {
  id: string;
  company: {
    name: string;
    logo?: string;
    website?: string;
  };
  title: string;
  description?: string;
  startDate: {
    year: number;
    month?: number;
  };
  endDate?: {
    year: number;
    month?: number;
  };
  location?: {
    name: string;
  };
}

interface LinkedInEducation {
  id: string;
  schoolName: string;
  fieldOfStudy?: string;
  degreeName?: string;
  startDate?: {
    year: number;
  };
  endDate?: {
    year: number;
  };
}

interface LinkedInSkill {
  id: string;
  name: string;
  endorsementCount?: number;
}

export class LinkedInAPI {
  private accessToken: string;
  private baseURL = 'https://api.linkedin.com/v2';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string): Promise<unknown> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile(): Promise<LinkedInProfile> {
    try {
      const profile = await this.makeRequest('/me');
      return profile as LinkedInProfile;
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      throw error;
    }
  }

  async getProfilePicture(): Promise<string | null> {
    try {
      const response = await this.makeRequest('/me?projection=(id,profilePicture(displayImage~:playableStreams))') as { profilePicture?: { displayImage?: { elements?: Array<{ data: { width: number }, identifiers: Array<{ identifier: string }> }> } } };
      
      if (response.profilePicture?.displayImage?.elements && response.profilePicture.displayImage.elements.length > 0) {
        // Return the largest available image
        const images = response.profilePicture.displayImage.elements;
        const largestImage = images.reduce((prev, current) => 
          (current.data.width > prev.data.width) ? current : prev
        );
        return largestImage.identifiers[0].identifier;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return null;
    }
  }

  // Note: Experience and Education APIs require specific permissions
  // and may not be available for all applications
  async getExperiences(): Promise<LinkedInExperience[]> {
    try {
      // This would require special permissions from LinkedIn
      // For demo purposes, return mock data
      return this.getMockExperiences();
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return this.getMockExperiences();
    }
  }

  async getEducation(): Promise<LinkedInEducation[]> {
    try {
      // This would require special permissions from LinkedIn
      // For demo purposes, return mock data
      return this.getMockEducation();
    } catch (error) {
      console.error('Error fetching education:', error);
      return this.getMockEducation();
    }
  }

  async getSkills(): Promise<LinkedInSkill[]> {
    try {
      // This would require special permissions from LinkedIn
      // For demo purposes, return mock data
      return this.getMockSkills();
    } catch (error) {
      console.error('Error fetching skills:', error);
      return this.getMockSkills();
    }
  }

  // Mock data for demonstration purposes
  private getMockExperiences(): LinkedInExperience[] {
    return [
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
    ];
  }

  private getMockEducation(): LinkedInEducation[] {
    return [
      {
        id: '1',
        schoolName: 'University of Technology',
        fieldOfStudy: 'Computer Science',
        degreeName: 'Bachelor of Science',
        startDate: { year: 2016 },
        endDate: { year: 2020 }
      }
    ];
  }

  private getMockSkills(): LinkedInSkill[] {
    return [
      { id: '1', name: 'JavaScript', endorsementCount: 25 },
      { id: '2', name: 'React', endorsementCount: 20 },
      { id: '3', name: 'Node.js', endorsementCount: 18 },
      { id: '4', name: 'TypeScript', endorsementCount: 15 },
      { id: '5', name: 'Python', endorsementCount: 12 },
      { id: '6', name: 'AWS', endorsementCount: 10 }
    ];
  }
}

// Utility function to initialize LinkedIn API
export function createLinkedInAPI(accessToken?: string | null): LinkedInAPI | null {
  const token = accessToken || process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!token || token === 'your_linkedin_access_token_here') {
    console.warn('LinkedIn access token not provided. Using mock data.');
    // Return API instance with mock token to enable mock data fallback
    return new LinkedInAPI('mock_token');
  }
  
  return new LinkedInAPI(token);
}

// Profile data formatter
export function formatLinkedInProfile(profile: LinkedInProfile) {
  return {
    id: profile.id,
    name: `${profile.firstName?.localized?.en_US || ''} ${profile.lastName?.localized?.en_US || ''}`.trim(),
    headline: profile.headline?.localized?.en_US || '',
    location: profile.location?.name || '',
    vanityName: profile.vanityName || ''
  };
}