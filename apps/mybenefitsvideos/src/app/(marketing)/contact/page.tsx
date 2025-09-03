import ContactForm from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Contact Us - Start Your Benefits Video Project",
  description: "Ready to create engaging benefits videos? Contact myBenefitsVideos.com today for a free consultation. Get pricing, ask questions, and start your project.",
  keywords: ["contact benefits video", "video production inquiry", "benefits communication", "get quote", "free consultation"],
});

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactForm />
      <Footer />
    </main>
  );
}