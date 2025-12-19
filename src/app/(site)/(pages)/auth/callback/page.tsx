'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Auth } from 'aws-amplify';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams?.get('code');
        const state = searchParams?.get('state');
        
        console.log('Auth callback received:', { code, state });
        
        if (code) {
          setStatus('Completing sign-in...');
          
          // Handle the OAuth callback
          const user = await Auth.currentAuthenticatedUser();
          console.log('Authenticated user:', user);
          
          setStatus('Sign-in successful! Redirecting...');
          
          // Redirect to checkout
          setTimeout(() => {
            router.push('/product/screentimejourney?checkout=true');
          }, 1000);
          
        } else {
          console.error('No authorization code received');
          setStatus('Authentication failed - no code received');
          setTimeout(() => {
            router.push('/signin');
          }, 2000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('Authentication failed. Redirecting to sign-in...');
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          🔐
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: 'var(--brand-text)'
        }}>
          Completing Authentication
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--brand-text)'
        }}>
          {status}
        </p>
      </div>
    </div>
  );
}