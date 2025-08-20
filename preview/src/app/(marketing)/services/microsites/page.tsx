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
  Monitor, 
  Clock, 
  Globe, 
  TrendingUp,
  Smartphone,
  FileType,
  Volume2,
  Palette,
  Shield,
  Zap,
  Award,
  Calculator,
  Download,
  BarChart3,
  Search,
  Users,
  Link,
  Settings
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Custom Microsites - Interactive Benefits Landing Pages",
  description: "Comprehensive benefits hubs featuring your videos plus interactive tools, calculators, and resources. Custom responsive design with SEO optimization. $4,999 standalone, $3,999 bundled.",
  keywords: ["benefits microsite", "benefits portal", "interactive benefits", "benefits hub", "custom landing page", "benefits website"],
});

// Sample data for Microsites
const heroData = {
  title: "Custom Microsites",
  subtitle: "Interactive landing pages that complement your videos",
  description: "Custom-built landing pages featuring your videos plus interactive tools, calculators, and resources that enhance the benefits experience. Provides a comprehensive hub for all benefits communication.",
  price: "$4,999 standalone / $3,999 bundled",
  duration: "Interactive experience",
  timeline: "4-5 weeks",
  icon: <Monitor className="h-8 w-8" />,
  features: [
    "Custom responsive web design",
    "Video integration and hosting",
    "Interactive benefit calculators",
    "Downloadable resources section"
  ],
  keyStats: [
    { label: "Time on Site", value: "+340%", icon: <Clock className="h-5 w-5" /> },
    { label: "Resource Downloads", value: "+180%", icon: <Download className="h-5 w-5" /> },
    { label: "Calculator Usage", value: "78%", icon: <Calculator className="h-5 w-5" /> }
  ],
  popular: false,
  ctaPrimary: {
    text: "Design Your Microsite",
    href: "/contact"
  },
  ctaSecondary: {
    text: "Explore Examples",
    href: "#gallery"
  }
};

const pricingData = {
  title: "Microsite Investment Options",
  subtitle: "Professional web development with ongoing hosting and maintenance included for the first year.",
  calculator: {
    enabled: false,
    basePrice: 0
  },
  options: [
    {
      id: "microsite-bundled",
      name: "Bundled with Foundation Video",
      price: "$3,999",
      originalPrice: "$4,999",
      badge: "Save $1,000",
      badgeColor: "green",
      description: "Best value when paired with video",
      popular: true,
      features: [
        "Custom responsive web design",
        "Foundation video integration",
        "Interactive benefit calculators",
        "Downloadable resources library",
        "Contact forms and support links",
        "SEO optimization included",
        "1 year hosting and SSL included",
        "Google Analytics setup",
        "Mobile-first responsive design",
        "Content management training"
      ],
      cta: {
        text: "Bundle and Save",
        href: "/contact?service=microsite-bundle"
      },
      additionalInfo: "Requires Foundation Video purchase"
    },
    {
      id: "microsite-standalone",
      name: "Standalone Microsite",
      price: "$4,999",
      description: "Complete benefits hub solution",
      features: [
        "Custom responsive web design",
        "Video placeholder integration",
        "Interactive benefit calculators",
        "Downloadable resources library",
        "Contact forms and support links",
        "Advanced SEO optimization",
        "1 year hosting and SSL included",
        "Google Analytics setup",
        "Mobile-first responsive design",
        "Content management training",
        "Social media integration",
        "Advanced form capabilities"
      ],
      cta: {
        text: "Build Standalone Site",
        href: "/contact?service=microsite-standalone"
      },
      additionalInfo: "Can integrate videos later"
    }
  ],
  addOns: [
    {
      name: "Advanced Analytics",
      price: "$499",
      description: "Detailed user behavior tracking and reporting dashboard",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      name: "Multi-Language Support",
      price: "$799",
      description: "Additional language versions with professional translation",
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: "Advanced Calculators",
      price: "$299 each",
      description: "Custom ROI calculators, savings estimators, comparison tools",
      icon: <Calculator className="h-5 w-5" />
    },
    {
      name: "Extended Hosting",
      price: "$299/year",
      description: "Continued hosting, SSL, and maintenance after first year",
      icon: <Shield className="h-5 w-5" />
    }
  ]
};

