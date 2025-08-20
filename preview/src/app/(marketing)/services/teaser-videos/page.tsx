import ServiceHero from "@/components/sections/service-hero";
import ServicePricing from "@/components/sections/service-pricing";
import ServiceGallery from "@/components/sections/service-gallery";
import ServiceTestimonials from "@/components/sections/service-testimonials";
import ServiceComparison from "@/components/sections/service-comparison";
import ServiceSpecs from "@/components/sections/service-specs";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import CTA from "@/components/sections/cta";
import { constructMetadata } from "@/lib/utils";
import { 
  Timer, 
  Clock, 
  Target, 
  TrendingUp,
  Monitor,
  FileType,
  Volume2,
  Palette,
  Shield,
  Zap,
  Award,
  Users,
  BarChart3,
  DollarSign,
  Calendar,
  Share2,
  Mail,
  Hash
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Teaser Videos - Short-Form Benefits Video Production",
  description: "Drive enrollment and engagement with compelling 1-minute teaser videos. Perfect for open enrollment campaigns, social media, and deadline-driven communications. Starting at $999.",
  keywords: ["teaser videos", "open enrollment videos", "benefits campaigns", "short videos", "enrollment marketing", "benefits teasers"],
});

// Sample data for Teaser Videos
const heroData = {
  title: "Teaser Videos",
  subtitle: "Short 1-minute videos perfect for open enrollment campaigns",
  description: "Create excitement and drive enrollment with short, punchy videos that highlight key benefits and motivate employee action. Designed for social media, email campaigns, and deadline-sensitive communications.",
  price: "$999",
  duration: "Up to 1 minute",
  timeline: "2-3 weeks",
  icon: <Timer className="h-8 w-8" />,
  features: [
    "Concise, action-oriented messaging",
    "Eye-catching graphics and transitions",
    "Strong call-to-action integration",
    "Social media optimized formats"
  ],
  keyStats: [
    { label: "Campaign Reach", value: "+250%", icon: <Share2 className="h-5 w-5" /> },
    { label: "Urgency Response", value: "+85%", icon: <Target className="h-5 w-5" /> },
    { label: "Social Shares", value: "3.2x", icon: <Hash className="h-5 w-5" /> }
  ],
  popular: false,
  ctaPrimary: {
    text: "Start Your Campaign",
    href: "/contact"
  },
  ctaSecondary: {
    text: "View Campaign Examples",
    href: "#gallery"
  }
};

const pricingData = {
  title: "Teaser Video Campaign Pricing",
  subtitle: "Cost-effective video marketing that drives immediate action and increases enrollment participation.",
  calculator: {
    enabled: false, // Teaser videos have fixed pricing
    basePrice: 0
  },
  options: [
    {
      id: "teaser-single",
      name: "Single Teaser Video",
      price: "$999",
      description: "Perfect for focused campaigns",
      features: [
        "Up to 1 minute of video content",
        "Campaign-focused script development",
        "Eye-catching motion graphics",
        "Professional voiceover",
        "2 rounds of revisions",
        "Multiple social media formats",
        "Email-optimized versions",
        "Mobile-first design"
      ],
      cta: {
        text: "Create Single Teaser",
        href: "/contact?service=teaser-single"
      },
      additionalInfo: "Ideal for single campaign launches"
    },
    {
      id: "teaser-series",
      name: "Teaser Campaign Series",
      price: "$2,497",
      originalPrice: "$2,997",
      badge: "Save $500",
      badgeColor: "green",
      description: "Multi-video campaign sequence",
      popular: true,
      features: [
        "3 complementary teaser videos",
        "Sequential campaign messaging",
        "Countdown and urgency themes",
        "Professional voiceover for all videos",
        "3 rounds of revisions per video",
        "Complete social media package",
        "Email campaign templates",
        "Campaign launch strategy guide"
      ],
      cta: {
        text: "Launch Campaign Series",
        href: "/contact?service=teaser-series"
      },
      additionalInfo: "Most effective for sustained campaigns"
    }
  ],
  addOns: [
    {
      name: "Rush Campaign Launch",
      price: "+50%",
      description: "1 week delivery for urgent campaigns",
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: "Extended Social Package",
      price: "$299",
      description: "Additional formats for TikTok, Instagram Stories, LinkedIn",
      icon: <Share2 className="h-5 w-5" />
    },
    {
      name: "Email Campaign Design",
      price: "$199",
      description: "Custom email templates featuring your teaser videos",
      icon: <Mail className="h-5 w-5" />
    },
    {
      name: "Landing Page Bundle",
      price: "$799",
      description: "Custom landing page to host your teaser campaign",
      icon: <Monitor className="h-5 w-5" />
    }
  ]
};

