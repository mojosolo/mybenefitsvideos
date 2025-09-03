export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  implementation: string;
  results: {
    engagement: string;
    enrollment: string;
    satisfaction: string;
    roi: string;
    additional?: string;
    metrics: {
      engagementPercent: number;
      enrollmentPercent: number;
      roiPercent: number;
      satisfactionScore: number;
    };
  };
  services: string[];
  videoTypes: string[];
  timeline: string;
  employeeCount: string;
  companySize: 'Small' | 'Mid-market' | 'Enterprise';
  quote: string;
  quotePerson: string;
  quoteTitle: string;
  videoThumbnail: string;
  tags: string[];
  featured: boolean;
  dateCompleted: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  testimonials?: {
    quote: string;
    person: string;
    title: string;
  }[];
  relatedCaseStudies?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "techcorp-transformation",
    title: "TechCorp's Benefits Transformation",
    client: "TechCorp Solutions",
    industry: "Technology",
    challenge: "Low benefits enrollment (32%) and constant HR questions about healthcare options. Employees found benefits guide confusing and overwhelming, leading to poor decision-making.",
    solution: "Created engaging 2-minute Foundation video breaking down healthcare options with visual comparisons, plus 1-minute Teaser for enrollment campaign.",
    implementation: "Deployed videos through employee portal, email campaigns, and manager toolkits. Added QR codes for mobile access during all-hands meetings.",
    results: {
      engagement: "285% increase",
      enrollment: "72% enrollment improvement", 
      satisfaction: "4.8/5 employee rating",
      roi: "420% ROI",
      additional: "60% reduction in HR support calls",
      metrics: {
        engagementPercent: 285,
        enrollmentPercent: 172,
        roiPercent: 420,
        satisfactionScore: 4.8
      }
    },
    services: ["Foundation Video", "Teaser Video"],
    videoTypes: ["Foundation", "Teaser"],
    timeline: "3 weeks",
    employeeCount: "1,200",
    companySize: "Enterprise",
    quote: "Our employees finally understand their benefits. The video made everything crystal clear and enrollment rates skyrocketed.",
    quotePerson: "Sarah Johnson",
    quoteTitle: "HR Director",
    videoThumbnail: "/dashboard.png",
    tags: ["Healthcare", "High ROI", "Large Company"],
    featured: true,
    dateCompleted: "2024-11-15",
    beforeAfter: {
      before: "32% benefits enrollment rate with constant HR confusion",
      after: "87% enrollment rate with streamlined communication"
    }
  },
  {
    id: "healthplus-multilingual",
    title: "HealthPlus Multilingual Success",
    client: "HealthPlus Medical Group", 
    industry: "Healthcare",
    challenge: "Diverse workforce with 40% non-English speakers struggled with benefits enrollment. Compliance issues with multilingual requirements and cultural barriers to engagement.",
    solution: "Foundation video in English, Spanish, and Mandarin with cultural adaptations. Custom microsite with language switching and interactive tools.",
    implementation: "Culturally adapted content for each language, integrated with existing HRIS, mobile-optimized for frontline healthcare workers.",
    results: {
      engagement: "340% boost",
      enrollment: "95% enrollment across languages",
      satisfaction: "Compliance issues eliminated",
      roi: "380% ROI",
      additional: "Recognition as diversity leader",
      metrics: {
        engagementPercent: 340,
        enrollmentPercent: 195,
        roiPercent: 380,
        satisfactionScore: 4.9
      }
    },
    services: ["Foundation Video", "Multi-Language", "Custom Microsite"],
    videoTypes: ["Foundation", "Microsite"],
    timeline: "5 weeks",
    employeeCount: "800",
    companySize: "Mid-market",
    quote: "Having benefits videos in our employees' native languages showed we truly value our diverse workforce.",
    quotePerson: "Maria Rodriguez",
    quoteTitle: "Chief HR Officer",
    videoThumbnail: "/dashboard.png",
    tags: ["Multi-language", "Healthcare", "Diversity"],
    featured: true,
    dateCompleted: "2024-10-22",
    beforeAfter: {
      before: "Language barriers creating compliance issues",
      after: "Seamless multilingual enrollment process"
    }
  },
  {
    id: "financemax-rush",
    title: "FinanceMax Rush Delivery Success",
    client: "FinanceMax Corporation",
    industry: "Financial Services",
    challenge: "Last-minute benefits provider change left only 10 days before open enrollment. Needed immediate communication to 2,000+ employees about complex financial products.",
    solution: "Rush delivery of Foundation video highlighting new provider benefits, plus emergency email campaign with Teaser video for urgency.",
    implementation: "24/7 production schedule, expedited review process, multi-channel deployment including mobile push notifications.",
    results: {
      engagement: "290% improvement",
      enrollment: "On-time enrollment achieved", 
      satisfaction: "Crisis management success",
      roi: "518% ROI",
      additional: "Seamless provider transition",
      metrics: {
        engagementPercent: 290,
        enrollmentPercent: 189,
        roiPercent: 518,
        satisfactionScore: 4.6
      }
    },
    services: ["Foundation Video", "Teaser Video", "Rush Delivery"],
    videoTypes: ["Foundation", "Teaser"],
    timeline: "10 days",
    employeeCount: "2,100", 
    companySize: "Enterprise",
    quote: "Mojo Solo saved our open enrollment when everything went wrong. Their rush service was a lifesaver.",
    quotePerson: "David Chen",
    quoteTitle: "Benefits Manager",
    videoThumbnail: "/dashboard.png",
    tags: ["Rush Delivery", "Financial", "Crisis Management"],
    featured: false,
    dateCompleted: "2024-09-08",
    beforeAfter: {
      before: "10-day crisis with provider change",
      after: "Successful transition with high engagement"
    }
  },
  {
    id: "retailmax-seasonal",
    title: "RetailMax Seasonal Workforce Solution",
    client: "RetailMax Stores",
    industry: "Retail",
    challenge: "High employee turnover and seasonal workers needed quick benefits onboarding. Traditional methods too time-consuming for fast-paced retail environment.",
    solution: "DIY PowerPoint license to convert existing training materials, plus short Foundation videos for new hire orientation kiosks.",
    implementation: "Deployed across 150 store locations with QR codes at employee kiosks, integrated with point-of-sale training systems.",
    results: {
      engagement: "260% increase",
      enrollment: "Faster benefit decisions",
      satisfaction: "Streamlined HR process",
      roi: "315% ROI",
      additional: "40% reduction in onboarding time",
      metrics: {
        engagementPercent: 260,
        enrollmentPercent: 145,
        roiPercent: 315,
        satisfactionScore: 4.3
      }
    },
    services: ["DIY License", "Foundation Video"],
    videoTypes: ["Foundation", "DIY"],
    timeline: "2 weeks",
    employeeCount: "5,000+",
    companySize: "Enterprise",
    quote: "Perfect solution for our high-turnover environment. Videos work great at our orientation kiosks.",
    quotePerson: "Jennifer Walsh",
    quoteTitle: "HR Operations Manager", 
    videoThumbnail: "/dashboard.png",
    tags: ["DIY License", "Retail", "High Volume"],
    featured: false,
    dateCompleted: "2024-12-03",
    beforeAfter: {
      before: "Time-consuming onboarding for seasonal staff",
      after: "Automated video-based orientation system"
    }
  },
  {
    id: "startup-growth",
    title: "GrowthStart's First Benefits Program Launch",
    client: "GrowthStart Analytics",
    industry: "Technology Startup",
    challenge: "Fast-growing startup introducing first formal benefits program. Young workforce unfamiliar with healthcare options and retirement planning concepts.",
    solution: "Educational Foundation video explaining benefits basics, plus interactive microsite with comparison tools and enrollment links.",
    implementation: "Integrated with Slack for easy access, created mobile-first experience for remote team, added gamification elements.",
    results: {
      engagement: "420% engagement boost",
      enrollment: "96% participation rate",
      satisfaction: "Employee-centric positioning",
      roi: "495% ROI",
      additional: "Recruitment competitive advantage",
      metrics: {
        engagementPercent: 420,
        enrollmentPercent: 196,
        roiPercent: 495,
        satisfactionScore: 4.7
      }
    },
    services: ["Foundation Video", "Custom Microsite"],
    videoTypes: ["Foundation", "Microsite"],
    timeline: "4 weeks", 
    employeeCount: "150",
    companySize: "Small",
    quote: "As a young company, we needed to educate our team about benefits. The video made us look professional and caring.",
    quotePerson: "Alex Kim",
    quoteTitle: "People Operations Lead",
    videoThumbnail: "/dashboard.png",
    tags: ["Startup", "Education", "First Program"],
    featured: false,
    dateCompleted: "2024-08-19",
    beforeAfter: {
      before: "No formal benefits communication strategy",
      after: "Professional, engaging benefits education system"
    }
  },
  {
    id: "manufacturing-safety",
    title: "SafetyFirst Manufacturing Benefits Communication",
    client: "SafetyFirst Industries",
    industry: "Manufacturing",
    challenge: "Blue-collar workforce with limited computer access needed mobile-friendly benefits communication for safety-focused benefits and workers' compensation.",
    solution: "Mobile-optimized Foundation video highlighting safety benefits and workers' comp, deployed via QR codes in break rooms and mobile app.",
    implementation: "Plant floor deployment with tablet stations, multilingual subtitles, safety-focused messaging aligned with company culture.",
    results: {
      engagement: "275% improvement",
      enrollment: "Enhanced safety awareness",
      satisfaction: "Accessible to all workers", 
      roi: "340% ROI",
      additional: "Reduced workplace incidents",
      metrics: {
        engagementPercent: 275,
        enrollmentPercent: 155,
        roiPercent: 340,
        satisfactionScore: 4.4
      }
    },
    services: ["Foundation Video", "Mobile Optimization"],
    videoTypes: ["Foundation"],
    timeline: "3 weeks",
    employeeCount: "900",
    companySize: "Mid-market",
    quote: "QR codes in break rooms made benefits accessible to our entire workforce, even those without desk jobs.",
    quotePerson: "Mike Patterson", 
    quoteTitle: "Safety & Benefits Coordinator",
    videoThumbnail: "/dashboard.png", 
    tags: ["Manufacturing", "Mobile", "Blue Collar"],
    featured: false,
    dateCompleted: "2024-07-14",
    beforeAfter: {
      before: "Limited access for non-desk workers",
      after: "Universal mobile access via QR codes"
    }
  },
  {
    id: "university-system",
    title: "University System Benefits Modernization",
    client: "Metro University System",
    industry: "Education",
    challenge: "Complex academic calendar with faculty, staff, and adjuncts having different benefit periods. Multiple union requirements and diverse educational backgrounds.",
    solution: "Comprehensive Foundation video series targeting different employee types, plus interactive microsite with role-based navigation.",
    implementation: "Academic year deployment with department-specific rollouts, integration with existing education portals, accessibility compliance for diverse needs.",
    results: {
      engagement: "315% participation increase",
      enrollment: "Streamlined multi-union process",
      satisfaction: "Eliminated compliance issues",
      roi: "385% ROI", 
      additional: "Model for other university systems",
      metrics: {
        engagementPercent: 315,
        enrollmentPercent: 178,
        roiPercent: 385,
        satisfactionScore: 4.6
      }
    },
    services: ["Foundation Video Series", "Custom Microsite", "Accessibility"],
    videoTypes: ["Foundation", "Microsite"],
    timeline: "6 weeks",
    employeeCount: "2,000",
    companySize: "Enterprise",
    quote: "Finally, a benefits communication system that works for our complex academic environment and diverse workforce.",
    quotePerson: "Dr. Patricia Williams",
    quoteTitle: "Director of Human Resources",
    videoThumbnail: "/dashboard.png",
    tags: ["Education", "Multi-Union", "Accessibility"],
    featured: true,
    dateCompleted: "2024-06-30",
    beforeAfter: {
      before: "Complex multi-union communication challenges",
      after: "Streamlined role-based benefits education"
    }
  },
  {
    id: "city-municipality",
    title: "City Municipality Digital Transformation",
    client: "Metro City Government",
    industry: "Government",
    challenge: "Public sector employees across multiple departments with varying tech literacy. Required accessibility compliance and multilingual support.",
    solution: "Government-focused Foundation video with accessibility features, plus simplified microsite meeting ADA requirements and multiple language options.",
    implementation: "Phased rollout across departments, accessibility testing, integration with existing government systems, compliance verification.",
    results: {
      engagement: "290% comprehension improvement",
      enrollment: "ADA compliance achieved",
      satisfaction: "Cross-department success",
      roi: "295% ROI",
      additional: "Model for other municipalities",
      metrics: {
        engagementPercent: 290,
        enrollmentPercent: 165,
        roiPercent: 295,
        satisfactionScore: 4.5
      }
    },
    services: ["Foundation Video", "Accessibility Features", "Government Compliance"],
    videoTypes: ["Foundation", "Microsite"],
    timeline: "8 weeks",
    employeeCount: "600",
    companySize: "Mid-market",
    quote: "Our employees across all departments finally have clear, accessible benefits information that meets all compliance requirements.",
    quotePerson: "Robert Martinez",
    quoteTitle: "Human Resources Director",
    videoThumbnail: "/dashboard.png",
    tags: ["Government", "ADA Compliance", "Public Sector"],
    featured: false,
    dateCompleted: "2024-05-18",
    beforeAfter: {
      before: "Compliance challenges with accessibility",
      after: "Fully compliant multi-department system"
    }
  },
  {
    id: "professional-services",
    title: "Professional Services Firm Benefits Excellence",
    client: "Apex Consulting Group",
    industry: "Professional Services",
    challenge: "Small professional services firm competing for top talent needed sophisticated benefits communication to attract and retain high-caliber consultants.",
    solution: "Premium Foundation video showcasing comprehensive benefits package, plus elegant microsite with detailed comparisons and ROI calculators.",
    implementation: "Executive-level messaging, integration with recruiting process, mobile-optimized for busy consultants, social sharing features.",
    results: {
      engagement: "518% ROI achievement",
      enrollment: "100% consultant participation",
      satisfaction: "Recruitment advantage gained",
      roi: "518% ROI",
      additional: "Reduced turnover by 35%",
      metrics: {
        engagementPercent: 485,
        enrollmentPercent: 200,
        roiPercent: 518,
        satisfactionScore: 4.9
      }
    },
    services: ["Foundation Video", "Premium Microsite", "ROI Calculators"],
    videoTypes: ["Foundation", "Microsite"],
    timeline: "4 weeks",
    employeeCount: "75",
    companySize: "Small",
    quote: "The video quality and sophistication perfectly represents our firm's commitment to excellence. It's become a key recruiting tool.",
    quotePerson: "Elizabeth Harrison",
    quoteTitle: "Managing Partner",
    videoThumbnail: "/dashboard.png",
    tags: ["Professional Services", "Premium", "Recruitment"],
    featured: true,
    dateCompleted: "2024-04-12",
    beforeAfter: {
      before: "Generic benefits communication",
      after: "Premium, recruitment-focused benefits showcase"
    }
  }
];

export const industries = [
  "All", 
  "Technology", 
  "Healthcare", 
  "Financial Services", 
  "Retail", 
  "Manufacturing", 
  "Technology Startup", 
  "Education",
  "Government",
  "Professional Services"
];

export const companySizes = [
  "All",
  "Small (50-200)",
  "Mid-market (200-500)", 
  "Enterprise (500+)"
];

export const videoTypes = [
  "All",
  "Foundation",
  "Teaser", 
  "Microsite",
  "DIY"
];

export const services = [
  "All", 
  "Foundation Video", 
  "Teaser Video", 
  "Custom Microsite", 
  "Multi-Language", 
  "DIY License", 
  "Rush Delivery",
  "Foundation Video Series",
  "Accessibility Features",
  "Government Compliance",
  "Premium Microsite",
  "ROI Calculators",
  "Mobile Optimization"
];

export const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'roi-desc', label: 'Highest ROI' },
  { value: 'engagement-desc', label: 'Highest Engagement' },
  { value: 'date-desc', label: 'Most Recent' },
  { value: 'company-size-desc', label: 'Largest Companies' },
  { value: 'timeline-asc', label: 'Fastest Delivery' }
];