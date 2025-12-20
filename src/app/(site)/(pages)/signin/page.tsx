import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | ScreenTimeJourney - Digital Detox & Focus Platform",
  description: "Sign in to your ScreenTimeJourney account and start your digital detox journey today.",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
