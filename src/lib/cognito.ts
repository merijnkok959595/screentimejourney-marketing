import { Amplify } from 'aws-amplify';

// Debug environment variables
console.log('🔧 Cognito Environment Check:', {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  oauthDomain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
  isConfigured: Boolean(
    process.env.NEXT_PUBLIC_AWS_REGION && 
    process.env.NEXT_PUBLIC_USER_POOL_ID && 
    process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
  )
});

// Only configure Amplify if we have the required environment variables
if (
  process.env.NEXT_PUBLIC_AWS_REGION && 
  process.env.NEXT_PUBLIC_USER_POOL_ID && 
  process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
) {
  // Configure AWS Amplify for marketing site
  Amplify.configure({
    Auth: {
      Cognito: {
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
        loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN!,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [
            process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGNIN || 'https://screentimejourney.com/auth/callback',
            'http://localhost:3000/auth/callback'
          ],
          redirectSignOut: [
            process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGNOUT || 'https://screentimejourney.com',
            'http://localhost:3000'
          ],
          responseType: 'code',
          providers: ['Google']
        }
        }
      }
    }
  });
  console.log('✅ Amplify configured successfully');
} else {
  console.error('❌ Missing required Cognito environment variables. Please check Vercel environment settings.');
}

export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_AWS_REGION,
  USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID,
  USER_POOL_CLIENT_ID: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  OAUTH_DOMAIN: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
  DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.screentimejourney.com',
  isConfigured: Boolean(
    process.env.NEXT_PUBLIC_AWS_REGION && 
    process.env.NEXT_PUBLIC_USER_POOL_ID && 
    process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
  ),
  // Check individual components for better debugging
  missingVariables: [
    !process.env.NEXT_PUBLIC_AWS_REGION && 'NEXT_PUBLIC_AWS_REGION',
    !process.env.NEXT_PUBLIC_USER_POOL_ID && 'NEXT_PUBLIC_USER_POOL_ID', 
    !process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID && 'NEXT_PUBLIC_USER_POOL_CLIENT_ID',
    !process.env.NEXT_PUBLIC_OAUTH_DOMAIN && 'NEXT_PUBLIC_OAUTH_DOMAIN'
  ].filter(Boolean)
};

// User creation interface
export interface CreateUserData {
  email: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: string;
  source: 'marketing-site';
}

// Generate temporary password for user
export const generateTempPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  
  // Ensure complexity requirements
  password += 'A'; // uppercase
  password += 'a'; // lowercase  
  password += '1'; // number
  password += '@'; // special char
  
  // Add remaining random characters
  for (let i = 4; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};
