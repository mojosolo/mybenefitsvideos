"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Check, 
  X,
  ArrowRight,
  Info,
  Star,
  Zap,
  Clock,
  DollarSign,
  Users,
  Target
} from "lucide-react";

interface ComparisonItem {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  popular?: boolean;
  recommended?: boolean;
  features: {
    category: string;
    items: {
      name: string;
      included: boolean | string; // true/false or string for partial/custom
      tooltip?: string;
    }[];
  }[];
  cta: {
    text: string;
    href: string;
  };
  highlights?: string[];
}

interface ServiceComparisonProps {
  title: string;
  subtitle: string;
  items: ComparisonItem[];
  featureCategories?: string[];
  showPriceToggle?: boolean;
}

export default function ServiceComparison({
  title,
  subtitle,
  items,
  featureCategories,
  showPriceToggle = false
}: ServiceComparisonProps) {
  const [showAnnualPricing, setShowAnnualPricing] = useState(false);
  const [expandedTooltip, setExpandedTooltip] = useState<string | null>(null);

  // Get all unique feature categories if not provided
  const allCategories = featureCategories || [
    ...new Set(items.flatMap(item => item.features.map(f => f.category)))
  ];

  const renderFeatureValue = (value: boolean | string, tooltip?: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    
    return (
      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-gray-700">{value}</span>
        {tooltip && (
          <button
            onMouseEnter={() => setExpandedTooltip(tooltip)}
            onMouseLeave={() => setExpandedTooltip(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Info className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
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

        {/* Price Toggle */}
        {showPriceToggle && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!showAnnualPricing ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setShowAnnualPricing(!showAnnualPricing)}
                className={`w-14 h-8 rounded-full relative transition-colors duration-200 ${
                  showAnnualPricing ? 'bg-oklch(240.325 100% 50%)' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                  showAnnualPricing ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm font-medium ${showAnnualPricing ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              <Badge className="bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </div>
          </BlurFade>
        )}

        {/* Comparison Table - Mobile Cards */}
        <div className="lg:hidden space-y-8">
          {items.map((item, index) => (
            <BlurFade key={item.id} delay={BLUR_FADE_DELAY * (4 + index)}>
              <Card className={`p-6 border-0 shadow-lg ${
                item.recommended 
                  ? 'ring-2 ring-oklch(240.325 100% 50%) bg-oklch(240.325 100% 50%)/5' 
                  : 'bg-white'
              }`}>
                {(item.popular || item.recommended) && (
                  <div className="text-center mb-4">
                    <Badge className={`${
                      item.recommended 
                        ? 'bg-oklch(240.325 100% 50%) text-white' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.recommended ? 'Recommended' : 'Popular'}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <div className="text-3xl font-bold text-oklch(240.325 100% 50%) mb-2">
                    {item.price}
                  </div>
                  {item.priceNote && (
                    <p className="text-sm text-gray-500">{item.priceNote}</p>
                  )}
                  <p className="text-gray-600 mt-4">{item.description}</p>
                </div>

                {item.highlights && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
                    <div className="space-y-2">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-oklch(240.325 100% 50%) flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  {item.features.map((category) => (
                    <div key={category.category}>
                      <h5 className="font-medium text-gray-900 mb-2">{category.category}</h5>
                      <div className="space-y-2">
                        {category.items.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{feature.name}</span>
                            {renderFeatureValue(feature.included, feature.tooltip)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    item.recommended
                      ? 'bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  onClick={() => window.open(item.cta.href, '_blank')}
                >
                  {item.cta.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Card className="overflow-hidden bg-white border-0 shadow-lg">
              {/* Header Row */}
              <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900">Compare Services</h3>
                </div>
                {items.map((item) => (
                  <div key={item.id} className={`p-6 text-center ${
                    item.recommended ? 'bg-oklch(240.325 100% 50%)/5 border-x-2 border-oklch(240.325 100% 50%)' : ''
                  }`}>
                    {(item.popular || item.recommended) && (
                      <Badge className={`mb-3 ${
                        item.recommended 
                          ? 'bg-oklch(240.325 100% 50%) text-white' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {item.recommended ? 'Recommended' : 'Popular'}
                      </Badge>
                    )}
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="text-2xl font-bold text-oklch(240.325 100% 50%) mb-1">
                      {item.price}
                    </div>
                    {item.priceNote && (
                      <p className="text-xs text-gray-500">{item.priceNote}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-3">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {allCategories.map((category) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="grid grid-cols-4 bg-gray-25 border-b border-gray-100">
                    <div className="p-4 font-semibold text-gray-900 bg-gray-50">
                      {category}
                    </div>
                    <div className="col-span-3"></div>
                  </div>
                  
                  {/* Category Features */}
                  {items[0]?.features.find(f => f.category === category)?.items.map((feature, featureIndex) => (
                    <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-25 transition-colors">
                      <div className="p-4 text-sm text-gray-700 flex items-center gap-2">
                        {feature.name}
                        {feature.tooltip && (
                          <button
                            onMouseEnter={() => setExpandedTooltip(feature.tooltip!)}
                            onMouseLeave={() => setExpandedTooltip(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors relative"
                          >
                            <Info className="h-3 w-3" />
                            {expandedTooltip === feature.tooltip && (
                              <div className="absolute left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                                {feature.tooltip}
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                      {items.map((item) => {
                        const categoryData = item.features.find(f => f.category === category);
                        const featureData = categoryData?.items.find(f => f.name === feature.name);
                        return (
                          <div key={item.id} className={`p-4 text-center flex items-center justify-center ${
                            item.recommended ? 'bg-oklch(240.325 100% 50%)/2' : ''
                          }`}>
                            {featureData && renderFeatureValue(featureData.included, featureData.tooltip)}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}

              {/* CTA Row */}
              <div className="grid grid-cols-4 bg-gray-50 p-6">
                <div></div>
                {items.map((item) => (
                  <div key={item.id} className="px-4">
                    <Button 
                      className={`w-full ${
                        item.recommended
                          ? 'bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      onClick={() => window.open(item.cta.href, '_blank')}
                    >
                      {item.cta.text}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </BlurFade>
        </div>

        {/* Bottom CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Need help choosing the right service? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                onClick={() => window.open('/contact', '_blank')}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
              >
                View All Services
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}