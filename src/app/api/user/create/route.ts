import { NextRequest, NextResponse } from 'next/server';

// Simple fallback config since we're using NextAuth now
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.screentimejourney.com';

interface CreateUserData {
  email: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const userData: CreateUserData = await request.json();
    
    if (!userData.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('🎯 Creating user account for:', userData.email);
    console.log('💳 Stripe Customer ID:', userData.stripeCustomerId);
    console.log('📊 Subscription ID:', userData.stripeSubscriptionId);

    // With NextAuth, users will sign up directly on the dashboard
    console.log('✅ Payment successful, directing to dashboard for NextAuth signup');
    
    return NextResponse.json({
      success: true,
      user: { 
        email: userData.email,
        setupRequired: true
      },
      dashboardUrl: `${DASHBOARD_URL}?email=${encodeURIComponent(userData.email)}&payment_success=true`,
      message: 'Payment successful! Please complete account setup on your dashboard.',
      instructions: 'Visit your dashboard and create an account with the same email address used for payment.'
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