const galleryData = {
  title: "Teaser Video Campaign Examples",
  subtitle: "See how short-form videos drive immediate action and increase enrollment participation",
  categories: ["Open Enrollment", "Deadline Campaigns", "New Benefits", "Wellness Push"],
  industries: ["Technology", "Healthcare", "Retail", "Education", "Government"],
  items: [
    {
      id: "oe-countdown",
      title: "Open Enrollment Countdown Campaign",
      category: "Open Enrollment",
      description: "Series of 3 teaser videos building urgency as enrollment deadline approaches.",
      thumbnail: "/samples/oe-countdown.jpg",
      duration: "0:45 each",
      industry: "Technology",
      results: [
        { metric: "Enrollment Rate", value: "+32%" },
        { metric: "On-Time Submissions", value: "+78%" }
      ],
      tags: ["Countdown", "Urgency", "Deadline", "Series"]
    },
    {
      id: "new-benefit-launch",
      title: "New Mental Health Benefit Announcement",
      category: "New Benefits",
      description: "Exciting announcement video highlighting new mental health and wellness benefits.",
      thumbnail: "/samples/mental-health.jpg",
      duration: "1:00",
      industry: "Healthcare",
      results: [
        { metric: "Benefit Awareness", value: "+95%" },
        { metric: "Program Sign-ups", value: "+240%" }
      ],
      tags: ["Mental Health", "New Benefit", "Wellness", "Announcement"]
    },
    {
      id: "hsa-reminder",
      title: "HSA Contribution Deadline Reminder",
      category: "Deadline Campaigns",
      description: "Urgent reminder about HSA contribution deadlines with clear call-to-action.",
      thumbnail: "/samples/hsa-deadline.jpg",
      duration: "0:30",
      industry: "Retail",
      results: [
        { metric: "HSA Contributions", value: "+125%" },
        { metric: "Last-minute Actions", value: "+180%" }
      ],
      tags: ["HSA", "Deadline", "Contributions", "Urgent"]
    },
    {
      id: "wellness-challenge",
      title: "Annual Wellness Challenge Kickoff",
      category: "Wellness Push",
      description: "Energetic campaign launch for company-wide wellness challenge with team competitions.",
      thumbnail: "/samples/wellness-challenge.jpg",
      duration: "0:50",
      industry: "Education",
      results: [
        { metric: "Challenge Participation", value: "+85%" },
        { metric: "Team Formation", value: "+120%" }
      ],
      tags: ["Wellness", "Challenge", "Team", "Competition"]
    },
    {
      id: "benefits-fair",
      title: "Virtual Benefits Fair Promotion",
      category: "Open Enrollment",
      description: "Promotional video driving attendance to virtual benefits fair with vendor spotlights.",
      thumbnail: "/samples/benefits-fair.jpg",
      duration: "0:55",
      industry: "Government",
      results: [
        { metric: "Fair Attendance", value: "+68%" },
        { metric: "Vendor Interactions", value: "+145%" }
      ],
      tags: ["Benefits Fair", "Virtual", "Vendors", "Promotion"]
    },
    {
      id: "flex-spending",
      title: "Use It or Lose It FSA Reminder",
      category: "Deadline Campaigns",
      description: "Time-sensitive campaign reminding employees to use FSA funds before year-end deadline.",
      thumbnail: "/samples/fsa-reminder.jpg",
      duration: "0:40",
      industry: "Technology",
      results: [
        { metric: "FSA Utilization", value: "+92%" },
        { metric: "Year-end Claims", value: "+156%" }
      ],
      tags: ["FSA", "Use It or Lose It", "Year-end", "Deadline"]
    }
  ]
};

