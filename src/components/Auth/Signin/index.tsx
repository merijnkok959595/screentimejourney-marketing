'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Footer from '@/components/Common/Footer';
// Amplify is now configured at top level - no need for complex initialization

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Amplify is now configured at app level - just verify it's ready
  useEffect(() => {
    console.log('🔧 Signin: Component mounted - Amplify configured at app level');
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    // Amplify is configured at app level, ready to use

    try {
      setLoading(true);
      console.log('🔐 Attempting sign in with:', email);
      
      const result = await Auth.signIn(email, password);
      console.log('✅ Sign in successful:', result);
      
      toast.success('Signed in successfully! Redirecting to checkout...');
      
      // Redirect to product page with checkout parameter
      setTimeout(() => {
        router.push('/product/screentimejourney?checkout=true');
      }, 1000);
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'Sign in failed';
      
      // Handle specific Cognito errors
      if (error.code) {
        switch (error.code) {
          case 'UserNotConfirmedException':
            errorMessage = 'Please check your email and confirm your account';
            break;
          case 'NotAuthorizedException':
            errorMessage = 'Incorrect email or password';
            break;
          case 'UserNotFoundException':
            errorMessage = 'User not found. Please sign up first';
            break;
          case 'TooManyRequestsException':
            errorMessage = 'Too many attempts. Please try again later';
            break;
          default:
            errorMessage = error.message || 'Sign in failed';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Use environment variables for OAuth (configured at app level)
      const cognitoDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN || 'eu-north-11ksvbpqxn.auth.eu-north-1.amazoncognito.com';
      const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '5j2nk1vlfok15ss7mh242bpd1h';
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
      
      console.log('🔍 Google OAuth Config:', { cognitoDomain, clientId, redirectUri, origin: window.location.origin });
      
      const oauthUrl = `https://${cognitoDomain}/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=CODE&client_id=${clientId}&scope=email+openid+profile`;
      console.log('🚀 Redirecting to Google OAuth:', oauthUrl);
      window.location.href = oauthUrl;
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Google sign in failed');
    }
  };

  return (
    <>
    <section className="overflow-hidden py-20" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
          <div className="text-center mb-11">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: '400',
              color: 'var(--brand-text)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Sign In to Your Account
            </h2>
          </div>

          <div>
            <form onSubmit={handleSignIn}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label 
                  htmlFor="email" 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '500',
                    color: 'var(--brand-text)',
                    marginBottom: '0.5rem',
                    fontSize: '14px'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--brand-text)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label 
                  htmlFor="password" 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '500',
                    color: 'var(--brand-text)',
                    marginBottom: '0.5rem',
                    fontSize: '14px'
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--brand-text)',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-7.5 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in and continue to checkout'}
              </button>

              <a
                href="#"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  color: '#6b7280',
                  marginTop: '1.125rem',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = 'var(--brand-text)'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#6b7280'}
              >
                Forgot your password?
              </a>

              <span style={{
                position: 'relative',
                zIndex: '1',
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                textAlign: 'center',
                marginTop: '1.125rem'
              }}>
                <span style={{
                  display: 'block',
                  position: 'absolute',
                  zIndex: '-1',
                  left: '0',
                  top: '50%',
                  height: '1px',
                  width: '100%',
                  backgroundColor: '#e5e7eb'
                }}></span>
                <span style={{
                  display: 'inline-block',
                  padding: '0 0.75rem',
                  backgroundColor: 'white',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--brand-text)'
                }}>Or</span>
              </span>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2 mt-4.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_98_7461)">
                    <mask
                      id="mask0_98_7461"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <path d="M20 0H0V20H20V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_98_7461)">
                      <path
                        d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L4.2789 11.9877L1.12906 14.3766L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L4.38115 7.88959L1.1927 5.46234L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_98_7461">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--brand-text)'
                }}>
                  Sign In with Google
                </span>
              </button>

              <p style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                fontFamily: 'var(--font-body)',
                color: '#6b7280',
                fontSize: '14px'
              }}>
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  style={{
                    color: 'var(--brand-primary)',
                    textDecoration: 'underline',
                    fontWeight: '500',
                    marginLeft: '0.5rem',
                    transition: 'color 0.2s ease, opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.opacity = '1';
                  }}
                >
                  Sign Up Now!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Signin;