'use client';

import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

interface ProfileData {
  profile: {
    name: string;
    headline: string;
    profilePicture?: string;
  };
}

export default function Header() {
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
    <Navbar expand="lg" className="theme-dark-grey shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          {profileData?.profile.profilePicture && (
            <img 
              src={profileData.profile.profilePicture} 
              alt="Profile" 
              className="rounded-circle me-3"
              width={40}
              height={40}
            />
          )}
          <div>
            <div className="fw-bold text-white">
              {loading ? 'Loading...' : profileData?.profile.name || 'Portfolio'}
            </div>
            <small className="text-light opacity-75">
              {profileData?.profile.headline || 'Developer Portfolio'}
            </small>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/experience" className="text-white">
              Experience
            </Nav.Link>
            <Nav.Link as={Link} href="/education" className="text-white">
              Education
            </Nav.Link>
            <Nav.Link as={Link} href="/skills" className="text-white">
              Skills
            </Nav.Link>
            <Nav.Link as={Link} href="/contact" className="text-white">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}