const testimonialsData = {
  title: "Campaign Success Stories",
  subtitle: "Teaser videos have driven remarkable enrollment and engagement results across industries",
  serviceType: "teaser",
  testimonials: [
    {
      id: "jennifer-retail",
      name: "Jennifer Martinez",
      title: "Benefits Communications Manager",
      company: "National Retail Chain",
      companySize: "15,000 employees",
      industry: "Retail",
      service: "teaser",
      quote: "Our teaser video campaign generated more enrollment activity in one week than our previous email campaigns achieved in months. The countdown series was incredibly effective.",
      rating: 5,
      results: [
        { metric: "Campaign Engagement", value: "+320%", improvement: "+320%" },
        { metric: "Social Media Reach", value: "2.5M", improvement: "+185%" },
        { metric: "Enrollment Conversion", value: "+45%", improvement: "+45%" }
      ],
      featured: true
    },
    {
      id: "robert-healthcare",
      name: "Robert Kim",
      title: "Employee Communications Director",
      company: "Regional Hospital System",
      companySize: "8,500 employees",
      industry: "Healthcare",
      service: "teaser",
      quote: "The teaser videos perfectly captured the urgency of our open enrollment deadline. We saw our highest participation rate ever, especially among younger employees.",
      rating: 5,
      results: [
        { metric: "Millennial Engagement", value: "+180%", improvement: "+180%" },
        { metric: "Mobile Views", value: "85%", improvement: "+65%" }
      ]
    },
    {
      id: "amanda-tech",
      name: "Amanda Foster",
      title: "People Operations Lead",
      company: "Software Startup",
      companySize: "450 employees",
      industry: "Technology",
      service: "teaser",
      quote: "Our new mental health benefits needed a big launch. The teaser video got everyone excited and talking. Sign-ups exceeded our expectations by 240%.",
      rating: 5,
      featured: true
    }
  ]
};

const comparisonData = {
  title: "Teaser Video vs. Other Marketing Methods",
  subtitle: "See why teaser videos outperform traditional benefits communication methods",
  items: [
    {
      id: "teaser-video",
      name: "Teaser Videos",
      price: "$999",
      description: "Short, engaging video campaigns",
      recommended: true,
      features: [
        {
          category: "Engagement Metrics",
          items: [
            { name: "Average View Rate", included: "85%" },
            { name: "Completion Rate", included: "78%" },
            { name: "Share Rate", included: "25%" },
            { name: "Click-through Rate", included: "12%" }
          ]
        },
        {
          category: "Distribution",
          items: [
            { name: "Social Media Ready", included: true },
            { name: "Email Integration", included: true },
            { name: "Mobile Optimized", included: true },
            { name: "Intranet Compatible", included: true }
          ]
        },
        {
          category: "Production Time",
          items: [
            { name: "Turnaround", included: "2-3 weeks" },
            { name: "Revisions", included: "2 rounds" },
            { name: "Rush Available", included: "1 week" },
            { name: "Campaign Strategy", included: true }
          ]
        }
      ],
      cta: {
        text: "Create Teaser Campaign",
        href: "/contact?service=teaser"
      },
      highlights: [
        "Highest engagement rates",
        "Mobile-first design",
        "Social media optimized",
        "Drives immediate action"
      ]
    },
    {
      id: "email-only",
      name: "Email Campaigns",
      price: "$0-500",
      description: "Traditional email marketing",
      features: [
        {
          category: "Engagement Metrics",
          items: [
            { name: "Average View Rate", included: "22%" },
            { name: "Completion Rate", included: "8%" },
            { name: "Share Rate", included: "2%" },
            { name: "Click-through Rate", included: "3%" }
          ]
        },
        {
          category: "Distribution",
          items: [
            { name: "Social Media Ready", included: false },
            { name: "Email Integration", included: true },
            { name: "Mobile Optimized", included: "Limited" },
            { name: "Intranet Compatible", included: true }
          ]
        },
        {
          category: "Production Time",
          items: [
            { name: "Turnaround", included: "1-2 days" },
            { name: "Revisions", included: "Unlimited" },
            { name: "Rush Available", included: "Same day" },
            { name: "Campaign Strategy", included: false }
          ]
        }
      ],
      cta: {
        text: "Traditional Approach",
        href: "#"
      }
    },
    {
      id: "static-graphics",
      name: "Static Graphics",
      price: "$200-800",
      description: "Posters and infographic campaigns",
      features: [
        {
          category: "Engagement Metrics",
          items: [
            { name: "Average View Rate", included: "15%" },
            { name: "Completion Rate", included: "45%" },
            { name: "Share Rate", included: "5%" },
            { name: "Click-through Rate", included: "2%" }
          ]
        },
        {
          category: "Distribution",
          items: [
            { name: "Social Media Ready", included: "Limited" },
            { name: "Email Integration", included: true },
            { name: "Mobile Optimized", included: "Varies" },
            { name: "Intranet Compatible", included: true }
          ]
        },
        {
          category: "Production Time",
          items: [
            { name: "Turnaround", included: "3-5 days" },
            { name: "Revisions", included: "3 rounds" },
            { name: "Rush Available", included: "1-2 days" },
            { name: "Campaign Strategy", included: false }
          ]
        }
      ],
      cta: {
        text: "Static Design",
        href: "#"
      }
    }
  ]
};

