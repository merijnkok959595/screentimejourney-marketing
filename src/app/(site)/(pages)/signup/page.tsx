import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up | ScreenTimeJourney - Join Your Digital Detox Journey",
  description: "Create your ScreenTimeJourney account and start breaking free from digital distractions today.",
  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
