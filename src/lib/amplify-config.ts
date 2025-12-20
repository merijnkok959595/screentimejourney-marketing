'use client';

import { Amplify } from 'aws-amplify';

// ULTRA-BULLETPROOF: Hardcoded values that WILL work
const HARDCODED_CONFIG = {
  region: 'eu-north-1',
  userPoolId: 'eu-north-1_1kSVbpQXN',
  userPoolClientId: '5j2nk1vlfok15ss7mh242bpd1h',
  oauthDomain: 'eu-north-11ksvbpqxn.auth.eu-north-1.amazoncognito.com',
  googleClientId: '590214170166-q0ccfs0npfkafonusgtn75n2r2ge16b0.apps.googleusercontent.com'
};

let amplifyConfigured = false;

export const configureAmplifyNow = () => {
  if (amplifyConfigured) {
    console.log('✅ Amplify already configured');
    return true;
  }

  // Check what env vars are actually available
  console.log('🔧 ENV VARS DEBUG:', {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    pool: process.env.NEXT_PUBLIC_USER_POOL_ID,
    client: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    oauth: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
    isClient: typeof window !== 'undefined'
  });

  // Use hardcoded values to ensure it works
  const config = {
    region: process.env.NEXT_PUBLIC_AWS_REGION || HARDCODED_CONFIG.region,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || HARDCODED_CONFIG.userPoolId,
    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || HARDCODED_CONFIG.userPoolClientId,
    oauthDomain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN || HARDCODED_CONFIG.oauthDomain
  };

  console.log('🚀 USING CONFIG:', config);

  try {
    Amplify.configure({
      Auth: {
        Cognito: {
          region: config.region,
          userPoolId: config.userPoolId,
          userPoolClientId: config.userPoolClientId,
          loginWith: {
            oauth: {
              domain: config.oauthDomain,
              scopes: ['email', 'openid', 'profile'],
              redirectSignIn: [
                typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'https://screentimejourney.com/auth/callback',
                'http://localhost:3333/auth/callback',
                'https://screentimejourney.com/auth/callback'
              ],
              redirectSignOut: [
                typeof window !== 'undefined' ? window.location.origin : 'https://screentimejourney.com',
                'http://localhost:3333',
                'https://screentimejourney.com'
              ],
              responseType: 'code',
              providers: ['Google']
            }
          }
        }
      }
    });

    amplifyConfigured = true;
    console.log('🎉 AMPLIFY CONFIGURED SUCCESSFULLY WITH ULTRA-BULLETPROOF METHOD!');
    return true;
  } catch (error) {
    console.error('❌ FAILED TO CONFIGURE AMPLIFY:', error);
    return false;
  }
};

// Configure immediately when this module loads (client-side only)
if (typeof window !== 'undefined') {
  console.log('🔄 AUTO-CONFIGURING AMPLIFY ON MODULE LOAD...');
  configureAmplifyNow();
}

export { HARDCODED_CONFIG };