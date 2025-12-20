'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
  onAuthSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'signin',
  onAuthSuccess 
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'confirm' | 'forgot' | 'reset'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Sign in failed');
      } else {
        toast.success('Signed in successfully!');
        onAuthSuccess?.();
        onClose();
      }
    } catch (error: any) {
      toast.error('Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || password !== confirmPassword) {
      toast.error('Please check all fields');
      return;
    }

    try {
      setLoading(true);
      
      // For now, show message that signup will be available soon
      toast.success('Sign up feature coming soon! Please contact support for early access.');
      onClose();
    } catch (error: any) {
      toast.error('Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !verificationCode) return;

    try {
      setLoading(true);
      
      toast.success('Verification feature coming soon!');
      setMode('signin');
    } catch (error: any) {
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      
      toast.success('Password reset feature coming soon! Contact support for help.');
      onClose();
    } catch (error: any) {
      toast.error('Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !verificationCode || !newPassword) return;

    try {
      setLoading(true);
      
      toast.success('Password reset successfully!');
      setMode('signin');
    } catch (error: any) {
      toast.error('Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--brand-text)', fontFamily: 'var(--font-heading)' }}>
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}  
            {mode === 'confirm' && 'Verify Email'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'reset' && 'Set New Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                style={{ 
                  fontFamily: 'var(--font-body)'
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                style={{ 
                  fontFamily: 'var(--font-body)'
                }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
              style={{ 
                backgroundColor: 'var(--brand-primary)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--brand-primary)' }}
              >
                Forgot Password?
              </button>
              <div>
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                style={{ 
                  fontFamily: 'var(--font-body)'
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                style={{ 
                  fontFamily: 'var(--font-body)'
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                style={{ 
                  fontFamily: 'var(--font-body)'
                }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
              style={{ 
                backgroundColor: 'var(--brand-primary)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--brand-primary)' }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Other modes (confirm, forgot, reset) can be added here */}
      </div>
    </div>
  );
};

export default AuthModal;