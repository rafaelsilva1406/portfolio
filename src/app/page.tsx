'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Hero from '@/components/ui/Hero';
import ExperienceCard from '@/components/ui/ExperienceCard';
import { useSearchParams } from 'next/navigation';

interface Experience {
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

interface LinkedInData {
  profile: {
    name: string;
    headline: string;
    location: string;
    profilePicture?: string;
  };
  experiences: Experience[];
}

export default function Home() {
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if LinkedIn token is in URL parameters
    const tokenFromUrl = searchParams.get('linkedin_token');
    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
      // Clean URL by removing the token parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('linkedin_token');
      window.history.replaceState({}, '', newUrl.pathname);
    }
  }, [searchParams]);

  const getLinkedInToken = async () => {
    try {
      const response = await fetch('/api/linkedin/auth');
      if (response.ok) {
        const tokenData = await response.json();
        setAccessToken(tokenData.access_token);
        return tokenData.access_token;
      }
    } catch (error) {
      console.error('Error getting LinkedIn token:', error);
    }
    return null;
  };

  useEffect(() => {
    const fetchLinkedInData = async () => {
      try {
        // Always try to get fresh token first
        const currentToken = await getLinkedInToken();
        
        let url = '/api/linkedin/profile';
        if (currentToken && !currentToken.startsWith('demo_token_')) {
          url += `?token=${encodeURIComponent(currentToken)}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setLinkedInData(data);
        } else {
          console.warn('LinkedIn API request failed, using fallback data');
        }
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error);
      } finally {
        setLoading(false);
        setShowAuthPrompt(false); // Hide auth prompt since we always try
      }
    };

    fetchLinkedInData();
  }, []); // Run once on mount

  return (
    <>
      <Hero profileData={linkedInData} loading={loading} />
      
      {accessToken && accessToken.startsWith('demo_token_') && (
        <Container className="py-3">
          <div className="alert alert-info text-center">
            <h5>Demo Mode</h5>
            <p className="mb-3">Configure LINKEDIN_ACCESS_TOKEN in .env.local for live LinkedIn data</p>
          </div>
        </Container>
      )}
      
      <Container className="py-5">
        <section className="mb-5">
          <Row>
            <Col>
              <h2 className="text-center mb-4 display-6">Recent Experience</h2>
              <p className="text-center text-muted mb-5 lead">
                Here&apos;s a glimpse of my professional journey
              </p>
            </Col>
          </Row>
          
          {loading ? (
            <Row>
              {[1, 2].map((i) => (
                <Col md={6} key={i} className="mb-4">
                  <Card className="h-100">
                    <div className="placeholder-glow">
                      <div className="placeholder" style={{ height: '200px' }}></div>
                    </div>
                    <Card.Body>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6 mb-2"></span>
                        <span className="placeholder col-4 mb-3"></span>
                        <span className="placeholder col-8 mb-2"></span>
                        <span className="placeholder col-6 mb-2"></span>
                        <span className="placeholder col-7"></span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              {linkedInData?.experiences.slice(0, 2).map((experience) => (
                <Col md={6} key={experience.id} className="mb-4">
                  <ExperienceCard experience={experience} />
                </Col>
              ))}
            </Row>
          )}
          
          <Row>
            <Col className="text-center">
              <Button 
                variant="primary" 
                size="lg" 
                href="/experience"
                className="btn-primary-custom px-4"
              >
                View All Experience
              </Button>
            </Col>
          </Row>
        </section>

        <section className="py-5 bg-light rounded">
          <Container>
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <h3 className="mb-4">Let&apos;s Work Together</h3>
                <p className="lead mb-4">
                  I&apos;m always interested in hearing about new opportunities and exciting projects.
                  Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you!
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  href="/contact"
                  className="btn-primary-custom px-4"
                >
                  Get In Touch
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  );
}
