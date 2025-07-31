'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

export default function ExperiencePage() {
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
    <Container className="py-5">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Professional Experience</h1>
            <p className="lead text-muted">
              A comprehensive overview of my professional journey and accomplishments
            </p>
          </div>
        </Col>
      </Row>

      {loading ? (
        <Row>
          {[1, 2, 3].map((i) => (
            <Col lg={4} md={6} key={i} className="mb-4">
              <div className="card h-100">
                <div className="placeholder-glow">
                  <div className="placeholder" style={{ height: '200px' }}></div>
                </div>
                <div className="card-body">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6 mb-2"></span>
                    <span className="placeholder col-4 mb-3"></span>
                    <span className="placeholder col-8 mb-2"></span>
                    <span className="placeholder col-6 mb-2"></span>
                    <span className="placeholder col-7"></span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {linkedInData?.experiences.map((experience) => (
            <Col lg={4} md={6} key={experience.id} className="mb-4">
              <ExperienceCard experience={experience} />
            </Col>
          ))}
        </Row>
      )}

      {!loading && (!linkedInData?.experiences || linkedInData.experiences.length === 0) && (
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <h3 className="text-muted">No experience data available</h3>
              <p className="text-muted">Please configure your LinkedIn API credentials to fetch experience data.</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}