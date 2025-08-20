"use client";

import { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Building,
  Users,
  TrendingUp,
  Award,
  Play
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  companySize: string;
  industry: string;
  service: string;
  quote: string;
  rating: number;
  results?: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  avatar?: string;
  videoTestimonial?: {
    thumbnail: string;
    videoUrl: string;
  };
  featured?: boolean;
}

interface ServiceTestimonialsProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  serviceType: string;
  showVideoTestimonials?: boolean;
  showResults?: boolean;
}

export default function ServiceTestimonials({
  title,
  subtitle,
  testimonials,
  serviceType,
  showVideoTestimonials = true,
  showResults = true
}: ServiceTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter testimonials for this service type
  const serviceTestimonials = testimonials.filter(
    t => t.service === serviceType || t.service === 'all'
  );

  const featuredTestimonials = serviceTestimonials.filter(t => t.featured);
  const regularTestimonials = serviceTestimonials.filter(t => !t.featured);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % serviceTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [serviceTestimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % serviceTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + serviceTestimonials.length) % serviceTestimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = serviceTestimonials[currentIndex];

  if (!serviceTestimonials.length) {
    return null;
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
          </BlurFade>
          
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <p className="text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Featured Testimonial Carousel */}
        {currentTestimonial && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="relative overflow-hidden bg-gradient-to-br from-oklch(240.325 20% 97%) to-white border-0 shadow-xl">
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Testimonial Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {currentTestimonial.rating}/5 stars
                      </span>
                    </div>

                    <Quote className="h-8 w-8 text-oklch(240.325 100% 50%)/30" />
                    
                    <blockquote className="text-xl lg:text-2xl text-gray-900 leading-relaxed font-medium">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-full flex items-center justify-center">
                        <span className="text-oklch(240.325 100% 50%) font-semibold">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-gray-600">
                          {currentTestimonial.title}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-oklch(240.325 100% 50%)">
                          <Building className="h-3 w-3" />
                          {currentTestimonial.company}
                        </div>
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {currentTestimonial.companySize}
                      </Badge>
                      <Badge variant="secondary">
                        {currentTestimonial.industry}
                      </Badge>
                      <Badge className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                        {currentTestimonial.service}
                      </Badge>
                    </div>
                  </div>

                  {/* Results or Video */}
                  <div className="space-y-6">
                    {currentTestimonial.videoTestimonial && showVideoTestimonials ? (
                      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-oklch(240.325 30% 85%) to-oklch(240.325 50% 75%) flex items-center justify-center cursor-pointer group">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Play className="h-6 w-6 text-white ml-1" />
                            </div>
                            <p className="text-white font-medium">Video Testimonial</p>
                            <p className="text-white/70 text-sm">Click to watch</p>
                          </div>
                        </div>
                      </div>
                    ) : currentTestimonial.results && showResults ? (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-oklch(240.325 100% 50%)" />
                          Results Achieved
                        </h4>
                        <div className="grid gap-4">
                          {currentTestimonial.results.map((result, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">{result.metric}</span>
                                <Badge className="bg-green-100 text-green-800">
                                  {result.improvement}
                                </Badge>
                              </div>
                              <div className="text-2xl font-bold text-oklch(240.325 100% 50%)">
                                {result.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Navigation */}
                {serviceTestimonials.length > 1 && (
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevTestimonial}
                      className="bg-white/80 hover:bg-white shadow-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {serviceTestimonials.length > 1 && (
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextTestimonial}
                      className="bg-white/80 hover:bg-white shadow-sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Indicators */}
                {serviceTestimonials.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {serviceTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index);
                          setIsAutoPlaying(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex 
                            ? 'bg-oklch(240.325 100% 50%)' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Additional Testimonials Grid */}
        {regularTestimonials.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {regularTestimonials.slice(0, 6).map((testimonial, index) => (
                <Card key={testimonial.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-900 mb-4 line-clamp-4">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-oklch(240.325 100% 50%)/10 rounded-full flex items-center justify-center">
                      <span className="text-oklch(240.325 100% 50%) font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Building className="h-3 w-3" />
                    <span>{testimonial.company}</span>
                    <span>•</span>
                    <span>{testimonial.industry}</span>
                  </div>
                </Card>
              ))}
            </div>
          </BlurFade>
        )}

        {/* Trust Indicators */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-oklch(240.325 100% 50%)" />
                <span className="text-sm font-medium text-gray-900">
                  {serviceTestimonials.length}+ Happy Clients
                </span>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {(serviceTestimonials.reduce((acc, t) => acc + t.rating, 0) / serviceTestimonials.length).toFixed(1)} Average Rating
                </span>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900">
                  98% Success Rate
                </span>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}