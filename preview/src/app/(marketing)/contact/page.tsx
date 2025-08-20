import ContactForm from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Start Your Benefits Video Project | Mojo Solo",
  description: "Ready to create engaging benefits videos? Contact Mojo Solo today for a free consultation. Get pricing, ask questions, and start your project.",
  keywords: ["contact benefits video", "video production inquiry", "benefits communication", "get quote", "free consultation"],
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactForm />
      <Footer />
    </main>
  );
}