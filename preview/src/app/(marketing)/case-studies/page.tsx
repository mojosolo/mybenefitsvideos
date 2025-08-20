import CaseStudyFilter from "@/components/sections/case-study-filter";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies - Real Results from Benefits Video Projects | Mojo Solo",
  description: "See how our benefits videos have transformed employee engagement across industries. Real case studies with measurable results from healthcare, tech, finance, and more.",
  keywords: ["benefits video case studies", "employee engagement results", "video production success stories", "benefits communication ROI", "client testimonials"],
};

export default function CaseStudiesPage() {
  return (
    <main>
      <Header />
      <CaseStudyFilter />
      <CTA />
      <Footer />
    </main>
  );
}