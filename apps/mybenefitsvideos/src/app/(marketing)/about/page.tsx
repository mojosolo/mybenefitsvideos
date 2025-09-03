import AboutHero from "@/components/sections/about-hero";
import CompanyValues from "@/components/sections/company-values";
import Timeline from "@/components/sections/timeline";
import TeamGrid from "@/components/sections/team-grid";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "About Us - Professional Benefits Video Production",
  description: "Meet the team behind myBenefitsVideos.com's award-winning benefits video production. Learn about our mission, values, and the experts who create engaging benefits communication.",
  keywords: ["benefits video team", "video production experts", "benefits communication", "employee engagement", "company values", "video production timeline"],
});

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutHero />
      <CompanyValues />
      <Timeline />
      <TeamGrid />
      <CTA />
      <Footer />
    </main>
  );
}