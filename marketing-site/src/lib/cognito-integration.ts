// Cognito integration temporarily disabled for build - will be handled by Lambda webhook
// import { signUp, confirmSignUp, signIn, SignUpInput } from 'aws-amplify/auth';
import { generateTempPassword, COGNITO_CONFIG, CreateUserData } from '@/lib/cognito';

// Create Cognito user with Stripe metadata - handled by Lambda webhook
export const createCognitoUser = async (userData: CreateUserData) => {
  try {
    if (!COGNITO_CONFIG.isConfigured) {
      throw new Error('Cognito not configured');
    }

    // For now, return mock success - actual user creation happens via webhook
    const tempPassword = generateTempPassword();
    
    // Mock response - actual user creation will be handled by Lambda webhook
    console.log('User creation will be handled by Stripe webhook → Lambda');

    return {
      success: true,
      user: {
        id: 'temp_user_id',
        email: userData.email,
        temporaryPassword: tempPassword,
        mustChangePassword: true
      },
      cognitoDetails: { userId: 'temp_user_id' }
    };

  } catch (error: any) {
    console.error('Cognito user creation failed:', error);
    
    // Handle specific Cognito errors
    if (error.name === 'UsernameExistsException') {
      return {
        success: false,
        error: 'An account with this email already exists. Please sign in instead.',
        existingUser: true
      };
    }
    
    throw new Error(`Failed to create user account: ${error.message}`);
  }
};

// Sign in user with temporary password - handled by dashboard app
export const signInWithTempPassword = async (email: string, tempPassword: string) => {
  try {
    // Mock response - actual sign-in happens on dashboard app
    console.log('Sign-in will be handled by dashboard app');

    return {
      success: true,
      result: { userId: 'temp_user_id' },
      requiresNewPassword: true
    };

  } catch (error: any) {
    console.error('Sign in failed:', error);
    throw new Error(`Sign in failed: ${error.message}`);
  }
};