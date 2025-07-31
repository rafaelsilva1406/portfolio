'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Hero from '@/components/ui/Hero';
import ExperienceCard from '@/components/ui/ExperienceCard';

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
  experiences: Experience[];
}

export default function Home() {
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkedInData = async () => {
      try {
        const response = await fetch('/api/linkedin/profile');
        if (response.ok) {
          const data = await response.json();
          setLinkedInData(data);
        }
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedInData();
  }, []);

  return (
    <>
      <Hero />
      
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
