"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Play, 
  Clock, 
  Users, 
  ArrowRight,
  PlayCircle,
  Star,
  DollarSign,
  Timer
} from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  timeline: string;
  icon: React.ReactNode;
  videoPreviewSrc?: string;
  videoPlaceholder?: string;
  features: string[];
  keyStats: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  popular?: boolean;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

export default function ServiceHero({
  title,
  subtitle,
  description,
  price,
  duration,
  timeline,
  icon,
  videoPreviewSrc,
  videoPlaceholder = "Video Preview Coming Soon",
  features,
  keyStats,
  popular = false,
  ctaPrimary,
  ctaSecondary
}: ServiceHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-oklch(240.325 20% 97%) to-white"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="flex items-center gap-3 mb-4">
                {popular && (
                  <Badge className="bg-orange-100 text-orange-800 mb-2">
                    Most Popular Service
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-oklch(240.325 100% 50%)/10 rounded-2xl flex items-center justify-center">
                  <div className="text-oklch(240.325 100% 50%)">
                    {icon}
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                    {title}
                  </h1>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-xl lg:text-2xl text-oklch(240.325 100% 50%) font-medium">
                {subtitle}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {description}
              </p>
            </BlurFade>

            {/* Service Stats */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <DollarSign className="h-8 w-8 text-oklch(240.325 100% 50%) mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900">{price}</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Clock className="h-8 w-8 text-oklch(240.325 100% 50%) mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900">{duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Timer className="h-8 w-8 text-oklch(240.325 100% 50%) mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900">{timeline}</div>
                  <div className="text-sm text-gray-600">Timeline</div>
                </div>
              </div>
            </BlurFade>

            {/* Key Features */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                <div className="grid gap-2">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-oklch(240.325 100% 50%) flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* CTA Buttons */}
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                  onClick={() => window.open(ctaPrimary.href, '_blank')}
                >
                  {ctaPrimary.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                  onClick={() => window.open(ctaSecondary.href, '_blank')}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  {ctaSecondary.text}
                </Button>
              </div>
            </BlurFade>
          </div>

          {/* Video Preview */}
          <div className="relative">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                {videoPreviewSrc ? (
                  <div className="relative w-full h-full">
                    {!isVideoPlaying ? (
                      <div className="relative w-full h-full bg-gradient-to-br from-oklch(240.325 30% 85%) to-oklch(240.325 50% 75%) flex items-center justify-center cursor-pointer group"
                           onClick={() => setIsVideoPlaying(true)}>
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Play className="h-8 w-8 text-oklch(240.325 100% 50%) ml-1" />
                          </div>
                          <p className="text-white font-medium">Click to Play Preview</p>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-900">
                            Sample Video
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <video 
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        src={videoPreviewSrc}
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-oklch(240.325 30% 85%) to-oklch(240.325 50% 75%) flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <Play className="h-8 w-8 text-white/70 ml-1" />
                      </div>
                      <p className="text-white font-medium">{videoPlaceholder}</p>
                      <p className="text-white/70 text-sm mt-2">Sample videos available soon</p>
                    </div>
                  </div>
                )}
              </div>
            </BlurFade>

            {/* Floating Stats */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="absolute -bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-3">
                  {keyStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                      <div className="text-oklch(240.325 100% 50%) mb-1">
                        {stat.icon}
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}