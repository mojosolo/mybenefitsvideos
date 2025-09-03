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
  Play, 
  Clock, 
  Users, 
  TrendingUp,
  Monitor,
  FileType,
  Volume2,
  Palette,
  Shield,
  Zap,
  Award,
  Target,
  BarChart3,
  DollarSign,
  Languages
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Foundation Videos - Professional Benefits Video Production",
  description: "Transform your benefits communication with our signature 2-minute foundation videos. Professional scriptwriting, custom animation, and proven 3x engagement increase. Starting at $2,499.",
  keywords: ["foundation videos", "benefits video production", "employee benefits", "video communication", "benefits enrollment", "HR videos"],
});

// Sample data for Foundation Videos
const heroData = {
  title: "Foundation Videos",
  subtitle: "Core 2-minute videos that explain your entire benefits package",
  description: "Our signature service transforms complex benefits information into clear, engaging video content that employees actually watch and understand. Proven to increase engagement by 3x over traditional PDFs.",
  price: "$2,499",
  duration: "Up to 2 minutes",
  timeline: "3-4 weeks",
  icon: <Play className="h-8 w-8" />,
  features: [
    "Professional scriptwriting and storyboarding",
    "Custom graphics and animation",
    "High-quality voiceover narration",
    "2 rounds of revisions included"
  ],
  keyStats: [
    { label: "Engagement", value: "3x", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Enrollment", value: "+40%", icon: <Users className="h-5 w-5" /> },
    { label: "HR Calls", value: "-60%", icon: <BarChart3 className="h-5 w-5" /> }
  ],
  popular: true,
  ctaPrimary: {
    text: "Start Your Project",
    href: "/contact"
  },
  ctaSecondary: {
    text: "View Samples",
    href: "#gallery"
  }
};

const pricingData = {
  title: "Foundation Video Pricing",
  subtitle: "Transparent pricing with no hidden fees. Every video includes 2 rounds of revisions and professional delivery.",
  calculator: {
    enabled: true,
    basePrice: 2499,
    extraMinutePrice: 799,
    rushMultiplier: 1.5
  },
  options: [
    {
      id: "foundation-basic",
      name: "Foundation Video",
      price: "$2,499",
      description: "Perfect for most organizations",
      popular: true,
      features: [
        "Up to 2 minutes of video content",
        "Professional script development",
        "Custom animation and graphics",
        "High-quality voiceover",
        "2 rounds of revisions",
        "HD video in multiple formats",
        "Mobile-optimized delivery",
        "Analytics tracking setup"
      ],
      cta: {
        text: "Get Started",
        href: "/contact"
      },
      additionalInfo: "Additional minutes: $799 each"
    },
    {
      id: "foundation-extended",
      name: "Extended Foundation",
      price: "$4,097",
      originalPrice: "$4,297",
      badge: "Popular Choice",
      badgeColor: "orange",
      description: "For comprehensive benefits packages",
      features: [
        "Up to 4 minutes of video content",
        "Professional script development",
        "Custom animation and graphics",
        "High-quality voiceover",
        "3 rounds of revisions",
        "HD video in multiple formats",
        "Mobile-optimized delivery",
        "Analytics tracking setup",
        "Custom thumbnail design"
      ],
      cta: {
        text: "Choose Extended",
        href: "/contact"
      },
      additionalInfo: "Best value for longer content"
    }
  ],
  addOns: [
    {
      name: "Rush Delivery",
      price: "+50%",
      description: "2 weeks or less delivery timeline",
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: "Multi-Language Version",
      price: "$299/min",
      description: "Professional translation with native speaker voiceover",
      icon: <Languages className="h-5 w-5" />
    },
    {
      name: "Custom Microsite",
      price: "$3,999",
      description: "Interactive landing page featuring your video (Save $1,000 when bundled)",
      icon: <Monitor className="h-5 w-5" />
    },
    {
      name: "Teaser Video Add-on",
      price: "$699",
      description: "1-minute teaser for open enrollment campaigns (Save $300 when bundled)",
      icon: <Target className="h-5 w-5" />
    }
  ]
};

const galleryData = {
  title: "Foundation Video Samples",
  subtitle: "See how we've transformed benefits communication for organizations like yours",
  categories: ["Healthcare", "Retirement", "Wellness", "Open Enrollment"],
  industries: ["Technology", "Healthcare", "Manufacturing", "Government", "Non-Profit"],
  items: [
    {
      id: "healthcare-overview",
      title: "Complete Healthcare Benefits Overview",
      category: "Healthcare",
      description: "Comprehensive 2-minute video explaining medical, dental, and vision benefits for a 5,000+ employee tech company.",
      thumbnail: "/samples/healthcare-overview.jpg",
      duration: "2:00",
      industry: "Technology",
      results: [
        { metric: "Enrollment Increase", value: "+45%" },
        { metric: "HR Call Reduction", value: "-70%" }
      ],
      tags: ["Medical", "Dental", "Vision", "HSA"]
    },
    {
      id: "retirement-planning",
      title: "401k & Retirement Planning Guide",
      category: "Retirement",
      description: "Clear explanation of retirement benefits, matching contributions, and investment options.",
      thumbnail: "/samples/retirement-planning.jpg",
      duration: "2:30",
      industry: "Manufacturing",
      results: [
        { metric: "Participation Rate", value: "+35%" },
        { metric: "Employee Satisfaction", value: "92%" }
      ],
      tags: ["401k", "Matching", "Investments", "Planning"]
    },
    {
      id: "open-enrollment-guide",
      title: "Open Enrollment Made Simple",
      category: "Open Enrollment",
      description: "Step-by-step guide through the open enrollment process with key deadlines and decisions.",
      thumbnail: "/samples/open-enrollment.jpg",
      duration: "1:45",
      industry: "Healthcare",
      results: [
        { metric: "On-time Enrollment", value: "+28%" },
        { metric: "Errors Reduced", value: "-55%" }
      ],
      tags: ["Enrollment", "Deadlines", "Decisions", "Process"]
    },
    {
      id: "wellness-programs",
      title: "Employee Wellness Programs",
      category: "Wellness",
      description: "Engaging overview of wellness benefits, mental health resources, and fitness programs.",
      thumbnail: "/samples/wellness-programs.jpg",
      duration: "2:15",
      industry: "Government",
      results: [
        { metric: "Program Participation", value: "+60%" },
        { metric: "Wellness Scores", value: "+25%" }
      ],
      tags: ["Wellness", "Mental Health", "Fitness", "EAP"]
    },
    {
      id: "new-hire-benefits",
      title: "New Employee Benefits Orientation",
      category: "Healthcare",
      description: "Welcoming video that introduces new hires to their complete benefits package.",
      thumbnail: "/samples/new-hire.jpg",
      duration: "2:00",
      industry: "Non-Profit",
      results: [
        { metric: "Understanding", value: "+80%" },
        { metric: "Enrollment Speed", value: "+40%" }
      ],
      tags: ["New Hire", "Orientation", "Complete Package"]
    },
    {
      id: "flexible-benefits",
      title: "Flexible Spending Accounts",
      category: "Healthcare",
      description: "Detailed explanation of FSA and HSA options with real-world examples and savings calculations.",
      thumbnail: "/samples/flexible-benefits.jpg",
      duration: "1:50",
      industry: "Technology",
      results: [
        { metric: "FSA Participation", value: "+55%" },
        { metric: "Average Savings", value: "$1,200" }
      ],
      tags: ["FSA", "HSA", "Savings", "Tax Benefits"]
    }
  ]
};

const testimonialsData = {
  title: "What Our Clients Say",
  subtitle: "Foundation videos have transformed benefits communication for hundreds of organizations",
  serviceType: "foundation",
  testimonials: [
    {
      id: "sarah-tech",
      name: "Sarah Johnson",
      title: "Head of People Operations",
      company: "TechFlow Systems",
      companySize: "2,500 employees",
      industry: "Technology",
      service: "foundation",
      quote: "Our foundation video completely transformed our benefits communication. We saw a 45% increase in healthcare enrollment and significantly fewer confused employees during open enrollment.",
      rating: 5,
      results: [
        { metric: "Healthcare Enrollment", value: "+45%", improvement: "+45%" },
        { metric: "Support Tickets", value: "-68%", improvement: "-68%" },
        { metric: "Employee Satisfaction", value: "4.8/5", improvement: "+1.2 pts" }
      ],
      featured: true
    },
    {
      id: "michael-manufacturing",
      name: "Michael Chen",
      title: "Benefits Administrator",
      company: "Precision Manufacturing Co.",
      companySize: "1,200 employees",
      industry: "Manufacturing",
      service: "foundation",
      quote: "The video made our complex benefits package so much clearer. Even our production floor workers understand their options now. Best investment we've made in employee communication.",
      rating: 5,
      results: [
        { metric: "Benefits Utilization", value: "+38%", improvement: "+38%" },
        { metric: "Enrollment Errors", value: "-72%", improvement: "-72%" }
      ]
    },
    {
      id: "lisa-healthcare",
      name: "Lisa Rodriguez",
      title: "Director of Human Resources",
      company: "Regional Medical Center",
      companySize: "3,800 employees",
      industry: "Healthcare",
      service: "foundation",
      quote: "As a healthcare organization, we needed our team to fully understand their benefits. The foundation video delivered exactly that - clear, professional, and engaging content.",
      rating: 5,
      featured: true
    }
  ]
};

const comparisonData = {
  title: "Compare Foundation Video Options",
  subtitle: "Choose the option that best fits your organization's needs and budget",
  items: [
    {
      id: "basic",
      name: "Basic Foundation",
      price: "$2,499",
      description: "Perfect for straightforward benefits packages",
      popular: false,
      features: [
        {
          category: "Video Content",
          items: [
            { name: "Video Length", included: "Up to 2 minutes" },
            { name: "Script Development", included: true },
            { name: "Professional Animation", included: true },
            { name: "Custom Graphics", included: "Basic" },
            { name: "Voiceover", included: "Professional" }
          ]
        },
        {
          category: "Revisions & Support",
          items: [
            { name: "Script Revisions", included: "2 rounds" },
            { name: "Video Revisions", included: "2 rounds" },
            { name: "Project Management", included: true },
            { name: "Priority Support", included: false }
          ]
        },
        {
          category: "Delivery & Formats",
          items: [
            { name: "HD Video Files", included: true },
            { name: "Multiple Formats", included: "3 formats" },
            { name: "Mobile Optimization", included: true },
            { name: "Custom Thumbnails", included: "1 design" }
          ]
        }
      ],
      cta: {
        text: "Choose Basic",
        href: "/contact?package=basic"
      }
    },
    {
      id: "extended",
      name: "Extended Foundation",
      price: "$4,097",
      priceNote: "Save $200",
      description: "For comprehensive benefits communication",
      recommended: true,
      features: [
        {
          category: "Video Content",
          items: [
            { name: "Video Length", included: "Up to 4 minutes" },
            { name: "Script Development", included: true },
            { name: "Professional Animation", included: true },
            { name: "Custom Graphics", included: "Advanced" },
            { name: "Voiceover", included: "Premium" }
          ]
        },
        {
          category: "Revisions & Support",
          items: [
            { name: "Script Revisions", included: "3 rounds" },
            { name: "Video Revisions", included: "3 rounds" },
            { name: "Project Management", included: true },
            { name: "Priority Support", included: true }
          ]
        },
        {
          category: "Delivery & Formats",
          items: [
            { name: "HD Video Files", included: true },
            { name: "Multiple Formats", included: "5 formats" },
            { name: "Mobile Optimization", included: true },
            { name: "Custom Thumbnails", included: "3 designs" }
          ]
        }
      ],
      cta: {
        text: "Choose Extended",
        href: "/contact?package=extended"
      },
      highlights: [
        "Most popular choice for large organizations",
        "Best value per minute of content",
        "Priority project management"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Foundation",
      price: "Custom",
      description: "For complex, multi-faceted benefits programs",
      features: [
        {
          category: "Video Content",
          items: [
            { name: "Video Length", included: "Unlimited" },
            { name: "Script Development", included: true },
            { name: "Professional Animation", included: true },
            { name: "Custom Graphics", included: "Premium" },
            { name: "Voiceover", included: "Premium + Options" }
          ]
        },
        {
          category: "Revisions & Support",
          items: [
            { name: "Script Revisions", included: "Unlimited" },
            { name: "Video Revisions", included: "Unlimited" },
            { name: "Project Management", included: "Dedicated PM" },
            { name: "Priority Support", included: true }
          ]
        },
        {
          category: "Delivery & Formats",
          items: [
            { name: "HD Video Files", included: true },
            { name: "Multiple Formats", included: "All formats" },
            { name: "Mobile Optimization", included: true },
            { name: "Custom Thumbnails", included: "Unlimited" }
          ]
        }
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact?package=enterprise"
      }
    }
  ]
};

const specsData = {
  title: "Technical Specifications",
  subtitle: "Professional-grade video production with industry-standard technical specifications",
  serviceType: "Foundation Videos",
  categories: [
    {
      id: "video",
      name: "Video Quality",
      icon: <Monitor className="h-5 w-5" />,
      specs: [
        { name: "Resolution", value: "1920×1080 (Full HD)", description: "Crystal clear video quality optimized for all viewing devices", highlight: true },
        { name: "Frame Rate", value: "30 fps", description: "Smooth motion for professional presentation" },
        { name: "Bitrate", value: "8-12 Mbps", description: "High quality encoding for crisp visuals" },
        { name: "Color Space", value: "Rec. 709", description: "Industry standard color space for consistent viewing across devices" }
      ]
    },
    {
      id: "audio",
      name: "Audio Quality",
      icon: <Volume2 className="h-5 w-5" />,
      specs: [
        { name: "Sample Rate", value: "48 kHz", description: "Professional broadcast quality audio", highlight: true },
        { name: "Bit Depth", value: "24-bit", description: "High fidelity audio recording" },
        { name: "Audio Channels", value: "Stereo", description: "Full stereo mix with professional voiceover" },
        { name: "Loudness Standard", value: "-23 LUFS", description: "Broadcast standard loudness for consistent playback" }
      ]
    },
    {
      id: "design",
      name: "Design & Animation",
      icon: <Palette className="h-5 w-5" />,
      specs: [
        { name: "Animation Style", value: "2D Motion Graphics", description: "Professional 2D animation with smooth transitions", highlight: true },
        { name: "Brand Integration", value: "Full Custom", description: "Your colors, fonts, and logo throughout" },
        { name: "Graphics Quality", value: "Vector-based", description: "Scalable graphics that look sharp at any size" },
        { name: "Transitions", value: "Custom Animated", description: "Smooth, professional transitions between sections" }
      ]
    }
  ],
  deliveryFormats: [
    { name: "Web Optimized", resolution: "1920×1080", size: "50-80 MB", purpose: "Websites, intranets, email" },
    { name: "Social Media", resolution: "1080×1080", size: "30-50 MB", purpose: "LinkedIn, social platforms" },
    { name: "Presentation", resolution: "1920×1080", size: "100-150 MB", purpose: "High-quality presentations" },
    { name: "Mobile", resolution: "720×1280", size: "25-40 MB", purpose: "Mobile apps, vertical viewing" }
  ],
  qualityStandards: [
    { 
      standard: "Professional Voiceover", 
      description: "Experienced voice talent with broadcast-quality recording equipment and sound-treated studios",
      icon: <Volume2 className="h-6 w-6" />
    },
    {
      standard: "Brand Compliance",
      description: "Every video is carefully designed to match your brand guidelines and maintain visual consistency",
      icon: <Palette className="h-6 w-6" />
    },
    {
      standard: "Quality Assurance", 
      description: "Multi-stage review process ensures every video meets our rigorous technical and creative standards",
      icon: <Shield className="h-6 w-6" />
    }
  ],
  technicalRequirements: [
    {
      category: "Content Materials",
      requirements: [
        "Benefits plan documents and summaries",
        "Brand guidelines (colors, fonts, logos)",
        "Any existing benefits materials or presentations",
        "Key messaging and tone preferences"
      ]
    },
    {
      category: "Review Process",
      requirements: [
        "Designated stakeholders for script approval",
        "Timeline for review and feedback cycles",
        "Final approval authority contact",
        "Technical review contact (if needed)"
      ]
    }
  ]
};

export default function FoundationVideosPage() {
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