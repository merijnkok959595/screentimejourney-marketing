'use client';

import { Amplify } from 'aws-amplify';

// Hardcoded configuration that will definitely work
const COGNITO_CLIENT_CONFIG = {
  region: 'eu-north-1',
  userPoolId: 'eu-north-1_1kSVbpQXN',
  userPoolClientId: '5j2nk1vlfok15ss7mh242bpd1h',
  oauthDomain: 'eu-north-11ksvbpqxn.auth.eu-north-1.amazoncognito.com',
  redirectSignIn: 'https://screentimejourney.com/auth/callback',
  redirectSignOut: 'https://screentimejourney.com',
  googleClientId: '590214170166-q0ccfs0npfkafonusgtn75n2r2ge16b0.apps.googleusercontent.com'
};

let amplifyConfigured = false;

export const initializeAmplify = () => {
  if (amplifyConfigured) {
    console.log('✅ Amplify already configured');
    return true;
  }

  try {
    console.log('🔧 Configuring Amplify with hardcoded values...');
    
    Amplify.configure({
      Auth: {
        Cognito: {
          region: COGNITO_CLIENT_CONFIG.region,
          userPoolId: COGNITO_CLIENT_CONFIG.userPoolId,
          userPoolClientId: COGNITO_CLIENT_CONFIG.userPoolClientId,
          loginWith: {
            oauth: {
              domain: COGNITO_CLIENT_CONFIG.oauthDomain,
              scopes: ['email', 'openid', 'profile'],
              redirectSignIn: [
                COGNITO_CLIENT_CONFIG.redirectSignIn,
                'http://localhost:3333/auth/callback',
                typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'https://screentimejourney.com/auth/callback'
              ],
              redirectSignOut: [
                COGNITO_CLIENT_CONFIG.redirectSignOut,
                'http://localhost:3333',
                typeof window !== 'undefined' ? window.location.origin : 'https://screentimejourney.com'
              ],
              responseType: 'code',
              providers: ['Google']
            }
          }
        }
      }
    });

    amplifyConfigured = true;
    console.log('✅ Amplify configured successfully with client config');
    return true;
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
    return false;
  }
};

// Auto-configure when this module is loaded
if (typeof window !== 'undefined') {
  initializeAmplify();
}

export { COGNITO_CLIENT_CONFIG };