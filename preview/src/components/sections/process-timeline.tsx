"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Calendar,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  FileText,
  Brush,
  Eye,
  Rocket,
  BarChart,
  Shield,
  Target,
  Zap,
  ArrowRight,
  Star
} from "lucide-react";
import { useState } from "react";

// Process phases data structure
const processPhases = [
  {
    id: "discovery",
    phase: "Week 1",
    title: "Discovery & Planning",
    description: "We start by understanding your organization, benefits structure, and communication goals to create a comprehensive project roadmap.",
    icon: <Target className="h-6 w-6" />,
    timeline: "Days 1-7",
    deliverables: [
      "Benefits audit and analysis",
      "Target audience personas",
      "Project timeline and milestones",
      "Style guide alignment",
      "Communication objectives"
    ],
    clientTouchpoints: [
      "Kickoff meeting and stakeholder interviews",
      "Benefits documentation review",
      "Style guide and brand guideline review"
    ],
    qualityAssurance: [
      "Complete benefits package analysis",
      "Stakeholder alignment verification",
      "Technical requirements validation"
    ],
    tools: ["Zoom", "Benefits Documentation", "Brand Guidelines", "Project Management Software"],
    color: "bg-emerald-50 border-emerald-200 text-emerald-700"
  },
  {
    id: "content",
    phase: "Week 2", 
    title: "Content Strategy & Scripting",
    description: "Our benefits experts and copywriters collaborate to create engaging, accurate scripts that simplify complex benefits information.",
    icon: <FileText className="h-6 w-6" />,
    timeline: "Days 8-14",
    deliverables: [
      "Content strategy document",
      "Video script (foundation/teaser)",
      "Key messaging framework",
      "Microsite content outline (if applicable)",
      "Voice and tone guidelines"
    ],
    clientTouchpoints: [
      "Script review and feedback session", 
      "Content strategy presentation",
      "Messaging approval checkpoint"
    ],
    qualityAssurance: [
      "Benefits accuracy verification",
      "Compliance review",
      "Message clarity testing",
      "Brand voice consistency check"
    ],
    tools: ["Google Docs", "Benefits Verification", "Legal Compliance Check", "Content Management System"],
    color: "bg-blue-50 border-blue-200 text-blue-700"
  },
  {
    id: "production",
    phase: "Weeks 3-4",
    title: "Production & Animation", 
    description: "Our creative team brings your benefits story to life through custom graphics, professional animation, and high-quality voiceover production.",
    icon: <Brush className="h-6 w-6" />,
    timeline: "Days 15-28",
    deliverables: [
      "Custom graphic design system",
      "Professional voiceover recording",
      "Animated video sequences",
      "Music and sound design",
      "Initial video assembly (V1)"
    ],
    clientTouchpoints: [
      "Creative direction review",
      "Voiceover talent approval",
      "V1 video presentation"
    ],
    qualityAssurance: [
      "Brand guideline adherence",
      "Animation quality control",
      "Audio quality assurance",
      "Benefits information accuracy",
      "Technical specification compliance"
    ],
    tools: ["Adobe Creative Suite", "Professional Voice Recording", "Animation Software", "Quality Control Systems"],
    color: "bg-purple-50 border-purple-200 text-purple-700"
  },
  {
    id: "review",
    phase: "Week 5",
    title: "Review & Refinement",
    description: "We incorporate your feedback through our structured revision process, ensuring the final video perfectly meets your communication objectives.",
    icon: <Eye className="h-6 w-6" />,
    timeline: "Days 29-35", 
    deliverables: [
      "Client feedback integration",
      "Revised video version (V2)",
      "Additional revision (if needed)",
      "Final approval checkpoint",
      "Technical optimization"
    ],
    clientTouchpoints: [
      "V1 feedback and revision session",
      "V2 review and final approval",
      "Technical review and optimization"
    ],
    qualityAssurance: [
      "All feedback implementation verification",
      "Final compliance check",
      "Technical quality assurance",
      "Cross-platform compatibility testing"
    ],
    tools: ["Video Review Platform", "Revision Tracking", "Quality Assurance Checklist", "Technical Testing"],
    color: "bg-amber-50 border-amber-200 text-amber-700"
  },
  {
    id: "delivery", 
    phase: "Week 6",
    title: "Final Delivery & Launch",
    description: "We deliver your completed video in multiple formats optimized for different platforms, plus comprehensive launch support materials.",
    icon: <Rocket className="h-6 w-6" />,
    timeline: "Days 36-42",
    deliverables: [
      "HD video in multiple formats",
      "Platform-optimized versions", 
      "Microsite deployment (if applicable)",
      "Launch communication templates",
      "Analytics tracking setup"
    ],
    clientTouchpoints: [
      "Final delivery presentation",
      "Launch strategy consultation",
      "Technical integration support"
    ],
    qualityAssurance: [
      "Final technical validation",
      "All format compatibility verification",
      "Launch readiness checklist",
      "Analytics implementation verification"
    ],
    tools: ["Video Compression", "Multi-Platform Optimization", "Analytics Setup", "Launch Support Kit"],
    color: "bg-green-50 border-green-200 text-green-700"
  },
  {
    id: "support",
    phase: "Ongoing",
    title: "Ongoing Support & Analytics", 
    description: "We provide continued support with performance analytics, optimization recommendations, and assistance with future benefits communication needs.",
    icon: <BarChart className="h-6 w-6" />,
    timeline: "Post-Launch",
    deliverables: [
      "Performance analytics reports",
      "Engagement optimization suggestions",
      "Technical support and troubleshooting",
      "Future project consultation",
      "Industry best practice updates"
    ],
    clientTouchpoints: [
      "30-day performance review",
      "Quarterly check-ins",
      "Ongoing support accessibility"
    ],
    qualityAssurance: [
      "Analytics accuracy monitoring",
      "Performance optimization tracking",
      "Client satisfaction verification",
      "Continuous improvement implementation"
    ],
    tools: ["Analytics Platforms", "Performance Monitoring", "Support Ticket System", "Industry Research"],
    color: "bg-indigo-50 border-indigo-200 text-indigo-700"
  }
];

