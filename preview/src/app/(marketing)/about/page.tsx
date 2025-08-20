import AboutHero from "@/components/sections/about-hero";
import TeamGrid from "@/components/sections/team-grid";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Professional Benefits Video Production | Mojo Solo",
  description: "Meet the team behind Mojo Solo's award-winning benefits video production. Learn about our mission to make employee benefits communication engaging and effective.",
  keywords: ["benefits video team", "video production experts", "benefits communication", "employee engagement"],
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutHero />
      <TeamGrid />
      <CTA />
      <Footer />
    </main>
  );
}