const specsData = {
  title: "Teaser Video Technical Specifications",
  subtitle: "Optimized for maximum reach and engagement across all digital platforms",
  serviceType: "Teaser Videos",
  categories: [
    {
      id: "video",
      name: "Video Quality",
      icon: <Monitor className="h-5 w-5" />,
      specs: [
        { name: "Resolution", value: "1920×1080 + Square", description: "Full HD plus 1:1 ratio for social media", highlight: true },
        { name: "Duration", value: "30-60 seconds", description: "Optimal length for engagement and platform requirements" },
        { name: "Frame Rate", value: "30 fps", description: "Smooth playback across all devices" },
        { name: "Compression", value: "H.264", description: "Universal compatibility with fast loading times" }
      ]
    },
    {
      id: "social",
      name: "Social Media Formats",
      icon: <Share2 className="h-5 w-5" />,
      specs: [
        { name: "LinkedIn Video", value: "1920×1080", description: "Professional network optimized format", highlight: true },
        { name: "Instagram/Facebook", value: "1080×1080", description: "Square format for maximum feed visibility" },
        { name: "Instagram Stories", value: "1080×1920", description: "Vertical format for story placement" },
        { name: "Twitter/X Video", value: "1280×720", description: "Optimized for timeline autoplay" }
      ]
    },
    {
      id: "campaign",
      name: "Campaign Elements",
      icon: <Target className="h-5 w-5" />,
      specs: [
        { name: "Call-to-Action", value: "Integrated Graphics", description: "Clear, compelling CTAs built into video", highlight: true },
        { name: "Branding", value: "Consistent Throughout", description: "Logo, colors, and fonts match your brand" },
        { name: "Urgency Elements", value: "Countdown/Deadline", description: "Visual elements that drive immediate action" },
        { name: "Contact Information", value: "End Cards", description: "Clear next steps and contact details" }
      ]
    }
  ],
  deliveryFormats: [
    { name: "Social Media Package", resolution: "Multiple", size: "20-40 MB", purpose: "LinkedIn, Instagram, Facebook, Twitter" },
    { name: "Email Optimized", resolution: "1280×720", size: "15-25 MB", purpose: "Email campaigns, fast loading" },
    { name: "Website Hero", resolution: "1920×1080", size: "30-50 MB", purpose: "Homepage, landing pages" },
    { name: "Mobile Stories", resolution: "1080×1920", size: "20-35 MB", purpose: "Instagram/Facebook Stories" }
  ],
  qualityStandards: [
    { 
      standard: "Campaign-Focused Messaging", 
      description: "Every element designed to drive specific actions and create urgency for enrollment deadlines",
      icon: <Target className="h-6 w-6" />
    },
    {
      standard: "Multi-Platform Optimization",
      description: "Videos optimized for performance across social media, email, and web platforms",
      icon: <Share2 className="h-6 w-6" />
    },
    {
      standard: "Mobile-First Design", 
      description: "Created with mobile viewing in mind, ensuring engagement on smartphones and tablets",
      icon: <Monitor className="h-6 w-6" />
    }
  ],
  technicalRequirements: [
    {
      category: "Campaign Materials",
      requirements: [
        "Key campaign message and call-to-action",
        "Deadline dates and important timelines",
        "Target audience demographics and preferences",
        "Existing campaign assets (if any)"
      ]
    },
    {
      category: "Distribution Planning",
      requirements: [
        "List of intended distribution channels",
        "Social media account specifications",
        "Email system requirements",
        "Campaign launch timeline"
      ]
    }
  ]
};

export default function TeaserVideosPage() {
  return (
    <main>
      <Header />
      
      <ServiceHero {...heroData} />
      
      <ServicePricing {...pricingData} />
      
      <ServiceGallery {...galleryData} />
      
      <ServiceTestimonials {...testimonialsData} />
      
      <ServiceComparison {...comparisonData} />
      
      <ServiceSpecs {...specsData} />
      
      <CTA />
      
      <Footer />
    </main>
  );
}