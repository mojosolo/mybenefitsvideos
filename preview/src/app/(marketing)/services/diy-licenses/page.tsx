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
  FileText, 
  Clock, 
  Upload, 
  TrendingUp,
  Monitor,
  Download,
  Volume2,
  Palette,
  Shield,
  Zap,
  Award,
  Presentation,
  BarChart3,
  DollarSign,
  Users,
  BookOpen,
  Settings,
  CheckCircle
} from "lucide-react";

export const metadata = constructMetadata({
  title: "DIY PowerPoint Licenses - Transform Presentations to Professional Videos",
  description: "Convert your existing PowerPoint presentations into professional videos with AI or human voiceover. Self-service solution with training and support. $1,999 AI voice, $2,999 human voice.",
  keywords: ["DIY video license", "PowerPoint to video", "presentation conversion", "AI voiceover", "human voiceover", "self-service video"],
});

// Sample data for DIY Licenses
const heroData = {
  title: "DIY PowerPoint License",
  subtitle: "Transform your existing presentations into professional videos",
  description: "Upload your PowerPoint presentations and we'll convert them into professional video content with voiceover, transitions, and branding. Perfect for organizations with existing content who want professional video quality.",
  price: "$1,999 (AI Voice) / $2,999 (Human Voice)",
  duration: "Based on slides",
  timeline: "1-2 weeks",
  icon: <FileText className="h-8 w-8" />,
  features: [
    "PowerPoint to video conversion",
    "Professional AI or human voiceover",
    "Branded transitions and graphics",
    "Multiple format delivery"
  ],
  keyStats: [
    { label: "Content ROI", value: "+400%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Production Speed", value: "3x Faster", icon: <Zap className="h-5 w-5" /> },
    { label: "Cost Savings", value: "60%", icon: <DollarSign className="h-5 w-5" /> }
  ],
  popular: false,
  ctaPrimary: {
    text: "Start DIY Project",
    href: "/contact"
  },
  ctaSecondary: {
    text: "See Before/After Examples",
    href: "#gallery"
  }
};

const pricingData = {
  title: "DIY License Pricing Options",
  subtitle: "Transform unlimited presentations with professional voiceover and branding at a fraction of custom video costs.",
  calculator: {
    enabled: false,
    basePrice: 0
  },
  options: [
    {
      id: "diy-ai-voice",
      name: "DIY License with AI Voice",
      price: "$1,999",
      description: "Professional AI voiceover option",
      popular: true,
      features: [
        "PowerPoint to video conversion",
        "Professional AI voiceover",
        "Custom branded transitions",
        "Multiple format delivery",
        "Slide timing optimization",
        "Background music integration",
        "Quality enhancement filters",
        "Unlimited slide count",
        "Project training session",
        "Email support included"
      ],
      cta: {
        text: "Choose AI Voice",
        href: "/contact?service=diy-ai"
      },
      additionalInfo: "Best value for multiple presentations"
    },
    {
      id: "diy-human-voice",
      name: "DIY License with Human Voice",
      price: "$2,999",
      description: "Premium human voiceover talent",
      features: [
        "PowerPoint to video conversion",
        "Professional human voiceover",
        "Voice talent selection options",
        "Custom branded transitions",
        "Multiple format delivery",
        "Slide timing optimization",
        "Background music integration",
        "Quality enhancement filters",
        "Unlimited slide count",
        "Project training session",
        "Priority phone & email support",
        "Script review and optimization"
      ],
      cta: {
        text: "Choose Human Voice",
        href: "/contact?service=diy-human"
      },
      additionalInfo: "Premium option with personal touch"
    }
  ],
  addOns: [
    {
      name: "Rush Processing",
      price: "+50%",
      description: "1 week delivery for urgent projects",
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: "Advanced Branding Package",
      price: "$499",
      description: "Custom intro/outro animations, advanced transitions, logo animations",
      icon: <Palette className="h-5 w-5" />
    },
    {
      name: "Multi-Language Versions",
      price: "$299 per language",
      description: "Professional translation and native speaker voiceover",
      icon: <Volume2 className="h-5 w-5" />
    },
    {
      name: "Extended Training Session",
      price: "$299",
      description: "2-hour personalized training and best practices workshop",
      icon: <BookOpen className="h-5 w-5" />
    }
  ]
};

