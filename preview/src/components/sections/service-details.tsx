"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Play, 
  Clock, 
  Users, 
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Monitor,
  FileText,
  Languages,
  Timer,
  Star,
  DollarSign,
  Palette,
  Sparkles,
  Plus,
  RefreshCw,
  Building
} from "lucide-react";

const services = [
  {
    id: "video-production",
    icon: <Play className="h-6 w-6" />,
    name: "Video Production",
    tagline: "Professional benefits videos from standard to full animation",
    price: "Starting at $799/min",
    duration: "1-10 minutes",
    timeline: "10-30 business days",
    description: "Four tiers of video production to match your budget and brand requirements, from stock footage to complete custom animations.",
    services: [
      {
        name: "Standard Video",
        price: "$799/minute + tax",
        description: "Branded with your logo and colors, utilizing stock footage to create an engaging video.",
        timeline: "15 business days",
        features: [
          "Professional scriptwriting",
          "Branded graphics and animations", 
          "Stock footage and imagery",
          "High-quality voiceover",
          "2 rounds of revisions",
          "Multiple format delivery"
        ]
      },
      {
        name: "Semi-Custom Video",
        price: "$999/minute + tax",
        description: "Includes branded animations and transitions for enhanced visual appeal.",
        timeline: "20 business days",
        features: [
          "Everything in Standard, plus:",
          "Custom branded animations",
          "Company-specific imagery",
          "Enhanced transitions",
          "Premium motion graphics"
        ]
      },
      {
        name: "Full Custom Video",
        price: "$1,199/minute + tax", 
        description: "Completely customized video production with unique animations and branding.",
        timeline: "25 business days",
        features: [
          "Everything in Semi-Custom, plus:",
          "Completely custom illustrations",
          "Unique animation style",
          "Custom character design",
          "Bespoke visual elements"
        ]
      },
      {
        name: "Full Animation",
        price: "$5,000 flat rate + tax",
        description: "Premium animation package with custom character design and storytelling.",
        timeline: "4-6 weeks",
        features: [
          "Premium animation package",
          "Custom character design",
          "Narrative storytelling",
          "Complex scene composition",
          "Advanced motion graphics"
        ]
      }
    ],
    benefits: [
      "3x higher employee engagement vs. PDFs",
      "40% increase in benefits enrollment",
      "Reduces HR support calls by 60%",
      "Improves benefits utilization rates"
    ],
    samples: [
      "Healthcare Benefits Overview",
      "401k & Retirement Planning", 
      "Open Enrollment Guide",
      "New Employee Onboarding"
    ],
    popular: true
  },
  {
    id: "teaser",
    icon: <Timer className="h-6 w-6" />,
    name: "OE Teaser Videos",
    tagline: "Short 1-minute videos perfect for open enrollment campaigns",
    price: "$650 + tax",
    duration: "Up to 1 minute",
    timeline: "2-3 weeks", 
    description: "Create excitement and drive enrollment with short, punchy videos that highlight key benefits and motivate employee action.",
    features: [
      "Concise, action-oriented messaging",
      "Eye-catching graphics and transitions",
      "Strong call-to-action integration",
      "Social media optimized formats",
      "Multiple size variants included",
      "Enrollment deadline integration",
      "Urgency-driven design elements",
      "Easy sharing and distribution"
    ],
    benefits: [
      "Increases enrollment campaign reach",
      "Drives urgency for deadline-sensitive periods", 
      "Perfect for social media and email campaigns",
      "Complements longer standard videos"
    ],
    samples: [
      "Open Enrollment Countdown",
      "New Benefit Announcement",
      "Deadline Reminder Campaign",
      "Benefits Fair Promotion"
    ],
    popular: false
  },
  {
    id: "microsite",
    icon: <Monitor className="h-6 w-6" />,
    name: "Custom Microsites",
    tagline: "Interactive landing pages that complement your videos",
    price: "$4,999 standalone / $3,999 bundled",
    duration: "Interactive experience",
    timeline: "4-5 weeks",
    description: "Custom-built landing pages featuring your videos plus interactive tools, calculators, and resources that enhance the benefits experience.",
    features: [
      "Custom responsive web design",
      "Video integration and hosting",
      "Interactive benefit calculators",
      "Downloadable resources section", 
      "Contact forms and support links",
      "Mobile-first responsive design",
      "SEO optimization included",
      "Analytics and tracking setup"
    ],
    benefits: [
      "Provides comprehensive benefits hub",
      "Interactive tools increase engagement",
      "$1,000 savings when bundled with Foundation",
      "Serves as year-round resource for employees"
    ],
    samples: [
      "Complete Benefits Portal",
      "Open Enrollment Hub",
      "New Hire Resource Center", 
      "Retirement Planning Center"
    ],
    popular: false
  },
  {
    id: "diy-license",
    icon: <FileText className="h-6 w-6" />,
    name: "DIY PowerPoint License",
    tagline: "Transform your existing presentations into professional videos",
    price: "$2,500 (AI Voice) + tax",
    duration: "Based on slides",
    timeline: "1-2 weeks",
    description: "Upload your PowerPoint presentations and we'll convert them into professional video content with voiceover, transitions, and branding. Add $1,000 for human voice.",
    features: [
      "PowerPoint to video conversion",
      "Professional AI voiceover (human +$1,000)",
      "Branded transitions and graphics",
      "Multiple format delivery",
      "Slide timing optimization",
      "Background music integration",
      "Quality enhancement filters",
      "Unlimited slide count"
    ],
    benefits: [
      "Leverages your existing content investment",
      "Fastest turnaround time available",
      "Cost-effective for multiple presentations",
      "Maintains your original messaging"
    ],
    samples: [
      "Benefits Overview Presentation",
      "Compliance Training Slides",
      "Policy Update Presentations",
      "Employee Handbook Sections"
    ],
    popular: false
  },
  {
    id: "multilingual",
    icon: <Languages className="h-6 w-6" />,
    name: "Multi-Language Versions",
    tagline: "Reach your entire workforce in their preferred language",
    price: "$250/minute + tax",
    duration: "Same as original",
    timeline: "1-2 weeks after English final",
    description: "Professional translation and localization of your videos into multiple languages with native speaker voiceovers. Available after English final approval.",
    features: [
      "Professional translation services",
      "Native speaker voiceover talent",
      "Cultural adaptation and localization",
      "Subtitle options available",
      "Quality assurance by language experts",
      "Multiple language format delivery",
      "Consistent branding across languages",
      "Same visual quality as original"
    ],
    benefits: [
      "Ensures 100% workforce comprehension",
      "Demonstrates inclusive company culture",
      "Improves benefits utilization across demographics",
      "Reduces language barriers to enrollment"
    ],
    samples: [
      "Spanish Benefits Videos",
      "French Canadian Versions",
      "Mandarin Employee Resources",
      "Portuguese Open Enrollment"
    ],
    popular: false
  },
  {
    id: "rush",
    icon: <Zap className="h-6 w-6" />,
    name: "Rush Delivery", 
    tagline: "Expedited production for urgent deadlines",
    price: "+50% surcharge",
    duration: "Same as selected service",
    timeline: "2 weeks or less",
    description: "When you need professional benefits videos on an accelerated timeline, our rush service delivers without compromising quality.",
    features: [
      "Dedicated priority production queue",
      "Extended team hours and weekend work",
      "Accelerated review and revision cycles", 
      "Daily progress updates and communication",
      "Same quality standards maintained",
      "Multiple format delivery included",
      "Priority customer support",
      "Flexible revision scheduling"
    ],
    benefits: [
      "Meet critical enrollment deadlines",
      "Respond quickly to market changes",
      "Launch benefits communications on schedule",
      "No compromise on video quality"
    ],
    samples: [
      "Emergency Policy Updates",
      "Last-Minute Open Enrollment",
      "Crisis Communication Videos",
      "Urgent Benefit Changes"
    ],
    popular: false
  }
];

