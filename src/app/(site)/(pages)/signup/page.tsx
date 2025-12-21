import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SCREENTIMEJOURNEY",
  description: "Create your ScreenTimeJourney account and start breaking free from digital distractions today.",
  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Sign Up Coming Soon</h1>
        <p className="text-center mt-4">
          Sign up functionality will be available soon with NextAuth.js
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