const galleryData = {
  title: "DIY License Transformations",
  subtitle: "See how we transform existing PowerPoint presentations into professional video content",
  categories: ["Benefits Overview", "Compliance Training", "Policy Updates", "Employee Handbook"],
  industries: ["Technology", "Healthcare", "Manufacturing", "Education", "Government"],
  items: [
    {
      id: "benefits-overview-diy",
      title: "Benefits Overview Transformation",
      category: "Benefits Overview",
      description: "Converted 45-slide benefits presentation into engaging video with AI voiceover and custom transitions.",
      thumbnail: "/samples/diy-benefits-overview.jpg",
      duration: "8:30",
      industry: "Technology",
      results: [
        { metric: "Engagement Rate", value: "+320%" },
        { metric: "Completion Rate", value: "89%" }
      ],
      tags: ["45 Slides", "AI Voice", "Benefits", "Conversion"]
    },
    {
      id: "compliance-training-diy",
      title: "Compliance Training Modernization",
      category: "Compliance Training",
      description: "Updated dry compliance PowerPoint into dynamic video training with human voiceover and interactive elements.",
      thumbnail: "/samples/diy-compliance.jpg",
      duration: "12:15",
      industry: "Healthcare",
      results: [
        { metric: "Training Completion", value: "+180%" },
        { metric: "Knowledge Retention", value: "+65%" }
      ],
      tags: ["Training", "Human Voice", "Compliance", "Interactive"]
    },
    {
      id: "policy-updates-diy",
      title: "Policy Update Communications",
      category: "Policy Updates",
      description: "Series of policy update presentations converted to video announcements with consistent branding.",
      thumbnail: "/samples/diy-policy.jpg",
      duration: "3:45 each",
      industry: "Manufacturing",
      results: [
        { metric: "Policy Awareness", value: "+150%" },
        { metric: "Employee Questions", value: "-45%" }
      ],
      tags: ["Policy", "Series", "Branding", "Updates"]
    },
    {
      id: "employee-handbook-diy",
      title: "Employee Handbook Modernization",
      category: "Employee Handbook",
      description: "Converted static employee handbook sections into digestible video modules with professional narration.",
      thumbnail: "/samples/diy-handbook.jpg",
      duration: "6:20 per module",
      industry: "Education",
      results: [
        { metric: "Handbook Usage", value: "+280%" },
        { metric: "HR Inquiries", value: "-55%" }
      ],
      tags: ["Handbook", "Modules", "Narration", "HR"]
    },
    {
      id: "safety-training-diy",
      title: "Safety Training Video Series",
      category: "Compliance Training",
      description: "Workplace safety PowerPoints converted to engaging video training with clear visual demonstrations.",
      thumbnail: "/samples/diy-safety.jpg",
      duration: "5:30 each",
      industry: "Manufacturing",
      results: [
        { metric: "Safety Compliance", value: "+92%" },
        { metric: "Incident Reduction", value: "-38%" }
      ],
      tags: ["Safety", "Training", "Visual", "Series"]
    },
    {
      id: "onboarding-series-diy",
      title: "New Employee Onboarding Series",
      category: "Employee Handbook",
      description: "Complete onboarding presentation suite converted to welcoming video series with personal touches.",
      thumbnail: "/samples/diy-onboarding.jpg",
      duration: "4:15 average",
      industry: "Government",
      results: [
        { metric: "Onboarding Satisfaction", value: "4.8/5" },
        { metric: "Time to Productivity", value: "-25%" }
      ],
      tags: ["Onboarding", "Series", "Personal", "Welcome"]
    }
  ]
};

const testimonialsData = {
  title: "DIY License Success Stories",
  subtitle: "Organizations have transformed their existing content into professional videos with remarkable results",
  serviceType: "diy",
  testimonials: [
    {
      id: "maria-manufacturing",
      name: "Maria Santos",
      title: "Training & Development Manager",
      company: "Global Manufacturing Corp",
      companySize: "4,500 employees",
      industry: "Manufacturing",
      service: "diy",
      quote: "We had years of training PowerPoints gathering dust. The DIY license let us convert them all into professional videos. Our training completion rates have never been higher, and employees actually enjoy the content now.",
      rating: 5,
      results: [
        { metric: "Training Completion", value: "+165%", improvement: "+165%" },
        { metric: "Content Engagement", value: "+340%", improvement: "+340%" },
        { metric: "Training Satisfaction", value: "4.7/5", improvement: "+2.1 pts" }
      ],
      featured: true
    },
    {
      id: "james-government",
      name: "James Wilson",
      title: "Communications Director",
      company: "State Department of Education",
      companySize: "2,100 employees",
      industry: "Government",
      service: "diy",
      quote: "The DIY license was perfect for our budget and timeline. We converted our entire employee handbook into video modules. The human voiceover option made it feel personal and professional.",
      rating: 5,
      results: [
        { metric: "Handbook Engagement", value: "+280%", improvement: "+280%" },
        { metric: "Policy Understanding", value: "+75%", improvement: "+75%" }
      ]
    },
    {
      id: "lisa-healthcare",
      name: "Lisa Chen",
      title: "Learning & Development Specialist",
      company: "Regional Medical Network",
      companySize: "3,200 employees",
      industry: "Healthcare",
      service: "diy",
      quote: "We needed to modernize our compliance training fast. The DIY license let us transform 20+ presentations into professional videos in just two weeks. The AI voice quality exceeded our expectations.",
      rating: 5,
      featured: true
    }
  ]
};

