'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

interface Education {
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

interface LinkedInData {
  education: Education[];
}

export default function EducationPage() {
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

  const getDuration = (education: Education) => {
    if (education.startDate && education.endDate) {
      return `${education.startDate.year} - ${education.endDate.year}`;
    } else if (education.startDate) {
      return `${education.startDate.year} - Present`;
    }
    return '';
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Education</h1>
            <p className="lead text-muted">
              My academic background and qualifications
            </p>
          </div>
        </Col>
      </Row>

      {loading ? (
        <Row>
          {[1, 2].map((i) => (
            <Col md={6} key={i} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <div className="placeholder-glow">
                    <span className="placeholder col-8 mb-2"></span>
                    <span className="placeholder col-6 mb-3"></span>
                    <span className="placeholder col-4 mb-2"></span>
                    <span className="placeholder col-7"></span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {linkedInData?.education.map((edu) => (
            <Col md={6} key={edu.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                      <span className="text-white fw-bold fs-4">🎓</span>
                    </div>
                    <div className="flex-grow-1">
                      <Card.Title className="mb-1 h5">{edu.schoolName}</Card.Title>
                      {edu.degreeName && (
                        <Card.Subtitle className="text-muted mb-2">
                          {edu.degreeName}
                        </Card.Subtitle>
                      )}
                    </div>
                  </div>

                  {edu.fieldOfStudy && (
                    <div className="mb-3">
                      <Badge bg="secondary" className="mb-2">
                        📚 {edu.fieldOfStudy}
                      </Badge>
                    </div>
                  )}

                  {getDuration(edu) && (
                    <div className="mb-2">
                      <Badge bg="primary">
                        📅 {getDuration(edu)}
                      </Badge>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && (!linkedInData?.education || linkedInData.education.length === 0) && (
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <h3 className="text-muted">No education data available</h3>
              <p className="text-muted">Please configure your LinkedIn API credentials to fetch education data.</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}