// FAQ data
const processFAQs = [
  {
    question: "How do you ensure the video content is accurate to our specific benefits?",
    answer: "We conduct thorough benefits audits, work directly with your HR team and benefits administrators, and include multiple accuracy checkpoints throughout our process. Every script goes through compliance review before production begins."
  },
  {
    question: "Can we make changes during the production process?",
    answer: "Yes! We include structured feedback sessions at key milestones. Major content changes are best made during the scripting phase, while visual and audio refinements can be addressed during our revision process."
  },
  {
    question: "What if we need the video completed faster than 6 weeks?",
    answer: "We offer rush delivery for a 50% surcharge, which can compress the timeline to 3-4 weeks. This requires more intensive collaboration and may limit the number of revision rounds available."
  },
  {
    question: "How do you handle multiple stakeholder reviews and approvals?",
    answer: "We provide a structured review process with clear deadlines and consolidated feedback collection. We can accommodate multiple reviewers and help streamline the approval workflow to keep projects on track."
  },
  {
    question: "What happens if our benefits change after the video is completed?",
    answer: "Minor updates can be handled through our ongoing support. For significant changes, we offer discounted rates for returning clients and can provide updated versions or create new content as needed."
  },
  {
    question: "Do you provide training on how to use the video effectively?",
    answer: "Absolutely! We provide launch strategy consultation, best practices for internal communication, and ongoing support to help you maximize employee engagement with your benefits video content."
  }
];

