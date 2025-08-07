'use client';

import { useState, useEffect } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';

export default function TestLinkedIn() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Auto-get token on page load
    getToken();
  }, []);

  const getToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/linkedin/auth');
      const tokenData = await response.json();
      setAccessToken(tokenData.access_token);
      setError(null);
    } catch (err) {
      setError(`Token Error: ${err}`);
    }
    setLoading(false);
  };

  const testProfileAPI = async () => {
    if (!accessToken) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/linkedin/profile?token=${encodeURIComponent(accessToken)}`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(`API Error: ${data.error || response.statusText}`);
      } else {
        setProfileData(data);
      }
    } catch (err) {
      setError(`Network Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h1>LinkedIn OAuth Test</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <h5>Step 1: Access Token Status</h5>
          {!accessToken ? (
            <div>
              <p>Loading access token...</p>
              <Button 
                variant="primary" 
                onClick={getToken}
                disabled={loading}
                className="me-2"
              >
                {loading ? 'Getting Token...' : 'Retry Get Token'}
              </Button>
            </div>
          ) : (
            <Alert variant={accessToken.startsWith('demo_token_') ? 'warning' : 'success'}>
              {accessToken.startsWith('demo_token_') ? '⚠️' : '✅'} 
              Access Token: {accessToken.substring(0, 20)}...
              {accessToken.startsWith('demo_token_') && (
                <div className="mt-2">
                  <small>Demo token - Set LINKEDIN_ACCESS_TOKEN in .env.local for real data</small>
                </div>
              )}
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>Step 2: Test Profile API</h5>
          <Button 
            variant="secondary" 
            onClick={testProfileAPI}
            disabled={!accessToken || loading}
          >
            {loading ? 'Loading...' : 'Test Profile API'}
          </Button>
          
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>

      {profileData && (
        <Card>
          <Card.Body>
            <h5>Profile Data:</h5>
            <pre>{JSON.stringify(profileData, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}