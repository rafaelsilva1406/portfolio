'use client';

import { useState, useEffect } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

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

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScreenshot = async () => {
      if (experience.company.website) {
        setLoading(true);
        try {
          const response = await fetch(`/api/screenshot?url=${encodeURIComponent(experience.company.website)}`);
          if (response.ok) {
            const data = await response.json();
            setScreenshot(data.screenshot);
          }
        } catch (error) {
          console.error('Error fetching screenshot:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchScreenshot();
  }, [experience.company.website]);

  const formatDate = (date: { year: number; month?: number }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (date.month) {
      return `${monthNames[date.month - 1]} ${date.year}`;
    }
    return date.year.toString();
  };

  const getDuration = () => {
    const start = formatDate(experience.startDate);
    const end = experience.endDate ? formatDate(experience.endDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <Card className="h-100 shadow-sm border-0 hover-shadow-lg transition-all">
      {(screenshot || loading) && (
        <div style={{ height: '200px', overflow: 'hidden' }}>
          {loading ? (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <img 
              src={screenshot || '/api/placeholder/screenshot/default'} 
              alt={`${experience.company.name} website`}
              className="card-img-top"
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover',
                objectPosition: 'top'
              }}
            />
          )}
        </div>
      )}
      
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          {experience.company.logo && (
            <img 
              src={experience.company.logo} 
              alt={`${experience.company.name} logo`}
              className="rounded me-3"
              width={50}
              height={50}
            />
          )}
          <div>
            <Card.Title className="mb-1 h5">{experience.title}</Card.Title>
            <Card.Subtitle className="text-muted">
              {experience.company.name}
            </Card.Subtitle>
          </div>
        </div>

        <div className="mb-3">
          <Badge bg="primary" className="me-2 mb-2">{getDuration()}</Badge>
          {experience.location && (
            <Badge bg="secondary" className="mb-2">
              📍 {experience.location.name}
            </Badge>
          )}
        </div>

        {experience.description && (
          <Card.Text className="flex-grow-1 mb-3">
            {experience.description}
          </Card.Text>
        )}

        <div className="mt-auto">
          {experience.company.website && (
            <Button 
              variant="outline-primary" 
              size="sm"
              href={experience.company.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Company 🔗
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}