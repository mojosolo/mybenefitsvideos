import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "myBenefitsVideos.com",
  description: "Professional benefits explainer videos",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Benefits Videos", "Employee Benefits", "Video Production", "Benefits Communication", "HR Videos"],
  links: {
    email: "info@mojosolo.com",
    twitter: "https://twitter.com/mojosolo",
    discord: "",
    github: "",
    instagram: "https://instagram.com/mojosolo/",
  },
  header: [
    {
      trigger: "Services",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "Benefits Video Production",
          description: "Professional videos that explain employee benefits clearly.",
          href: "/services",
        },
        items: [
          {
            href: "/services",
            title: "Video Production",
            description: "Professional videos from $799/min to full animation.",
          },
          {
            href: "/services",
            title: "OE Teaser Videos",
            description: "Short 1-minute videos for open enrollment campaigns ($650).",
          },
          {
            href: "/services",
            title: "Website Services",
            description: "Interactive websites starting at $4,999.",
          },
        ],
      },
    },
    {
      trigger: "About",
      content: {
        items: [
          {
            title: "Our Process",
            href: "/process",
            description: "How we create engaging benefits videos for your team.",
          },
          {
            title: "Team",
            href: "/about",
            description: "Meet the experts behind your benefits videos.",
          },
          {
            title: "Why Video",
            href: "/about",
            description: "The power of video for benefits communication.",
          },
          {
            title: "Industries",
            href: "/case-studies",
            description: "Healthcare, finance, tech, and more.",
          },
          {
            title: "Case Studies",
            href: "/case-studies",
            description: "Success stories from our clients.",
          },
          {
            title: "Pricing",
            href: "/services",
            description: "Transparent pricing for all video packages.",
          },
          {
            title: "Pricing Calculator",
            href: "/calculator",
            description: "Interactive tool to calculate your video investment and ROI.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Resources",
    },
    {
      href: "/calculator",
      label: "Pricing Calculator",
    },
  ],
  pricing: [
    {
      name: "GOOD",
      href: "#",
      price: "$1,598",
      period: "project",
      yearlyPrice: "",
      features: [
        "🎬 2-min video",
        "✍️ Pro scriptwriting",
        "🎨 Custom graphics",
        "🔄 2 rounds revisions",
        "🔥 HD delivery",
      ],
      description: "Perfect for organizations getting started with benefits videos",
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "BETTER",
      href: "#",
      price: "$6,597",
      period: "project",
      yearlyPrice: "",
      features: [
        "🎬 2-min video",
        "🌐 Benefits microsite",
        "✍️ Pro scriptwriting", 
        "🎨 Custom graphics",
        "🔄 2 rounds revisions",
        "⭐ Popular choice",
      ],
      description: "Ideal for comprehensive benefits communication campaigns",
      buttonText: "Get Started",
      isPopular: true,
    },
    {
      name: "BEST",
      href: "#",
      price: "$10,347",
      period: "project",
      yearlyPrice: "",
      features: [
        "🎬 2-min main video",
        "⚡ 1-min OE teaser",
        "🌐 Interactive microsite", 
        "📊 DIY PowerPoint license",
        "🌍 Alt-language version",
        "💎 Maximum value package",
      ],
      description: "For organizations wanting the complete benefits video solution",
      buttonText: "Get Started",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What makes benefits videos effective?",
      answer: (
        <span>
          Benefits videos combine visual storytelling with clear explanations to make
          complex benefits information easy to understand. Our videos increase employee
          engagement by 3x compared to traditional PDF benefits guides and help
          employees make better benefits decisions.
        </span>
      ),
    },
    {
      question: "How long does it take to create a benefits video?",
      answer: (
        <span>
          Timeline varies by service: Standard videos (15 days), Semi-Custom (20 days),          Full Custom (25 days), Full Animation (4-6 weeks).
          This includes script development, design, animation, voiceover, and two
          rounds of revisions. Rush delivery (50% surcharge) available in 2 weeks or less.
        </span>
      ),
    },
    {
      question: "Can you work with our existing benefits materials?",
      answer: (
        <span>
          Absolutely! We work with your existing benefits guides, enrollment forms,
          and plan documents to create accurate, branded video content. We can also
          coordinate with your benefits brokers and insurance carriers as needed.
        </span>
      ),
    },
    {
      question: "Do you offer videos in multiple languages?",
      answer: (
        <span>
          Yes, we offer alternative language versions for $250 per minute + tax after
          the English version is finalized. Common languages include Spanish,
          French, and Mandarin, but we can accommodate most language requests.          Available only after English final approval.
        </span>
      ),
    },
    {
      question: "What's included in the microsite option?",
      answer: (
        <span>
          Our Benefits Break Microsite ($4,999 + $2,499 annual) includes custom landing          pages with
          interactive benefit calculators, enrollment links, and additional resources.
          We also offer Full Benefits Website ($24,999 + $12,499 annual)          and Custom Benefits Portal ($44,999+ + $24,999+ annual) for enterprise needs.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Services",
      links: [
        { href: "/services", text: "Video Production", icon: null },
        { href: "/services", text: "OE Teaser Videos", icon: null },
        { href: "/services", text: "Website Services", icon: null },
        { href: "/services", text: "Pricing", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", text: "About Us", icon: null },
        { href: "/process", text: "Our Process", icon: null },
        { href: "/case-studies", text: "Case Studies", icon: null },
        { href: "/case-studies", text: "Testimonials", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", text: "Blog", icon: null },
        { href: "/contact", text: "Contact", icon: null },
        { href: "/#faq", text: "FAQ", icon: null },
        { href: "/case-studies", text: "Sample Videos", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