const comparisonData = {
  title: "DIY License vs. Traditional Video Production",
  subtitle: "Compare the cost-effectiveness and speed of DIY licenses versus custom video production",
  items: [
    {
      id: "diy-license",
      name: "DIY PowerPoint License",
      price: "$1,999 - $2,999",
      description: "Transform existing presentations",
      recommended: true,
      features: [
        {
          category: "Content Creation",
          items: [
            { name: "Uses Existing Content", included: true },
            { name: "Script Development", included: "Your existing slides" },
            { name: "Visual Design", included: "Enhanced from slides" },
            { name: "Custom Animation", included: "Professional transitions" },
            { name: "Branding Integration", included: "Full branding package" }
          ]
        },
        {
          category: "Production Process",
          items: [
            { name: "Turnaround Time", included: "1-2 weeks" },
            { name: "Revision Rounds", included: "2 rounds included" },
            { name: "Voiceover Options", included: "AI or Human" },
            { name: "Multiple Presentations", included: "Unlimited slides" },
            { name: "Training & Support", included: "Included" }
          ]
        },
        {
          category: "Cost Efficiency",
          items: [
            { name: "Per-Presentation Cost", included: "Fixed license fee" },
            { name: "Volume Discounts", included: "Built-in" },
            { name: "Content ROI", included: "+400%" },
            { name: "Time Savings", included: "Significant" },
            { name: "Resource Utilization", included: "Maximize existing work" }
          ]
        }
      ],
      cta: {
        text: "Get DIY License",
        href: "/contact?service=diy"
      },
      highlights: [
        "Uses your existing content investment",
        "Fastest turnaround time available",
        "Most cost-effective for multiple presentations",
        "Maintains your original messaging"
      ]
    },
    {
      id: "custom-production",
      name: "Custom Video Production",
      price: "$2,499 - $15,000+",
      description: "Built from scratch video creation",
      features: [
        {
          category: "Content Creation",
          items: [
            { name: "Uses Existing Content", included: "Requires adaptation" },
            { name: "Script Development", included: "Full custom writing" },
            { name: "Visual Design", included: "Complete custom design" },
            { name: "Custom Animation", included: "Full custom animation" },
            { name: "Branding Integration", included: "Full branding package" }
          ]
        },
        {
          category: "Production Process",
          items: [
            { name: "Turnaround Time", included: "3-6 weeks" },
            { name: "Revision Rounds", included: "2-3 rounds" },
            { name: "Voiceover Options", included: "Professional talent" },
            { name: "Multiple Presentations", included: "Additional cost each" },
            { name: "Training & Support", included: "Limited" }
          ]
        },
        {
          category: "Cost Efficiency",
          items: [
            { name: "Per-Presentation Cost", included: "High per video" },
            { name: "Volume Discounts", included: "Negotiable" },
            { name: "Content ROI", included: "Variable" },
            { name: "Time Savings", included: "Longer timeline" },
            { name: "Resource Utilization", included: "Starts from zero" }
          ]
        }
      ],
      cta: {
        text: "Custom Production",
        href: "/contact?service=custom"
      }
    },
    {
      id: "in-house-video",
      name: "In-House Video Creation",
      price: "$500 - $5,000+",
      description: "Internal team video production",
      features: [
        {
          category: "Content Creation",
          items: [
            { name: "Uses Existing Content", included: "Yes, but limited" },
            { name: "Script Development", included: "Internal resources" },
            { name: "Visual Design", included: "Limited capabilities" },
            { name: "Custom Animation", included: "Basic transitions" },
            { name: "Branding Integration", included: "Basic" }
          ]
        },
        {
          category: "Production Process",
          items: [
            { name: "Turnaround Time", included: "2-8 weeks" },
            { name: "Revision Rounds", included: "Unlimited" },
            { name: "Voiceover Options", included: "Internal or outsourced" },
            { name: "Multiple Presentations", included: "Time-intensive" },
            { name: "Training & Support", included: "Self-managed" }
          ]
        },
        {
          category: "Cost Efficiency",
          items: [
            { name: "Per-Presentation Cost", included: "Staff time cost" },
            { name: "Volume Discounts", included: "N/A" },
            { name: "Content ROI", included: "Highly variable" },
            { name: "Time Savings", included: "Requires learning curve" },
            { name: "Resource Utilization", included: "Depends on skills" }
          ]
        }
      ],
      cta: {
        text: "DIY Internal",
        href: "#"
      }
    }
  ]
};

