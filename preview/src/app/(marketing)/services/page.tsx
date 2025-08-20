import ServiceDetails from "@/components/sections/service-details";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Benefits Video Production Services - Foundation Videos, Teasers & Microsites",
  description: "Comprehensive benefits video production services including 2-minute foundation videos, 1-minute teasers, custom microsites, and multi-language support. Transform your employee benefits communication.",
  keywords: ["benefits video services", "foundation videos", "teaser videos", "microsites", "employee benefits", "video production", "benefits communication"],
});

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServiceDetails />
      <CTA />
      <Footer />
    </main>
  );
}