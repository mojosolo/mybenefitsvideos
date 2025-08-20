import ServiceDetails from "@/components/sections/service-details";import ServiceDisclaimers from "@/components/sections/service-disclaimers";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Benefits Video Production Services - Standard to Full Animation & Websites",
  description: "Professional benefits video production from $799/min standard to $5,000 full animation, plus interactive websites starting at $4,999. Includes OE teasers, multi-language versions, and DIY PowerPoint conversion.",
  keywords: ["benefits video services", "video production", "OE teaser videos", "website services", "employee benefits", "benefits communication", "DIY PowerPoint", "multi-language"],
});

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServiceDetails />
      <ServiceDisclaimers />
      <CTA />
      <Footer />
    </main>
  );
}