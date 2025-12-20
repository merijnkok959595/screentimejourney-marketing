import React from "react";
import { Metadata } from "next";
import NextAuthSignin from "@/components/Auth/Signin/NextAuthSignin";

export const metadata: Metadata = {
  title: "Sign In | ScreenTimeJourney - Digital Detox & Focus Platform",
  description: "Sign in to your ScreenTimeJourney account and start your digital detox journey today.",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <NextAuthSignin />
    </main>
  );
};

export default SigninPage;
