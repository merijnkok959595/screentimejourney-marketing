'use client';

import { useEffect, useState } from 'react';
import { COGNITO_CONFIG } from '@/lib/cognito';
import { Auth } from 'aws-amplify';

export default function TestAuthPage() {
  const [status, setStatus] = useState<string>('Checking...');
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    // Test Cognito configuration
    setConfig({
      isConfigured: COGNITO_CONFIG.isConfigured,
      region: COGNITO_CONFIG.REGION,
      userPoolId: COGNITO_CONFIG.USER_POOL_ID,
      clientId: COGNITO_CONFIG.USER_POOL_CLIENT_ID,
      oauthDomain: COGNITO_CONFIG.OAUTH_DOMAIN,
      missingVariables: COGNITO_CONFIG.missingVariables,
    });

    if (COGNITO_CONFIG.isConfigured) {
      setStatus('✅ Cognito Configuration is GOOD');
    } else {
      setStatus(`❌ Missing: ${COGNITO_CONFIG.missingVariables.join(', ')}`);
    }
  }, []);

  const testGoogleLogin = () => {
    if (!COGNITO_CONFIG.isConfigured) {
      alert('Cognito not configured properly!');
      return;
    }
    
    try {
      // Redirect to Google OAuth
      const oauthUrl = `https://${COGNITO_CONFIG.OAUTH_DOMAIN}/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3333/auth/callback&response_type=code&client_id=${COGNITO_CONFIG.USER_POOL_CLIENT_ID}&scope=email+openid+profile`;
      window.location.href = oauthUrl;
    } catch (error) {
      console.error('OAuth error:', error);
      alert('OAuth redirect failed. Check console.');
    }
  };

  const testEmailLogin = async () => {
    try {
      const result = await Auth.signIn('test@screentimejourney.com', 'TempPass123!');
      setStatus('✅ Email login successful');
      console.log('Login result:', result);
    } catch (error: any) {
      setStatus(`❌ Email login failed: ${error.message}`);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧪 Cognito Authentication Test</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Configuration Status:</h2>
        <p className="text-lg mb-2">{status}</p>
        
        <details className="mt-4">
          <summary className="cursor-pointer font-medium">View Config Details</summary>
          <pre className="mt-2 text-xs bg-white p-2 rounded overflow-x-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </details>
      </div>

      <div className="space-y-4">
        <button
          onClick={testGoogleLogin}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition"
          disabled={!config.isConfigured}
        >
          🔍 Test Google OAuth Login
        </button>

        <button
          onClick={testEmailLogin}
          className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition"
          disabled={!config.isConfigured}
        >
          📧 Test Email/Password Login
        </button>

        <div className="text-sm text-gray-600">
          <p><strong>Note:</strong> This page tests your local Cognito setup.</p>
          <p>After testing locally, upload the same env vars to Vercel for production.</p>
        </div>
      </div>
    </div>
  );
}