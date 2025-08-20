"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CaseStudyCard from "@/components/ui/case-study-card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Filter,
  TrendingUp,
  Users,
  Award,
  PlayCircle,
  ArrowRight
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    engagement: string;
    enrollment: string;
    satisfaction: string;
    additional?: string;
  };
  services: string[];
  timeline: string;
  employeeCount: string;
  quote: string;
  quotePerson: string;
  quoteTitle: string;
  videoThumbnail: string;
  tags: string[];
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "techcorp-transformation",
    title: "TechCorp's Benefits Transformation",
    client: "TechCorp Solutions",
    industry: "Technology",
    challenge: "Low benefits enrollment (32%) and constant HR questions about healthcare options. Employees found benefits guide confusing and overwhelming.",
    solution: "Created engaging 2-minute Foundation video breaking down healthcare options with visual comparisons, plus 1-minute Teaser for enrollment campaign.",
    results: {
      engagement: "85% completion rate",
      enrollment: "72% enrollment increase", 
      satisfaction: "4.8/5 employee rating",
      additional: "60% reduction in HR support calls"
    },
    services: ["Foundation Video", "Teaser Video"],
    timeline: "3 weeks",
    employeeCount: "1,200",
    quote: "Our employees finally understand their benefits. The video made everything crystal clear and enrollment rates skyrocketed.",
    quotePerson: "Sarah Johnson",
    quoteTitle: "HR Director",
    videoThumbnail: "/dashboard.png",
    tags: ["Healthcare", "High ROI", "Large Company"],
    featured: true
  },
  {
    id: "healthplus-multilingual",
    title: "HealthPlus Multilingual Success",
    client: "HealthPlus Medical Group", 
    industry: "Healthcare",
    challenge: "Diverse workforce with 40% non-English speakers struggled with benefits enrollment. Compliance issues with multilingual requirements.",
    solution: "Foundation video in English, Spanish, and Mandarin with cultural adaptations. Custom microsite with language switching and interactive tools.",
    results: {
      engagement: "92% multi-language completion",
      enrollment: "95% enrollment across all languages",
      satisfaction: "Eliminated compliance issues",
      additional: "Recognition as diversity leader"
    },
    services: ["Foundation Video", "Multi-Language", "Custom Microsite"],
    timeline: "5 weeks",
    employeeCount: "800",
    quote: "Having benefits videos in our employees' native languages showed we truly value our diverse workforce.",
    quotePerson: "Maria Rodriguez",
    quoteTitle: "Chief HR Officer",
    videoThumbnail: "/dashboard.png",
    tags: ["Multi-language", "Healthcare", "Diversity"],
    featured: true
  },
  {
    id: "financemax-rush",
    title: "FinanceMax Rush Delivery",
    client: "FinanceMax Corporation",
    industry: "Financial Services",
    challenge: "Last-minute benefits provider change left only 10 days before open enrollment. Needed immediate communication to 2,000+ employees.",
    solution: "Rush delivery of Foundation video highlighting new provider benefits, plus emergency email campaign with Teaser video for urgency.",
    results: {
      engagement: "78% viewed within 48 hours",
      enrollment: "On-time enrollment achieved", 
      satisfaction: "Crisis averted successfully",
      additional: "Seamless provider transition"
    },
    services: ["Foundation Video", "Teaser Video", "Rush Delivery"],
    timeline: "10 days",
    employeeCount: "2,100", 
    quote: "Mojo Solo saved our open enrollment when everything went wrong. Their rush service was a lifesaver.",
    quotePerson: "David Chen",
    quoteTitle: "Benefits Manager",
    videoThumbnail: "/dashboard.png",
    tags: ["Rush Delivery", "Financial", "Crisis Management"],
    featured: false
  },
  {
    id: "retailmax-seasonal",
    title: "RetailMax Seasonal Workforce",
    client: "RetailMax Stores",
    industry: "Retail",
    challenge: "High employee turnover and seasonal workers needed quick benefits onboarding. Traditional methods too time-consuming.",
    solution: "DIY PowerPoint license to convert existing training materials, plus short Foundation videos for new hire orientation kiosks.",
    results: {
      engagement: "Quick onboarding achieved",
      enrollment: "Faster benefit decisions",
      satisfaction: "Streamlined HR process",
      additional: "40% reduction in onboarding time"
    },
    services: ["DIY License", "Foundation Video"],
    timeline: "2 weeks",
    employeeCount: "5,000+",
    quote: "Perfect solution for our high-turnover environment. Videos work great at our orientation kiosks.",
    quotePerson: "Jennifer Walsh",
    quoteTitle: "HR Operations Manager", 
    videoThumbnail: "/dashboard.png",
    tags: ["DIY License", "Retail", "High Volume"],
    featured: false
  },
  {
    id: "startup-growth",
    title: "GrowthStart's First Benefits Program",
    client: "GrowthStart Analytics",
    industry: "Technology Startup",
    challenge: "Fast-growing startup introducing first formal benefits program. Young workforce unfamiliar with healthcare options.",
    solution: "Educational Foundation video explaining benefits basics, plus interactive microsite with comparison tools and enrollment links.",
    results: {
      engagement: "96% employee participation",
      enrollment: "First program launch success",
      satisfaction: "Positioned as employee-centric",
      additional: "Recruitment competitive advantage"
    },
    services: ["Foundation Video", "Custom Microsite"],
    timeline: "4 weeks", 
    employeeCount: "150",
    quote: "As a young company, we needed to educate our team about benefits. The video made us look professional and caring.",
    quotePerson: "Alex Kim",
    quoteTitle: "People Operations Lead",
    videoThumbnail: "/dashboard.png",
    tags: ["Startup", "Education", "First Program"],
    featured: false
  },
  {
    id: "manufacturing-safety",
    title: "SafetyFirst Manufacturing Benefits",
    client: "SafetyFirst Industries",
    industry: "Manufacturing",
    challenge: "Blue-collar workforce with limited computer access needed mobile-friendly benefits communication for safety-focused benefits.",
    solution: "Mobile-optimized Foundation video highlighting safety benefits and workers' comp, deployed via QR codes in break rooms.",
    results: {
      engagement: "Mobile-first success",
      enrollment: "Improved safety awareness",
      satisfaction: "Accessible to all workers", 
      additional: "Reduced workplace incidents"
    },
    services: ["Foundation Video", "Mobile Optimization"],
    timeline: "3 weeks",
    employeeCount: "900",
    quote: "QR codes in break rooms made benefits accessible to our entire workforce, even those without desk jobs.",
    quotePerson: "Mike Patterson", 
    quoteTitle: "Safety & Benefits Coordinator",
    videoThumbnail: "/dashboard.png", 
    tags: ["Manufacturing", "Mobile", "Blue Collar"],
    featured: false
  }
];

