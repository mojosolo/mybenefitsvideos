"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  type PricingSelections,
  formatCurrency, 
  computePricing,
  SERVICE_PRICING 
} from '@/lib/pricing';
import { 
  Check, 
  Star, 
  Zap, 
  TrendingUp, 
  Award,
  Video,
  Globe,
  Layers
} from 'lucide-react';

interface PackagePresetsProps {
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors: Record<string, string>;
  isLoading: boolean;
}

interface PackageOption {
  id: 'good' | 'better' | 'best';
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPopular: boolean;
  badge?: string;
  gradient: string;
}

const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: 'good',
    name: 'GOOD',
    subtitle: 'Standard Video Only',
    price: formatCurrency(SERVICE_PRICING.video.standard * 2),
    description: 'Perfect for organizations getting started with benefits videos',
    features: [
      'Standard video (2 minutes)',
      'Professional scriptwriting',
      'Custom graphics & animation',
      '2 rounds of revisions',
      'HD video delivery',
      'Script consultation call'
    ],
    icon: <Video className="h-6 w-6" />,
    isPopular: false,
    gradient: 'from-blue-50 to-indigo-50'
  },
  {
    id: 'better',
    name: 'BETTER',
    subtitle: 'Video + Website',
    price: formatCurrency(SERVICE_PRICING.video.standard * 2 + SERVICE_PRICING.website['benefits-break'].initial),
    originalPrice: formatCurrency(SERVICE_PRICING.video.standard * 2 + SERVICE_PRICING.website['benefits-break'].initial),
    savings: formatCurrency(0),
    description: 'Ideal for comprehensive benefits communication campaigns',
    features: [
      'Everything in GOOD',
      'Custom Benefits Break microsite',
      'Interactive elements',
      'Mobile-responsive design',
      'Analytics dashboard',
      '$1,000 bundle savings'
    ],
    icon: <Globe className="h-6 w-6" />,
    isPopular: true,
    badge: 'Most Popular',
    gradient: 'from-oklch(240.325_30%_95%) to-oklch(240.325_40%_90%)'
  },
  {
    id: 'best',
    name: 'BEST',
    subtitle: 'Complete Solution',
    price: formatCurrency(10094), // Pre-calculated total for best package
    description: 'For organizations wanting the complete benefits video solution',
    features: [
      'Everything in BETTER',
      'Teaser video (1 minute)',
      'DIY PowerPoint license',
      'Alt-language version (2 min)',
      'Priority support',
      'Maximum value package'
    ],
    icon: <Award className="h-6 w-6" />,
    isPopular: false,
    badge: 'Best Value',
    gradient: 'from-amber-50 to-orange-50'
  }
];

