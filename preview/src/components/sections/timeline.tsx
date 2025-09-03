"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Calendar,
  Play,
  Users,
  Award,
  Globe,
  TrendingUp,
  Building,
  Sparkles
} from "lucide-react";

const milestones = [
  {
    year: "2017",
    quarter: "Q1",
    title: "The Spark",
    description: "Founded by a team of HR professionals frustrated with boring benefits presentations. Our mission: make benefits engaging through video.",
    icon: <Sparkles className="h-5 w-5" />,
    stats: { value: "1", label: "Founding Team" },
    highlight: false,
  },
  {
    year: "2018", 
    quarter: "Q3",
    title: "First Client Success",
    description: "Delivered our first foundation video to a 500-employee tech company. Employee engagement increased by 285% within the first month.",
    icon: <Play className="h-5 w-5" />,
    stats: { value: "285%", label: "Engagement Increase" },
    highlight: true,
  },
  {
    year: "2019",
    quarter: "Q4", 
    title: "Team Expansion",
    description: "Grew to a full production team including animators, scriptwriters, and benefits specialists. Launched our signature 2-minute Foundation Videos.",
    icon: <Users className="h-5 w-5" />,
    stats: { value: "8", label: "Team Members" },
    highlight: false,
  },
  {
    year: "2020",
    quarter: "Q2",
    title: "Remote Innovation",
    description: "Pivoted to fully remote production during the pandemic. Developed microsites and interactive content to complement our videos.",
    icon: <Globe className="h-5 w-5" />,
    stats: { value: "100%", label: "Remote Production" },
    highlight: false,
  },
  {
    year: "2021",
    quarter: "Q1",
    title: "Industry Recognition",
    description: "Won 'Best HR Technology Solution' at the Benefits Innovation Awards. Featured in HR Executive Magazine's annual showcase.",
    icon: <Award className="h-5 w-5" />,
    stats: { value: "3", label: "Industry Awards" },
    highlight: true,
  },
  {
    year: "2022",
    quarter: "Q3",
    title: "Multi-Language Launch",
    description: "Expanded to serve global companies with professional translation and voiceover services in 12+ languages.",
    icon: <Globe className="h-5 w-5" />,
    stats: { value: "12+", label: "Languages" },
    highlight: false,
  },
  {
    year: "2023",
    quarter: "Q2",
    title: "Scale & Growth",
    description: "Reached 100+ clients across healthcare, finance, and technology sectors. Produced over 500 benefits videos with 98% client satisfaction.",
    icon: <TrendingUp className="h-5 w-5" />,
    stats: { value: "100+", label: "Happy Clients" },
    highlight: true,
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "AI Innovation",
    description: "Launched AI-powered DIY PowerPoint-to-Video service, enabling faster turnaround and more accessible pricing for smaller organizations.",
    icon: <Building className="h-5 w-5" />,
    stats: { value: "50%", label: "Faster Production" },
    highlight: false,
  },
];

export default function Timeline() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <Calendar className="h-4 w-4 mr-2 text-oklch(240.325 100% 50%)" />
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Our Journey
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              8 Years of Making Benefits
              <span className="block text-oklch(240.325 100% 50%)">
                Communication Better
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              From a small team with a big idea to the leading benefits video production company. 
              Here's how we've grown alongside our clients.
            </p>
          </BlurFade>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-oklch(240.325 100% 50%) to-oklch(240.325 100% 60%) transform md:-translate-x-px"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <BlurFade key={`${milestone.year}-${milestone.quarter}`} delay={BLUR_FADE_DELAY * (4 + index * 0.3)}>
                <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-oklch(240.325 100% 50%) rounded-full transform -translate-x-2 md:-translate-x-2 z-10 ring-4 ring-white shadow-lg">
                    <div className="absolute inset-0 bg-oklch(240.325 100% 50%) rounded-full animate-ping opacity-30"></div>
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${milestone.highlight ? 'md:scale-105' : ''}`}>
                    <Card className={`p-6 bg-white shadow-sm border-0 hover:shadow-xl transition-all duration-300 ${milestone.highlight ? 'ring-2 ring-oklch(240.325 100% 50%)/20 bg-gradient-to-br from-oklch(240.325 100% 50%)/5 to-white' : ''}`}>
                      {/* Year badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge 
                          variant="secondary"
                          className={`${milestone.highlight ? 'bg-oklch(240.325 100% 50%) text-white' : 'bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 40%)'}`}
                        >
                          {milestone.year} {milestone.quarter}
                        </Badge>
                        <div className={`p-2 rounded-lg ${milestone.highlight ? 'bg-oklch(240.325 100% 50%) text-white' : 'bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)'}`}>
                          {milestone.icon}
                        </div>
                      </div>

                      {/* Title and description */}
                      <h3 className={`text-xl font-bold mb-3 ${milestone.highlight ? 'text-oklch(240.325 100% 50%)' : 'text-gray-900'}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-2">
                        <div className={`text-2xl font-bold ${milestone.highlight ? 'text-oklch(240.325 100% 50%)' : 'text-oklch(240.325 100% 50%)'}`}>
                          {milestone.stats.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {milestone.stats.label}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Future section */}
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 rounded-2xl border border-oklch(240.325 100% 50%)/10 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 100% 50%)/10 border border-oklch(240.325 100% 50%)/20 mb-4">
              <span className="text-sm font-medium text-oklch(240.325 100% 50%)">
                What's Next?
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Future of Benefits Communication
            </h3>
            <p className="text-gray-600 mb-6">
              We're continuously innovating with AI, interactive experiences, and 
              new ways to help employees understand and engage with their benefits.
            </p>
            <button className="px-6 py-3 bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white font-medium rounded-lg transition-colors duration-300">
              Be Part of Our Story
            </button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}