const galleryData = {
  title: "Microsite Portfolio",
  subtitle: "Interactive benefits hubs that engage employees and streamline benefits communication",
  categories: ["Complete Portal", "Open Enrollment", "Wellness Hub", "New Hire Center"],
  industries: ["Technology", "Healthcare", "Manufacturing", "Education", "Finance"],
  items: [
    {
      id: "complete-portal",
      title: "Complete Benefits Portal",
      category: "Complete Portal",
      description: "Comprehensive hub with video library, interactive calculators, and resource center for 3,000+ employee organization.",
      thumbnail: "/samples/complete-portal.jpg",
      duration: "Multi-page site",
      industry: "Technology",
      results: [
        { metric: "Site Engagement", value: "+285%" },
        { metric: "Resource Downloads", value: "+450%" }
      ],
      tags: ["Video Library", "Calculators", "Resources", "Multi-page"]
    },
    {
      id: "oe-hub",
      title: "Open Enrollment Command Center",
      category: "Open Enrollment",
      description: "Dedicated open enrollment site with countdown timers, decision tools, and step-by-step enrollment guide.",
      thumbnail: "/samples/oe-hub.jpg",
      duration: "Campaign site",
      industry: "Healthcare",
      results: [
        { metric: "On-time Enrollment", value: "+65%" },
        { metric: "Decision Tool Usage", value: "89%" }
      ],
      tags: ["Countdown", "Decision Tools", "Step-by-step", "Campaign"]
    },
    {
      id: "wellness-center",
      title: "Employee Wellness Hub",
      category: "Wellness Hub",
      description: "Interactive wellness center with program information, sign-up forms, and progress tracking tools.",
      thumbnail: "/samples/wellness-hub.jpg",
      duration: "Interactive portal",
      industry: "Manufacturing",
      results: [
        { metric: "Program Participation", value: "+120%" },
        { metric: "Health Score Improvements", value: "+35%" }
      ],
      tags: ["Wellness", "Programs", "Sign-up", "Tracking"]
    },
    {
      id: "new-hire-center",
      title: "New Employee Resource Center",
      category: "New Hire Center",
      description: "Onboarding hub with benefits videos, forms, checklists, and first-day preparation materials.",
      thumbnail: "/samples/new-hire-center.jpg",
      duration: "Onboarding portal",
      industry: "Education",
      results: [
        { metric: "Onboarding Completion", value: "+92%" },
        { metric: "Time to Enrollment", value: "-40%" }
      ],
      tags: ["Onboarding", "Forms", "Checklists", "First Day"]
    },
    {
      id: "retirement-center",
      title: "Retirement Planning Center",
      category: "Complete Portal",
      description: "Specialized site focusing on retirement benefits with calculators, educational videos, and planning tools.",
      thumbnail: "/samples/retirement-center.jpg",
      duration: "Planning portal",
      industry: "Finance",
      results: [
        { metric: "401k Participation", value: "+58%" },
        { metric: "Planning Tool Usage", value: "94%" }
      ],
      tags: ["Retirement", "401k", "Planning", "Calculators"]
    },
    {
      id: "benefits-comparison",
      title: "Interactive Benefits Comparison",
      category: "Open Enrollment",
      description: "Side-by-side plan comparison tool with cost calculators and personalized recommendations.",
      thumbnail: "/samples/comparison-site.jpg",
      duration: "Decision tool",
      industry: "Technology",
      results: [
        { metric: "Decision Confidence", value: "+75%" },
        { metric: "Plan Selection Speed", value: "+60%" }
      ],
      tags: ["Comparison", "Cost Calculator", "Recommendations", "Decision"]
    }
  ]
};