export default function PackagePresets({ 
  selections, 
  onSelectionsChange, 
  errors, 
  isLoading 
}: PackagePresetsProps) {
  
  const handlePackageSelect = (packageId: 'good' | 'better' | 'best') => {
    if (packageId === 'good') {
      onSelectionsChange({
        videoType: 'standard',
        videoMinutes: 2,
        websiteType: 'none',
        oeTeaserVideo: false,
        altLanguageMinutes: 0,
        diyPowerpoint: false,
        rush: false
      });
    } else if (packageId === 'better') {
      onSelectionsChange({
        videoType: 'standard',
        videoMinutes: 2,
        websiteType: 'benefits-break',
        oeTeaserVideo: false,
        altLanguageMinutes: 0,
        diyPowerpoint: false,
        rush: false
      });
    }
    // Note: 'best' package not implemented in this simplified version
  };

  const renderPackageCard = (packageOption: PackageOption, index: number) => {
    const isSelected = (
      (packageOption.id === 'good' && selections.videoType === 'standard' && selections.videoMinutes === 2 && selections.websiteType === 'none') ||
      (packageOption.id === 'better' && selections.videoType === 'standard' && selections.videoMinutes === 2 && selections.websiteType === 'benefits-break')
    );
    
    return (
      <motion.div
        key={packageOption.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative ${packageOption.isPopular ? 'z-10' : 'z-0'}`}
      >
        <Card className={`
          relative p-6 h-full transition-all duration-300 cursor-pointer
          ${isSelected 
            ? 'border-2 border-oklch(240.325_100%_50%) shadow-lg bg-oklch(240.325_100%_50%)/5' 
            : 'border border-gray-200 hover:border-oklch(240.325_100%_50%)/50 hover:shadow-md'
          }
          ${packageOption.isPopular ? 'scale-105' : ''}
        `}
          onClick={() => handlePackageSelect(packageOption.id)}
        >
          {/* Badge */}
          {packageOption.badge && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className={`
                px-3 py-1 text-xs font-semibold
                ${packageOption.isPopular 
                  ? 'bg-oklch(240.325_100%_50%) text-white' 
                  : 'bg-amber-500 text-white'
                }
              `}>
                <Star className="h-3 w-3 mr-1" />
                {packageOption.badge}
              </Badge>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <div className={`
              inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
              ${isSelected ? 'bg-oklch(240.325_100%_50%)' : 'bg-gray-100'}
              transition-colors
            `}>
              <div className={isSelected ? 'text-white' : 'text-gray-600'}>
                {packageOption.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {packageOption.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {packageOption.subtitle}
            </p>

            {/* Pricing */}
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {packageOption.price}
              </span>
              {packageOption.originalPrice && (
                <div className="text-sm text-gray-500 mt-1">
                  <span className="line-through">{packageOption.originalPrice}</span>
                  <span className="text-green-600 font-medium ml-2">
                    Save {packageOption.savings}
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              {packageOption.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {packageOption.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-oklch(240.325_100%_50%)' : 'bg-green-100'}
                  `}>
                    <Check className={`h-3 w-3 ${isSelected ? 'text-white' : 'text-green-600'}`} />
                  </div>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Selection Button */}
          <Button
            className={`
              w-full transition-all
              ${isSelected
                ? 'bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%) text-white'
                : 'bg-white border-2 border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%) hover:text-white'
              }
            `}
            disabled={isLoading}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Selected
              </>
            ) : (
              'Select Package'
            )}
          </Button>

          {/* Selection indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-oklch(240.325_100%_50%) rounded-full flex items-center justify-center"
            >
              <Check className="h-4 w-4 text-white" />
            </motion.div>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Package
        </h2>
        <p className="text-gray-600">
          Start with a preset package that matches your needs. You can customize further in the next steps.
        </p>
      </div>

      {/* Error Display */}
      {/* Error handling removed since preset field no longer exists */}

      {/* Package Grid */}
      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PACKAGE_OPTIONS.map((option, index) => renderPackageCard(option, index))}
      </div>

      {/* Custom Configuration Option */}
      <div className="text-center pt-6 border-t border-gray-100">
        <Card className="p-6 bg-gray-50 border-dashed border-2 border-gray-200">
          <div className="max-w-md mx-auto">
            <Layers className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Something Custom?
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Want to build your package from scratch? You can customize every detail in the next steps.
            </p>
            <Button
              variant="outline"
              onClick={() => {/* Custom logic can be added here */}}
              className={`
                border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/10
                }
              `}
            >
              Build Custom Package
            </Button>
          </div>
        </Card>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-oklch(240.325_30%_95%) to-oklch(240.325_40%_90%) rounded-xl p-6 text-center">
        <div className="max-w-3xl mx-auto">
          <TrendingUp className="h-8 w-8 text-oklch(240.325_100%_50%) mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Why Choose Video for Benefits Communication?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%)">65%</div>
              <div className="text-sm text-gray-600">Higher Employee Engagement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%)">40%</div>
              <div className="text-sm text-gray-600">Increase in Enrollment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%)">60%</div>
              <div className="text-sm text-gray-600">Reduction in HR Questions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}