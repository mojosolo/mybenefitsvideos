"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { ArrowRight, PlayCircle } from "lucide-react";

const stats = [
  { label: "Videos Produced", value: "500+" },
  { label: "Happy Clients", value: "150+" },
  { label: "Years Experience", value: "8+" },
  { label: "Employee Engagement", value: "3x Higher" },
];

export default function AboutHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9Im9rbGNoKDI0MC4zMjUlIDAlIDUwJSkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-40"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20">
                <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                  About myBenefitsVideos.com
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Making Benefits
                <span className="block text-oklch(240.325 100% 50%)">
                  Beautifully Simple
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                We believe every employee deserves to understand their benefits. 
                Our award-winning video production transforms complex benefits 
                information into engaging, easy-to-understand visual stories.
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white">
                  Our Process
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Sample Video
                </Button>
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-oklch(240.325 100% 50%)">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Visual */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="relative">
              {/* Video Preview Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-oklch(240.325 100% 50%) to-oklch(240.325 100% 40%) rounded-2xl shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white transition-colors duration-300 rounded-full p-6 shadow-lg group-hover:scale-110 transform duration-300">
                    <PlayCircle className="h-12 w-12 text-oklch(240.325 100% 50%)" />
                  </button>
                </div>

                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-semibold text-lg">
                    How We Transform Benefits Communication
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    See our process in action
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-2xl font-bold text-oklch(240.325 100% 50%)">98%</div>
                <div className="text-xs text-gray-600">Client Satisfaction</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-2xl font-bold text-oklch(240.325 100% 50%)">24h</div>
                <div className="text-xs text-gray-600">Response Time</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}