const testimonialsData = {
  title: "Microsite Success Stories",
  subtitle: "Custom benefits microsites have transformed how organizations engage with their employees",
  serviceType: "microsite",
  testimonials: [
    {
      id: "david-tech",
      name: "David Park",
      title: "Director of People Experience",
      company: "InnovateTech Solutions",
      companySize: "2,800 employees",
      industry: "Technology",
      service: "microsite",
      quote: "Our benefits microsite became the go-to resource for everything benefits-related. Employees love the calculators and the integration with our foundation videos. It's reduced our HR support burden significantly.",
      rating: 5,
      results: [
        { metric: "HR Support Tickets", value: "-72%", improvement: "-72%" },
        { metric: "Employee Self-Service", value: "+340%", improvement: "+340%" },
        { metric: "Benefits Satisfaction", value: "4.6/5", improvement: "+1.4 pts" }
      ],
      featured: true
    },
    {
      id: "rachel-healthcare",
      name: "Rachel Thompson",
      title: "Benefits Communication Manager",
      company: "Metro Health System",
      companySize: "6,200 employees",
      industry: "Healthcare",
      service: "microsite",
      quote: "The microsite transformed our open enrollment process. The interactive tools helped employees make better decisions, and we saw our highest participation rates ever.",
      rating: 5,
      results: [
        { metric: "Open Enrollment Participation", value: "+45%", improvement: "+45%" },
        { metric: "Decision Tool Usage", value: "87%", improvement: "New feature" }
      ]
    },
    {
      id: "carlos-manufacturing",
      name: "Carlos Rivera",
      title: "HR Communications Lead",
      company: "Precision Manufacturing Group",
      companySize: "1,900 employees",
      industry: "Manufacturing",
      service: "microsite",
      quote: "Having everything in one place has been a game-changer. Our employees can access benefits information, watch videos, and use calculators all from their phones. Engagement is through the roof.",
      rating: 5,
      featured: true
    }
  ]
};

const comparisonData = {
  title: "Microsite vs. Traditional Benefits Communication",
  subtitle: "See how interactive microsites outperform static benefits portals and documentation",
  items: [
    {
      id: "custom-microsite",
      name: "Custom Microsite",
      price: "$3,999-$4,999",
      description: "Interactive, branded benefits hub",
      recommended: true,
      features: [
        {
          category: "User Experience",
          items: [
            { name: "Mobile Optimization", included: true },
            { name: "Interactive Elements", included: true },
            { name: "Video Integration", included: true },
            { name: "Search Functionality", included: true },
            { name: "User-Friendly Navigation", included: "Custom designed" }
          ]
        },
        {
          category: "Features & Tools",
          items: [
            { name: "Benefit Calculators", included: "Multiple tools" },
            { name: "Resource Downloads", included: "Organized library" },
            { name: "Contact Forms", included: "Custom forms" },
            { name: "Social Integration", included: true },
            { name: "Analytics Tracking", included: "Detailed insights" }
          ]
        },
        {
          category: "Technical Specs",
          items: [
            { name: "Hosting Included", included: "1 year" },
            { name: "SSL Certificate", included: true },
            { name: "SEO Optimization", included: "Advanced" },
            { name: "Content Management", included: "Easy updates" },
            { name: "Backup & Security", included: "Automated" }
          ]
        }
      ],
      cta: {
        text: "Build Custom Microsite",
        href: "/contact?service=microsite"
      },
      highlights: [
        "Highest engagement rates",
        "Professional design and branding",
        "Interactive tools and calculators",
        "Mobile-first responsive design"
      ]
    },
    {
      id: "intranet-portal",
      name: "Intranet Portal",
      price: "$2,000-$5,000+",
      description: "Internal company portal solution",
      features: [
        {
          category: "User Experience",
          items: [
            { name: "Mobile Optimization", included: "Limited" },
            { name: "Interactive Elements", included: "Basic" },
            { name: "Video Integration", included: "Upload only" },
            { name: "Search Functionality", included: "Basic" },
            { name: "User-Friendly Navigation", included: "Standard template" }
          ]
        },
        {
          category: "Features & Tools",
          items: [
            { name: "Benefit Calculators", included: false },
            { name: "Resource Downloads", included: "File list" },
            { name: "Contact Forms", included: "Basic forms" },
            { name: "Social Integration", included: false },
            { name: "Analytics Tracking", included: "Basic page views" }
          ]
        },
        {
          category: "Technical Specs",
          items: [
            { name: "Hosting Included", included: "Varies" },
            { name: "SSL Certificate", included: "Usually" },
            { name: "SEO Optimization", included: "Basic" },
            { name: "Content Management", included: "Complex admin" },
            { name: "Backup & Security", included: "Your responsibility" }
          ]
        }
      ],
      cta: {
        text: "Standard Portal",
        href: "#"
      }
    },
    {
      id: "static-website",
      name: "Static Benefits Site",
      price: "$500-$2,000",
      description: "Basic informational website",
      features: [
        {
          category: "User Experience",
          items: [
            { name: "Mobile Optimization", included: "Basic responsive" },
            { name: "Interactive Elements", included: false },
            { name: "Video Integration", included: "Embedded only" },
            { name: "Search Functionality", included: false },
            { name: "User-Friendly Navigation", included: "Simple menu" }
          ]
        },
        {
          category: "Features & Tools",
          items: [
            { name: "Benefit Calculators", included: false },
            { name: "Resource Downloads", included: "Link list" },
            { name: "Contact Forms", included: "Basic contact" },
            { name: "Social Integration", included: false },
            { name: "Analytics Tracking", included: "Google Analytics" }
          ]
        },
        {
          category: "Technical Specs",
          items: [
            { name: "Hosting Included", included: "Usually 1 year" },
            { name: "SSL Certificate", included: "Basic" },
            { name: "SEO Optimization", included: "Minimal" },
            { name: "Content Management", included: "Developer needed" },
            { name: "Backup & Security", included: "Basic" }
          ]
        }
      ],
      cta: {
        text: "Basic Site",
        href: "#"
      }
    }
  ]
};

