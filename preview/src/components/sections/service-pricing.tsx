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
  Calculator,
  Zap,
  Star,
  Clock,
  Users
} from "lucide-react";

interface PricingOption {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  excludedFeatures?: string[];
  popular?: boolean;
  cta: {
    text: string;
    href: string;
  };
  additionalInfo?: string;
}

interface ServicePricingProps {
  title: string;
  subtitle: string;
  options: PricingOption[];
  addOns?: {
    name: string;
    price: string;
    description: string;
    icon: React.ReactNode;
  }[];
  calculator?: {
    enabled: boolean;
    basePrice: number;
    extraMinutePrice?: number;
    rushMultiplier?: number;
  };
}

export default function ServicePricing({
  title,
  subtitle,
  options,
  addOns,
  calculator
}: ServicePricingProps) {
  const [selectedMinutes, setSelectedMinutes] = useState(2);
  const [rushDelivery, setRushDelivery] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const calculatePrice = () => {
    if (!calculator) return 0;
    
    let basePrice = calculator.basePrice;
    let extraMinutes = Math.max(0, selectedMinutes - 2);
    let extraCost = extraMinutes * (calculator.extraMinutePrice || 0);
    let subtotal = basePrice + extraCost;
    
    if (rushDelivery && calculator.rushMultiplier) {
      subtotal = subtotal * calculator.rushMultiplier;
    }
    
    return subtotal;
  };

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

        {/* Interactive Calculator */}
        {calculator && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="max-w-2xl mx-auto mb-16">
              <Card className="p-8 bg-gradient-to-br from-oklch(240.325 20% 97%) to-white border-0 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-oklch(240.325 100% 50%)/10 rounded-full mb-4">
                    <Calculator className="h-4 w-4 text-oklch(240.325 100% 50%)" />
                    <span className="text-sm font-medium text-oklch(240.325 100% 50%)">
                      Price Calculator
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Calculate Your Custom Price
                  </h3>
                  <p className="text-gray-600">
                    Adjust the options below to see real-time pricing
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Video Length Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Video Length (minutes)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={selectedMinutes}
                          onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="w-16 text-center">
                          <div className="text-2xl font-bold text-oklch(240.325 100% 50%)">
                            {selectedMinutes}
                          </div>
                          <div className="text-xs text-gray-500">min</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1 min</span>
                        <span>10+ min</span>
                      </div>
                    </div>

                    {/* Rush Delivery Option */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="font-medium text-gray-900">Rush Delivery</div>
                          <div className="text-sm text-gray-500">2 weeks or less</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setRushDelivery(!rushDelivery)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                          rushDelivery ? 'bg-oklch(240.325 100% 50%)' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                          rushDelivery ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center p-8 bg-white rounded-xl border border-oklch(240.325 100% 50%)/20">
                      <div className="text-4xl font-bold text-oklch(240.325 100% 50%) mb-2">
                        ${calculatePrice().toLocaleString()}
                      </div>
                      <div className="text-gray-600 mb-4">Total Project Cost</div>
                      
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex justify-between">
                          <span>Base ({Math.min(selectedMinutes, 2)} min):</span>
                          <span>${calculator.basePrice.toLocaleString()}</span>
                        </div>
                        {selectedMinutes > 2 && (
                          <div className="flex justify-between">
                            <span>Extra minutes ({selectedMinutes - 2}):</span>
                            <span>${((selectedMinutes - 2) * (calculator.extraMinutePrice || 0)).toLocaleString()}</span>
                          </div>
                        )}
                        {rushDelivery && (
                          <div className="flex justify-between text-orange-600">
                            <span>Rush surcharge (+50%):</span>
                            <span>+${(calculatePrice() - (calculator.basePrice + Math.max(0, selectedMinutes - 2) * (calculator.extraMinutePrice || 0))).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <Button 
                        className="w-full mt-6 bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%)"
                        onClick={() => window.open('/contact', '_blank')}
                      >
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Pricing Options */}
        <div className={`grid gap-8 ${options.length === 1 ? 'max-w-md mx-auto' : options.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3 max-w-6xl mx-auto'}`}>
          {options.map((option, index) => (
            <BlurFade key={option.id} delay={BLUR_FADE_DELAY * (4 + index)}>
              <Card className={`relative p-8 h-full border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                option.popular 
                  ? 'ring-2 ring-oklch(240.325 100% 50%) bg-oklch(240.325 100% 50%)/5 scale-105'
                  : 'bg-white hover:scale-105'
              }`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-oklch(240.325 100% 50%) text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {option.badge && (
                  <div className="mb-4">
                    <Badge className={`${
                      option.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                      option.badgeColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {option.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {option.name}
                  </h3>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    {option.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className={`text-4xl font-bold ${
                      option.popular ? 'text-oklch(240.325 100% 50%)' : 'text-gray-900'
                    }`}>
                      {option.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">
                    {option.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-oklch(240.325 100% 50%) flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {option.excludedFeatures?.map((feature, featureIndex) => (
                    <div key={`excluded-${featureIndex}`} className="flex items-start gap-3 opacity-50">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button 
                    className={`w-full mb-4 ${
                      option.popular
                        ? 'bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => window.open(option.cta.href, '_blank')}
                  >
                    {option.cta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {option.additionalInfo && (
                    <p className="text-xs text-gray-500 text-center">
                      {option.additionalInfo}
                    </p>
                  )}
                </div>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Add-ons Section */}
        {addOns && addOns.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="max-w-4xl mx-auto mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Popular Add-ons
                </h3>
                <p className="text-gray-600">
                  Enhance your project with these additional services
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {addOns.map((addOn, index) => (
                  <Card key={index} className="p-6 bg-white border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="text-oklch(240.325 100% 50%)">
                          {addOn.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{addOn.name}</h4>
                          <span className="text-lg font-bold text-oklch(240.325 100% 50%)">
                            {addOn.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {addOn.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  );
}