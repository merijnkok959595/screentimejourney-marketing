'use client';

import { Amplify } from 'aws-amplify';

export default function AmplifyInit() {
  const config = {
    Auth: {
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    },
  };

  console.log('✅ AMPLIFY CONFIG RUNNING IN BROWSER', config);

  Amplify.configure(config);

  return null;
}