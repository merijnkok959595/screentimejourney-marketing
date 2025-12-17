import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SCREENTIMEJOURNEY",
  description: "Break free from digital addiction and reclaim your focus with Screen Time Journey",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
