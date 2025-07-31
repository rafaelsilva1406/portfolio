'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

interface ProfileData {
  profile: {
    name: string;
    headline: string;
    location: string;
    profilePicture?: string;
  };
}

export default function ContactPage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Get In Touch</h1>
            <p className="lead text-muted">
              I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="py-4">
                  <div className="text-primary mb-3">
                    <i className="bi bi-envelope-fill" style={{ fontSize: '2rem' }}></i>
                    <span style={{ fontSize: '2rem' }}>📧</span>
                  </div>
                  <h5>Email</h5>
                  <p className="text-muted mb-0">
                    {process.env.NEXT_PUBLIC_PORTFOLIO_EMAIL || 'your.email@example.com'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="py-4">
                  <div className="text-primary mb-3">
                    <span style={{ fontSize: '2rem' }}>📍</span>
                  </div>
                  <h5>Location</h5>
                  <p className="text-muted mb-0">
                    {loading ? 'Loading...' : profileData?.profile.location || 'San Francisco, CA'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="py-4">
                  <div className="text-primary mb-3">
                    <span style={{ fontSize: '2rem' }}>💼</span>
                  </div>
                  <h5>LinkedIn</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h4 className="mb-4">Send Message</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Subject *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Your message here..."
                  />
                </Form.Group>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    className="btn-primary-custom px-5"
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}