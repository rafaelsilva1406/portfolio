'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';

interface Skill {
  id: string;
  name: string;
  endorsementCount?: number;
}

interface LinkedInData {
  skills: Skill[];
}

export default function SkillsPage() {
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

  const getSkillLevel = (endorsementCount?: number): number => {
    if (!endorsementCount) return 20;
    if (endorsementCount >= 20) return 100;
    if (endorsementCount >= 15) return 85;
    if (endorsementCount >= 10) return 70;
    if (endorsementCount >= 5) return 55;
    return 40;
  };

  const getSkillVariant = (endorsementCount?: number): string => {
    if (!endorsementCount) return 'secondary';
    if (endorsementCount >= 20) return 'success';
    if (endorsementCount >= 15) return 'info';
    if (endorsementCount >= 10) return 'primary';
    if (endorsementCount >= 5) return 'warning';
    return 'secondary';
  };

  // Group skills by category (mock categorization for demo)
  const categorizeSkills = (skills: Skill[]) => {
    const categories = {
      'Programming Languages': skills.filter(s => 
        ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust'].includes(s.name)
      ),
      'Frameworks & Libraries': skills.filter(s => 
        ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Spring'].includes(s.name)
      ),
      'Cloud & DevOps': skills.filter(s => 
        ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD'].includes(s.name)
      ),
      'Databases': skills.filter(s => 
        ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'DynamoDB'].includes(s.name)
      ),
      'Other': skills.filter(s => 
        !['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust',
          'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Spring',
          'AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD',
          'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'DynamoDB'].includes(s.name)
      )
    };

    return Object.entries(categories).filter(([, categorySkills]) => categorySkills.length > 0);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Skills & Expertise</h1>
            <p className="lead text-muted">
              Technical skills and professional competencies with endorsement levels
            </p>
          </div>
        </Col>
      </Row>

      {loading ? (
        <Row>
          {[1, 2, 3, 4].map((i) => (
            <Col md={6} lg={4} key={i} className="mb-3">
              <div className="placeholder-glow">
                <span className="placeholder col-8 mb-2"></span>
                <div className="placeholder" style={{ height: '8px' }}></div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {linkedInData?.skills && categorizeSkills(linkedInData.skills).map(([category, skills]) => (
            <div key={category} className="mb-5">
              <h3 className="mb-4 text-primary">{category}</h3>
              <Row>
                {skills.map((skill) => (
                  <Col md={6} lg={4} key={skill.id} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{skill.name}</h6>
                          {skill.endorsementCount && (
                            <Badge bg={getSkillVariant(skill.endorsementCount)} className="ms-2">
                              {skill.endorsementCount}
                            </Badge>
                          )}
                        </div>
                        <ProgressBar 
                          now={getSkillLevel(skill.endorsementCount)} 
                          variant={getSkillVariant(skill.endorsementCount)}
                          className="mb-2"
                          style={{ height: '8px' }}
                        />
                        <small className="text-muted">
                          {skill.endorsementCount ? `${skill.endorsementCount} endorsements` : 'No endorsements yet'}
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}

          {/* All skills overview */}
          {linkedInData?.skills && linkedInData.skills.length > 0 && (
            <div className="mt-5 pt-5 border-top">
              <h3 className="mb-4 text-center">All Skills Overview</h3>
              <div className="text-center">
                {linkedInData.skills.map((skill) => (
                  <Badge 
                    key={skill.id} 
                    bg={getSkillVariant(skill.endorsementCount)}
                    className="me-2 mb-2 fs-6 px-3 py-2"
                  >
                    {skill.name} {skill.endorsementCount && `(${skill.endorsementCount})`}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!loading && (!linkedInData?.skills || linkedInData.skills.length === 0) && (
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <h3 className="text-muted">No skills data available</h3>
              <p className="text-muted">Please configure your LinkedIn API credentials to fetch skills data.</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}