const industries = ["All", "Technology", "Healthcare", "Financial Services", "Retail", "Manufacturing", "Startup"];
const services = ["All", "Foundation Video", "Teaser Video", "Custom Microsite", "Multi-Language", "DIY License", "Rush Delivery"];

export default function CaseStudyFilter() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<string>("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const filteredCaseStudies = caseStudies.filter((study) => {
    const industryMatch = selectedIndustry === "All" || study.industry === selectedIndustry;
    const serviceMatch = selectedService === "All" || study.services.some(s => s.includes(selectedService));
    const featuredMatch = !showFeaturedOnly || study.featured;
    
    return industryMatch && serviceMatch && featuredMatch;
  });

  const stats = [
    { label: "Client Success Rate", value: "98%", icon: <Award className="h-5 w-5" /> },
    { label: "Average Engagement", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Employees Reached", value: "50K+", icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Case Studies
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Real Results from Real
              <span className="block text-oklch(240.325 100% 50%)">
                Benefits Video Projects
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              See how our benefits videos have transformed employee engagement and enrollment 
              across industries. Every project delivers measurable results.
            </p>
          </BlurFade>
        </div>

        {/* Stats */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white border-0 shadow-sm">
                <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-oklch(240.325 100% 50%)">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-oklch(240.325 100% 50%) mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </BlurFade>

        {/* Filters */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <Card className="p-6 mb-12 bg-white border-0 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-oklch(240.325 100% 50%)" />
                <span className="font-medium text-gray-900">Filter by:</span>
              </div>

              <div className="flex flex-wrap gap-4 flex-1">
                {/* Industry Filter */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-end">
                  <button
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showFeaturedOnly
                        ? "bg-oklch(240.325 100% 50%) text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Featured Only
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {filteredCaseStudies.length} of {caseStudies.length} case studies
              </div>
            </div>
          </Card>
        </BlurFade>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {filteredCaseStudies.map((study, index) => (
            <BlurFade key={study.id} delay={BLUR_FADE_DELAY * (6 + index * 0.2)}>
              <CaseStudyCard caseStudy={study} />
            </BlurFade>
          ))}
        </div>

        {/* No Results */}
        {filteredCaseStudies.length === 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No case studies match your filters
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more results, or contact us about your specific industry needs.
              </p>
              <Button
                onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedService("All");
                  setShowFeaturedOnly(false);
                }}
                className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
              >
                Clear All Filters
              </Button>
            </div>
          </BlurFade>
        )}

        {/* Bottom CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="mt-20 text-center">
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 border border-oklch(240.325 100% 50%)/10 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join these industry leaders who've transformed their benefits communication 
                with engaging video content that drives real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  View Sample Videos
                </Button>
              </div>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}