export default function ProcessTimeline() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string>("");

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
                <Clock className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
                <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                  6-Week Process
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Our Proven Process for
                <span className="block text-oklch(240.325 100% 50%)">
                  Benefits Video Success
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From discovery to delivery, our comprehensive 6-week process ensures your benefits 
                video exceeds expectations. Every phase includes quality checkpoints, client collaboration, 
                and measurable deliverables.
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white px-8 py-4"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%) hover:text-white px-8 py-4"
                >
                  View Sample Timeline
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Six Phases to Video Excellence
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-xl text-gray-600 leading-relaxed">
                Each phase builds upon the last, ensuring quality, accuracy, and alignment 
                with your communication objectives.
              </p>
            </BlurFade>
          </div>

          {/* Interactive Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-oklch(240.325 100% 50%) via-oklch(240.325 100% 60%) to-oklch(240.325 100% 70%) transform md:-translate-x-0.5"></div>

            {/* Timeline phases */}
            <div className="space-y-12">
              {processPhases.map((phase, index) => (
                <BlurFade key={phase.id} delay={BLUR_FADE_DELAY * (2 + index * 0.3)}>
                  <div className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-oklch(240.325 100% 50%) rounded-full transform -translate-x-3 md:-translate-x-3 z-10 ring-4 ring-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Content card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${activePhase === phase.id ? 'md:scale-105' : ''}`}>
                      <Card 
                        className={`bg-white shadow-sm border-0 hover:shadow-xl transition-all duration-300 cursor-pointer ${phase.color} ${activePhase === phase.id ? 'ring-2 ring-oklch(240.325 100% 50%)/30 shadow-xl' : ''}`}
                        onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-oklch(240.325 100% 50%) text-white">
                              {phase.phase}
                            </Badge>
                            <div className="p-2 rounded-lg bg-oklch(240.325 100% 50%)/10">
                              {phase.icon}
                            </div>
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                            {phase.title}
                          </CardTitle>
                          <p className="text-gray-600 text-sm">
                            {phase.timeline}
                          </p>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-700 mb-4">
                            {phase.description}
                          </p>
                          
                          {activePhase === phase.id && (
                            <div className="space-y-6 border-t border-gray-100 pt-6">
                              {/* Deliverables */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
                                  Key Deliverables
                                </h4>
                                <ul className="space-y-2">
                                  {phase.deliverables.map((deliverable, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <div className="w-1.5 h-1.5 bg-oklch(240.325 100% 50%) rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      {deliverable}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Client Touchpoints */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
                                  Client Collaboration
                                </h4>
                                <ul className="space-y-2">
                                  {phase.clientTouchpoints.map((touchpoint, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <MessageSquare className="h-3 w-3 text-oklch(240.325 100% 50%) mt-1 mr-2 flex-shrink-0" />
                                      {touchpoint}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Quality Assurance */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Shield className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
                                  Quality Checkpoints
                                </h4>
                                <ul className="space-y-2">
                                  {phase.qualityAssurance.map((qa, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <Star className="h-3 w-3 text-oklch(240.325 100% 50%) mt-1 mr-2 flex-shrink-0" />
                                      {qa}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Tools */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Zap className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
                                  Tools & Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {phase.tools.map((tool, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {tool}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="text-center mt-4">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/10"
                            >
                              {activePhase === phase.id ? 'Show Less' : 'Learn More'}
                              <ArrowRight className={`ml-1 h-4 w-4 transform transition-transform ${activePhase === phase.id ? 'rotate-90' : ''}`} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block w-5/12"></div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Our Process Works
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our structured approach ensures quality, accuracy, and client satisfaction 
                while maintaining predictable timelines.
              </p>
            </BlurFade>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Quality Assurance",
                description: "Multiple checkpoints ensure accuracy, compliance, and brand consistency throughout the process."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Collaborative Approach", 
                description: "Regular touchpoints keep you involved while our experts handle the technical complexity."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Predictable Timeline",
                description: "Our proven 6-week process provides clear expectations and milestone-based delivery."
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Measurable Outcomes",
                description: "Each phase has specific deliverables and success criteria, ensuring measurable progress."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Efficient Workflow",
                description: "Streamlined processes and professional tools maximize quality while minimizing revisions."
              },
              {
                icon: <BarChart className="h-8 w-8" />,
                title: "Ongoing Support",
                description: "Post-launch analytics and optimization help you maximize your video's impact over time."
              }
            ].map((benefit, index) => (
              <BlurFade key={index} delay={BLUR_FADE_DELAY * (2 + index * 0.2)}>
                <Card className="bg-white shadow-sm border-0 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-lg bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%) w-fit mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Process Questions Answered
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get clarity on how our process works and what to expect at each phase.
              </p>
            </BlurFade>
          </div>

          <div className="max-w-4xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <Accordion 
                type="single" 
                collapsible 
                value={expandedFAQ} 
                onValueChange={setExpandedFAQ}
                className="space-y-4"
              >
                {processFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-white rounded-lg border border-gray-100 px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-oklch(240.325 100% 50%) py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Ready to Start CTA */}
      <section className="py-16 bg-gradient-to-r from-oklch(240.325 100% 50%) to-oklch(240.325 100% 55%)">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto text-white">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Begin Your Benefits Video Journey?
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-xl mb-8 opacity-90">
                Let's start with a discovery call to understand your needs and create a 
                customized timeline for your project.
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-oklch(240.325 100% 50%) hover:bg-gray-50 px-8 py-4 font-semibold"
                >
                  Schedule Discovery Call
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-oklch(240.325 100% 50%) px-8 py-4 font-semibold"
                >
                  Get Project Quote
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </>
  );
}