const packages = [
  {
    name: "GOOD - Video Only",
    price: "$1,598",
    savings: "",
    services: ["Standard Video (2 minutes)"],
    description: "Perfect for organizations getting started with benefits videos."
  },
  {
    name: "BETTER - Video + Website",
    price: "$6,597", 
    savings: "Popular Choice",
    services: ["Standard Video (2 minutes)", "Benefits Break Microsite"],
    description: "Comprehensive benefits communication with video + interactive tools."
  },
  {
    name: "BEST - Complete Package",
    price: "$10,347",
    savings: "Maximum Value",
    services: [
      "Standard Video (2 minutes)",
      "OE Teaser Video (1 minute)", 
      "Benefits Break Microsite",
      "DIY PowerPoint License",
      "Alt-Language Version (2 minutes)"
    ],
    description: "Everything you need for world-class benefits communication."
  }
];

export default function ServiceDetails() {
  const [activeService, setActiveService] = useState<string>("video-production");

  const activeServiceData = services.find(s => s.id === activeService);

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Our Services
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Benefits Video
              <span className="block text-oklch(240.325 100% 50%)">
                Production Services
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              From 2-minute standard videos to complete microsites, we offer everything 
              you need to transform your benefits communication and engage your employees.
            </p>
          </BlurFade>
        </div>

        {/* Service Navigation */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeService === service.id
                    ? "bg-oklch(240.325 100% 50%) text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {service.icon}
                {service.name}
                {service.popular && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    Popular
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Active Service Details */}
        {activeServiceData && (
          <BlurFade key={activeService} delay={0}>
            <div className="max-w-6xl mx-auto">
              <Card className="p-8 lg:p-12 bg-white border-0 shadow-sm mb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Service Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-xl flex items-center justify-center">
                        <div className="text-oklch(240.325 100% 50%)">
                          {activeServiceData.icon}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                          {activeServiceData.name}
                        </h2>
                        {activeServiceData.popular && (
                          <Badge className="bg-orange-100 text-orange-800">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-xl text-oklch(240.325 100% 50%) font-medium mb-4">
                      {activeServiceData.tagline}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-8">
                      {activeServiceData.description}
                    </p>

                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-oklch(240.325 100% 50%) mx-auto mb-2" />
                        <div className="font-bold text-gray-900">{activeServiceData.price}</div>
                        <div className="text-sm text-gray-600">Starting Price</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="h-6 w-6 text-oklch(240.325 100% 50%) mx-auto mb-2" />
                        <div className="font-bold text-gray-900">{activeServiceData.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Timer className="h-6 w-6 text-oklch(240.325 100% 50%) mx-auto mb-2" />
                        <div className="font-bold text-gray-900">{activeServiceData.timeline}</div>
                        <div className="text-sm text-gray-600">Timeline</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg"
                        className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                      >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        View Samples
                      </Button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      What's Included
                    </h3>
                    <div className="space-y-3 mb-8">
                      {activeServiceData.features ? (
                        activeServiceData.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-oklch(240.325 100% 50%) flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))
                      ) : activeServiceData.services ? (
                        activeServiceData.services.map((service, index) => (
                          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-oklch(240.325 100% 50%)">{service.price}</span>
                              <span className="text-gray-500">{service.timeline}</span>
                            </div>
                          </div>
                        ))
                      ) : null}
                    </div>

                    {/* Benefits */}
                    <h4 className="font-semibold text-gray-900 mb-4">Key Benefits</h4>
                    <div className="space-y-2 mb-8">
                      {activeServiceData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sample Types */}
                    <h4 className="font-semibold text-gray-900 mb-4">Sample Projects</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeServiceData.samples.map((sample, index) => (
                        <Badge key={index} variant="secondary" className="bg-oklch(240.325 100% 50%)/5 text-oklch(240.325 100% 40%)">
                          {sample}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Package Deals */}
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Package Deals
              </h2>
              <p className="text-xl text-gray-600">
                Save money with our bundled packages that combine multiple services
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <BlurFade key={pkg.name} delay={BLUR_FADE_DELAY * (6 + index)}>
                <Card className={`p-6 h-full ${
                  pkg.name.includes('BETTER') 
                    ? 'ring-2 ring-oklch(240.325 100% 50%) bg-oklch(240.325 100% 50%)/5' 
                    : 'bg-white'
                } border-0 shadow-sm`}>
                  {pkg.savings && (
                    <div className="text-center mb-4">
                      <Badge className="bg-green-100 text-green-800">
                        {pkg.savings}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-3xl font-bold text-oklch(240.325 100% 50%) mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-sm text-gray-600">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-oklch(240.325 100% 50%)" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      pkg.name.includes('BETTER')
                        ? 'bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Choose {pkg.name.split(' ')[0]}
                  </Button>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Process Overview */}
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Proven Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Discovery Call", desc: "We learn about your benefits and goals" },
                { step: "2", title: "Script & Storyboard", desc: "Professional writing and visual planning" },
                { step: "3", title: "Production", desc: "Animation, voiceover, and video creation" },
                { step: "4", title: "Review & Deliver", desc: "2 rounds of revisions and final delivery" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-oklch(240.325 100% 50%) text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                    {process.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-sm text-gray-600">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}