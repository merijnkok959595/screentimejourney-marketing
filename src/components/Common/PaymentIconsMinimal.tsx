'use client';
import React from 'react';

const PaymentIconsMinimal: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`payment-icons-minimal flex items-center gap-1.5 ${className}`}>
      {/* Visa */}
      <div className="payment-icon bg-white border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <svg width="20" height="7" viewBox="0 0 20 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.4 0.8L7.4 5.8h1.2l1-5H8.4zM13.7 0.8c-.3 0-.6.2-.7.4L11.1 5.8h1.2l.5-1.4h1.6l.2 1.4h1.1L14.9 0.8h-1.2zm.2 2.8h-1l.8-2.2.2 2.2zM5.1 0.8L3.9 4.3 3.7 3c-.2-.7-.7-1.4-1.4-1.7L3.4 5.8h1.3l2-5H5.1zM2 0.8H0l0 .2c1.4.3 2.4 1.2 2.7 2.3L2 0.8z" fill="#1A1F71"/>
        </svg>
      </div>

      {/* Mastercard */}
      <div className="payment-icon bg-white border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 -ml-1"></div>
        </div>
      </div>

      {/* American Express */}
      <div className="payment-icon bg-blue-600 border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <div className="text-white font-bold text-xs">AE</div>
      </div>

      {/* Discover */}
      <div className="payment-icon bg-orange-500 border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <div className="text-white font-bold text-xs">D</div>
      </div>

      {/* Apple Pay */}
      <div className="payment-icon bg-black border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <svg width="14" height="5" viewBox="0 0 14 5" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.8 2c-.3.3-.7.5-1.1.5-.1-.4.2-.8.4-1.1.3-.3.7-.5 1-.5.1.4-.1.8-.3 1.1zm.4.7c-.6-.1-1.1.3-1.3.3-.3 0-.7-.3-1.2-.3-.6 0-1.2.3-1.5.8-.7 1.1-.2 2.7.4 3.6.3.4.7.9 1.1.9.4 0 .6-.3 1.2-.3.6 0 .8.3 1.2.3.5 0 .8-.4 1-.8.3-.5.4-.9.4-1v0c-.8-.3-.8-1.3-.1-1.6-.4-.5-1-.6-1.2-.6z"/>
        </svg>
      </div>

      {/* Google Pay */}
      <div className="payment-icon bg-white border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <svg width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2v1h1.7c-.1.3-.3.6-.5.8l.9.7c.5-.4.8-1.1.8-1.8 0-.2 0-.4-.1-.6H6z" fill="#4285F4"/>
          <path d="M3.3 2.8l-.2.2-.7.4c.4.8 1.2 1.4 2.2 1.4.7 0 1.3-.3 1.7-.7l-.9-.7c-.3.2-.6.3-.8.3-.7 0-1.3-.4-1.3-.9z" fill="#34A853"/>
          <path d="M2.5 1.5c-.1.2-.2.4-.2.6s.1.4.2.6l1-.6c0-.1-.1-.3-.1-.3s0-.3.1-.3L2.5 1.5z" fill="#FBBC05"/>
          <path d="M4.7 1.2c.4 0 .8.1 1 .3l.8-.8C6 .4 5.4.2 4.7.2c-1 0-1.9.5-2.4 1.2l1 .6c.3-.6.8-.9 1.4-.9z" fill="#EA4335"/>
        </svg>
      </div>

      {/* PayPal */}
      <div className="payment-icon bg-blue-500 border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <div className="text-white font-bold text-xs">PP</div>
      </div>

      {/* Generic Credit Card */}
      <div className="payment-icon bg-gray-700 border border-gray-200 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect width="12" height="8" rx="1" fill="currentColor"/>
          <rect x="1" y="2.5" width="10" height="0.8" fill="white"/>
          <rect x="1" y="5" width="3" height="0.8" fill="white"/>
        </svg>
      </div>

      {/* Security Badge */}
      <div className="payment-icon bg-green-500 border border-green-400 rounded px-2 py-1.5 h-7 flex items-center justify-center min-w-[40px] shadow-sm">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0L1.6 0.8v2c0 1.5 1 3 2.4 3.6 1.4-.6 2.4-2.1 2.4-3.6v-2L4 0z"/>
          <path d="M3.2 4.8L2.4 4l.6-.6L3.2 3.7 5.2 1.6l.6.6L3.2 4.8z" fill="#10B981"/>
        </svg>
      </div>
    </div>
  );
};

export default PaymentIconsMinimal;