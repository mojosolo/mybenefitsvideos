"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Monitor,
  Download,
  Settings,
  Clock,
  FileType,
  Palette,
  Volume2,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  Info,
  ArrowRight,
  Play,
  Users,
  Smartphone
} from "lucide-react";

interface SpecCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  specs: {
    name: string;
    value: string;
    description?: string;
    highlight?: boolean;
  }[];
}

interface ServiceSpecsProps {
  title: string;
  subtitle: string;
  serviceType: string;
  categories: SpecCategory[];
  deliveryFormats?: {
    name: string;
    resolution: string;
    size: string;
    purpose: string;
  }[];
  qualityStandards?: {
    standard: string;
    description: string;
    icon: React.ReactNode;
  }[];
  technicalRequirements?: {
    category: string;
    requirements: string[];
  }[];
  showDownloadGuide?: boolean;
}

export default function ServiceSpecs({
  title,
  subtitle,
  serviceType,
  categories,
  deliveryFormats,
  qualityStandards,
  technicalRequirements,
  showDownloadGuide = true
}: ServiceSpecsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <Settings className="h-4 w-4 text-oklch(240.325 100% 50%) mr-2" />
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Technical Specifications
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
          </BlurFade>
          
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Category Navigation */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-oklch(240.325 100% 50%) text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
                }`}
              >
                <div className={activeCategory === category.id ? 'text-white' : 'text-oklch(240.325 100% 50%)'}>
                  {category.icon}
                </div>
                {category.name}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Active Category Specs */}
        {activeCategoryData && (
          <BlurFade key={activeCategory} delay={0}>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="p-8 bg-white border-0 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  {activeCategoryData.specs.map((spec, index) => (
                    <div 
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                        spec.highlight 
                          ? 'border-oklch(240.325 100% 50%)/30 bg-oklch(240.325 100% 50%)/5' 
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          {spec.name}
                        </h3>
                        {spec.highlight && (
                          <Badge className="bg-oklch(240.325 100% 50%) text-white">
                            Premium
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xl font-bold text-oklch(240.325 100% 50%) mb-2">
                        {spec.value}
                      </div>
                      
                      {spec.description && (
                        <div className="flex items-start gap-2">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {spec.description}
                          </p>
                          {spec.description.length > 100 && (
                            <button
                              onClick={() => setExpandedSpec(expandedSpec === `${activeCategory}-${index}` ? null : `${activeCategory}-${index}`)}
                              className="text-oklch(240.325 100% 50%) hover:text-oklch(240.325 100% 45%) transition-colors flex-shrink-0"
                            >
                              <Info className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Delivery Formats */}
        {deliveryFormats && deliveryFormats.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="max-w-6xl mx-auto mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Delivery Formats
                </h3>
                <p className="text-gray-600">
                  Your videos are delivered in multiple formats optimized for different platforms
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliveryFormats.map((format, index) => (
                  <Card key={index} className="p-6 bg-white border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FileType className="h-6 w-6 text-oklch(240.325 100% 50%)" />
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {format.name}
                      </h4>
                      
                      <div className="space-y-2 mb-4">
                        <div className="text-sm">
                          <span className="font-medium text-oklch(240.325 100% 50%)">
                            {format.resolution}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {format.size}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {format.purpose}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Quality Standards */}
        {qualityStandards && qualityStandards.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Quality Standards
                </h3>
                <p className="text-gray-600">
                  Every video meets our rigorous quality standards
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {qualityStandards.map((standard, index) => (
                  <Card key={index} className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="w-16 h-16 bg-oklch(240.325 100% 50%)/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-oklch(240.325 100% 50%)">
                        {standard.icon}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {standard.standard}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {standard.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Technical Requirements */}
        {technicalRequirements && technicalRequirements.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Technical Requirements
                  </h3>
                  <p className="text-gray-600">
                    What we need from you to get started
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {technicalRequirements.map((req, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-oklch(240.325 100% 50%)" />
                        {req.category}
                      </h4>
                      <div className="space-y-2">
                        {req.requirements.map((requirement, reqIndex) => (
                          <div key={reqIndex} className="flex items-start gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-oklch(240.325 100% 50%) rounded-full mt-2 flex-shrink-0"></div>
                            <span>{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Download Guide */}
        {showDownloadGuide && (
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="max-w-3xl mx-auto text-center">
              <Card className="p-8 bg-oklch(240.325 100% 50%)/5 border-2 border-oklch(240.325 100% 50%)/20">
                <div className="w-16 h-16 bg-oklch(240.325 100% 50%) rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Download our project brief template to provide us with all the information 
                  we need to create your perfect {serviceType.toLowerCase()}.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Brief Template
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Support Note */}
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
              <Info className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Questions about technical specs? Our team is here to help.
              </span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}