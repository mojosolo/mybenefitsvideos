"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Eye, 
  Zap, 
  Target, 
  Lightbulb, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const companyValues = [
  {
    icon: <Eye className="h-8 w-8" />,
    title: "Clarity",
    description: "We eliminate confusion from benefits communication, making complex information crystal clear for every employee.",
    principles: [
      "Simple language that anyone can understand",
      "Visual storytelling that clarifies concepts",
      "Clear calls-to-action in every video"
    ],
    color: "from-oklch(240.325 100% 60%) to-oklch(240.325 100% 50%)",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Simplicity", 
    description: "Complex doesn't have to mean complicated. We distill intricate benefits into digestible, actionable content.",
    principles: [
      "Focus on what employees need to know",
      "Streamlined production process",
      "Clean, modern visual design"
    ],
    color: "from-oklch(240.325 80% 55%) to-oklch(240.325 100% 45%)",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Impact",
    description: "Every video we create drives real results - higher engagement, better decisions, and improved employee satisfaction.",
    principles: [
      "Measurable engagement improvements",
      "Data-driven content strategy",
      "Results that matter to your business"
    ],
    color: "from-oklch(240.325 90% 52%) to-oklch(240.325 100% 42%)",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovation",
    description: "We continuously evolve our approach, using the latest video technology and communication strategies.",
    principles: [
      "Cutting-edge animation techniques",
      "Interactive microsite experiences", 
      "Adaptive content for diverse audiences"
    ],
    color: "from-oklch(240.325 95% 58%) to-oklch(240.325 100% 48%)",
  },
];

export default function CompanyValues() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Our Values
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              The Principles That
              <span className="block text-oklch(240.325 100% 50%)">
                Guide Everything We Do
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our core values aren't just words on a wall – they're the foundation 
              of every video we create and every client relationship we build.
            </p>
          </BlurFade>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {companyValues.map((value, index) => (
            <BlurFade key={value.title} delay={BLUR_FADE_DELAY * (4 + index * 0.5)}>
              <Card className="group p-8 h-full bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-sm overflow-hidden relative">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Principles */}
                  <div className="space-y-3">
                    {value.principles.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-oklch(240.325 100% 50%) mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{principle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Bottom CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 rounded-2xl border border-oklch(240.325 100% 50%)/10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experience Our Values in Action
              </h3>
              <p className="text-gray-600 mb-6">
                See how our values translate into exceptional benefits videos that 
                engage employees and drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white font-medium rounded-lg transition-colors duration-300">
                  View Our Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="px-6 py-3 border border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5 font-medium rounded-lg transition-colors duration-300">
                  Start Your Project
                </button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}