const specsData = {
  title: "DIY License Technical Specifications",
  subtitle: "Professional video conversion process with industry-standard output quality",
  serviceType: "DIY PowerPoint License",
  categories: [
    {
      id: "input",
      name: "Input Requirements",
      icon: <Upload className="h-5 w-5" />,
      specs: [
        { name: "File Format", value: ".PPTX or .PPT", description: "PowerPoint files in standard format", highlight: true },
        { name: "Slide Limit", value: "Unlimited", description: "No restrictions on number of slides" },
        { name: "File Size", value: "Up to 500MB", description: "Large presentations supported" },
        { name: "Content Types", value: "Text, Images, Charts", description: "Standard PowerPoint elements supported" }
      ]
    },
    {
      id: "processing",
      name: "Conversion Process",
      icon: <Settings className="h-5 w-5" />,
      specs: [
        { name: "Video Resolution", value: "1920×1080 (Full HD)", description: "Professional broadcast quality output", highlight: true },
        { name: "Slide Timing", value: "Optimized", description: "Intelligent timing based on content length" },
        { name: "Transitions", value: "Professional", description: "Smooth, branded transitions between slides" },
        { name: "Audio Quality", value: "48kHz/24-bit", description: "Professional audio recording standards" }
      ]
    },
    {
      id: "output",
      name: "Video Output",
      icon: <Monitor className="h-5 w-5" />,
      specs: [
        { name: "Video Formats", value: "MP4, MOV, AVI", description: "Multiple formats for different use cases", highlight: true },
        { name: "Compression", value: "H.264", description: "Optimal quality-to-size ratio" },
        { name: "Aspect Ratio", value: "16:9 Standard", description: "Widescreen format for professional presentation" },
        { name: "Closed Captions", value: "Available", description: "Optional subtitle track generation" }
      ]
    }
  ],
  deliveryFormats: [
    { name: "Web Optimized", resolution: "1920×1080", size: "50-100 MB", purpose: "Website embedding, online sharing" },
    { name: "Presentation Quality", resolution: "1920×1080", size: "100-200 MB", purpose: "High-quality presentations" },
    { name: "Email Friendly", resolution: "1280×720", size: "25-50 MB", purpose: "Email distribution, mobile viewing" },
    { name: "Social Media", resolution: "1080×1080", size: "30-60 MB", purpose: "LinkedIn, social platforms" }
  ],
  qualityStandards: [
    { 
      standard: "Professional Voice Quality", 
      description: "AI voices trained on professional speakers, human voices recorded in broadcast-quality studios",
      icon: <Volume2 className="h-6 w-6" />
    },
    {
      standard: "Brand Consistency",
      description: "Your brand colors, fonts, and logo integrated throughout the video with professional styling",
      icon: <Palette className="h-6 w-6" />
    },
    {
      standard: "Content Optimization", 
      description: "Slide content optimized for video format with improved readability and visual flow",
      icon: <Presentation className="h-6 w-6" />
    }
  ],
  technicalRequirements: [
    {
      category: "Content Preparation",
      requirements: [
        "PowerPoint files in .PPTX or .PPT format",
        "High-resolution images and logos",
        "Final approved content (minimal changes after conversion)",
        "Brand guidelines for colors, fonts, and styling",
        "Voice preference (AI selection or human voice requirements)"
      ]
    },
    {
      category: "Project Setup",
      requirements: [
        "Content review and approval process defined",
        "Timeline expectations established",
        "Delivery format preferences specified",
        "Distribution channel requirements",
        "Training session scheduling (if needed)"
      ]
    }
  ]
};

export default function DIYLicensesPage() {
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