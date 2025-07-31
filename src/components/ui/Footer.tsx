'use client';

import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-dark-grey py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <p className="text-light mb-0">
              © {currentYear} Portfolio. Built with Next.js, Bootstrap & Tailwind CSS.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-light mb-0">
              Powered by LinkedIn API Integration
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}