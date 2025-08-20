import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import CTA from "@/components/sections/cta";
import ProcessTimeline from "@/components/sections/process-timeline";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Our Process - Professional Benefits Video Production Timeline",
  description: "Discover our proven 6-week process for creating exceptional benefits videos. From discovery to delivery, learn about our quality checkpoints, client collaboration, and measurable deliverables.",
  keywords: ["benefits video process", "video production timeline", "benefits communication workflow", "employee engagement process", "video production phases", "benefits video creation"],
});

export default function ProcessPage() {
  return (
    <main>
      <Header />
      <ProcessTimeline />
      <CTA />
      <Footer />
    </main>
  );
}