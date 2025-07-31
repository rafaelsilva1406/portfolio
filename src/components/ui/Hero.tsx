'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface ProfileData {
  profile: {
    name: string;
    headline: string;
    location: string;
    profilePicture?: string;
  };
}

export default function Hero() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/linkedin/profile');
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="theme-blue py-5">
      <Container>
        <Row className="align-items-center min-vh-50">
          <Col lg={8}>
            <div className="text-white">
              {loading ? (
                <div>
                  <div className="placeholder-glow">
                    <span className="placeholder col-6 mb-2"></span>
                  </div>
                  <div className="placeholder-glow">
                    <span className="placeholder col-8 mb-3"></span>
                  </div>
                  <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="display-4 fw-bold mb-3">
                    Hello, I&apos;m {profileData?.profile.name || 'John Doe'}
                  </h1>
                  <p className="lead mb-3 fs-3">
                    {profileData?.profile.headline || 'Software Developer'}
                  </p>
                  <p className="mb-4 fs-5 opacity-90">
                    📍 {profileData?.profile.location || 'San Francisco, CA'}
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Button 
                      variant="light" 
                      size="lg" 
                      href="/experience"
                      className="px-4"
                    >
                      View My Work
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      href="/contact"
                      className="px-4"
                    >
                      Get In Touch
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col lg={4} className="text-center">
            {profileData?.profile.profilePicture && (
              <img 
                src={profileData.profile.profilePicture} 
                alt="Profile" 
                className="rounded-circle img-fluid shadow-lg"
                style={{ maxWidth: '300px', width: '100%' }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}