const specsData = {
  title: "Microsite Technical Specifications",
  subtitle: "Professional web development with modern technologies and best practices",
  serviceType: "Custom Microsites",
  categories: [
    {
      id: "design",
      name: "Design & UX",
      icon: <Palette className="h-5 w-5" />,
      specs: [
        { name: "Responsive Design", value: "Mobile-First", description: "Optimized for all device sizes with touch-friendly interfaces", highlight: true },
        { name: "Brand Integration", value: "Full Custom", description: "Complete brand alignment with your colors, fonts, and visual identity" },
        { name: "User Experience", value: "Intuitive Navigation", description: "Clear information architecture and user journey design" },
        { name: "Accessibility", value: "WCAG 2.1 AA", description: "Compliant with web accessibility standards" }
      ]
    },
    {
      id: "development",
      name: "Development Stack",
      icon: <Settings className="h-5 w-5" />,
      specs: [
        { name: "Framework", value: "Modern Web Standards", description: "Built with HTML5, CSS3, and JavaScript for optimal performance", highlight: true },
        { name: "Content Management", value: "Easy Updates", description: "User-friendly admin interface for content updates" },
        { name: "Performance", value: "Fast Loading", description: "Optimized for speed with compressed assets and efficient code" },
        { name: "Browser Support", value: "Cross-Browser", description: "Compatible with all modern browsers including mobile browsers" }
      ]
    },
    {
      id: "hosting",
      name: "Hosting & Security",
      icon: <Shield className="h-5 w-5" />,
      specs: [
        { name: "Hosting", value: "Premium Hosting", description: "Fast, reliable hosting with 99.9% uptime guarantee", highlight: true },
        { name: "SSL Certificate", value: "Included", description: "Secure HTTPS connection for all site interactions" },
        { name: "Backup System", value: "Daily Automated", description: "Automatic daily backups with easy restoration options" },
        { name: "Security Monitoring", value: "24/7 Protection", description: "Continuous security monitoring and threat protection" }
      ]
    }
  ],
  deliveryFormats: [
    { name: "Desktop Experience", resolution: "1920×1080+", size: "Full Site", purpose: "Complete desktop functionality" },
    { name: "Tablet Optimized", resolution: "1024×768", size: "Responsive", purpose: "Touch-friendly tablet interface" },
    { name: "Mobile Experience", resolution: "375×667", size: "Mobile-First", purpose: "Optimized smartphone experience" },
    { name: "Print Styles", resolution: "8.5×11", size: "PDF Ready", purpose: "Clean printable versions of key pages" }
  ],
  qualityStandards: [
    { 
      standard: "Professional Web Development", 
      description: "Clean, maintainable code following industry best practices and modern web standards",
      icon: <Monitor className="h-6 w-6" />
    },
    {
      standard: "User Experience Focus",
      description: "Intuitive navigation and user interface design optimized for benefits communication",
      icon: <Users className="h-6 w-6" />
    },
    {
      standard: "Performance Optimization", 
      description: "Fast loading times and smooth interactions across all devices and connection speeds",
      icon: <Zap className="h-6 w-6" />
    }
  ],
  technicalRequirements: [
    {
      category: "Content & Assets",
      requirements: [
        "Benefits information and documentation",
        "Brand guidelines and visual assets",
        "Video files (if applicable)",
        "Existing forms and calculator requirements",
        "Contact information and support details"
      ]
    },
    {
      category: "Technical Setup",
      requirements: [
        "Domain name (can assist with purchase)",
        "Preferred hosting region/location",
        "Integration requirements (HR systems, etc.)",
        "Analytics and tracking preferences",
        "Content management access requirements"
      ]
    }
  ]
};

export default function MicrositesPage() {
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