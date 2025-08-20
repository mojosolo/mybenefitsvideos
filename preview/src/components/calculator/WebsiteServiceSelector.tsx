"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Monitor, 
  Globe, 
  Building,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { SERVICE_PRICING, formatCurrency, type PricingSelections, type WebsiteServiceType } from '@/lib/pricing';

interface WebsiteServiceSelectorProps {
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors?: Record<string, string>;
}

const websiteServiceOptions = [
  {
    type: 'none' as WebsiteServiceType,
    icon: null,
    name: 'No Website Service',
    description: 'Video services only',
    price: { initial: 0, annual: 0 },
    features: [],
    popular: false
  },
  {
    type: 'benefits-break' as WebsiteServiceType,
    icon: <Monitor className="h-6 w-6" />,
    name: 'Benefits Break Microsite',
    description: 'Interactive landing page with embedded videos',
    price: SERVICE_PRICING.website['benefits-break'],
    features: [
      'Custom responsive design',
      'Video integration and hosting',
      'Interactive benefit calculators',
      'Downloadable resources section',
      'Contact forms and support links',
      'Mobile-first responsive design',
      'SEO optimization included',
      'Analytics and tracking setup'
    ],
    popular: true
  },
  {
    type: 'full-benefits' as WebsiteServiceType,
    icon: <Globe className="h-6 w-6" />,
    name: 'Full Benefits Website',
    description: 'Comprehensive benefits portal',
    price: SERVICE_PRICING.website['full-benefits'],
    features: [
      'Everything in Benefits Break, plus:',
      'Multi-page website structure',
      'Advanced benefit calculators',
      'Employee login portal',
      'Document management system',
      'Integration with HR systems',
      'Advanced analytics dashboard',
      'Premium support included'
    ],
    popular: false
  },
  {
    type: 'custom-portal' as WebsiteServiceType,
    icon: <Building className="h-6 w-6" />,
    name: 'Custom Benefits Portal',
    description: 'Enterprise-grade benefits platform',
    price: SERVICE_PRICING.website['custom-portal'],
    features: [
      'Everything in Full Benefits, plus:',
      'Custom application development',
      'Advanced user management',
      'SSO and security integration',
      'Custom API development',
      'Enterprise-grade hosting',
      'Dedicated account management',
      'White-label options available'
    ],
    popular: false,
    enterprise: true
  }
];

export default function WebsiteServiceSelector({ 
  selections, 
  onSelectionsChange, 
  errors = {} 
}: WebsiteServiceSelectorProps) {
  
  const selectedOption = websiteServiceOptions.find(opt => opt.type === selections.websiteType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Website Services
        </h2>
        <p className="text-gray-600">
          Enhance your video investment with interactive websites that extend the benefits experience
        </p>
      </div>

      {/* Service Type Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websiteServiceOptions.map((option) => {
          const isSelected = selections.websiteType === option.type;
          const isNone = option.type === 'none';
          
          return (
            <Card 
              key={option.type}
              className={`relative p-6 cursor-pointer transition-all border-2 ${
                isSelected 
                  ? 'border-oklch(240.325_100%_50%) bg-oklch(240.325_100%_50%)/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isNone ? 'bg-gray-50' : ''}`}
              onClick={() => onSelectionsChange({ websiteType: option.type })}
            >
              {option.popular && (
                <Badge className="absolute -top-2 left-4 bg-orange-100 text-orange-800 text-xs">
                  Most Popular
                </Badge>
              )}
              
              {option.enterprise && (
                <Badge className="absolute -top-2 left-4 bg-purple-100 text-purple-800 text-xs">
                  Enterprise
                </Badge>
              )}
              
              <div className="text-center mb-6">
                {option.icon && (
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                    isSelected 
                      ? 'bg-oklch(240.325_100%_50%) text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon}
                  </div>
                )}
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {option.description}
                </p>
                
                {!isNone && (
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-oklch(240.325_100%_50%)">
                      {formatCurrency(option.price.initial)}
                      {option.enterprise && '+'}
                    </div>
                    <div className="text-xs text-gray-500">initial setup</div>
                    
                    <div className="text-lg font-semibold text-gray-700">
                      {formatCurrency(option.price.annual)}
                      {option.enterprise && '+'}
                    </div>
                    <div className="text-xs text-gray-500">annual maintenance</div>
                  </div>
                )}
              </div>

              {option.features.length > 0 && (
                <div className="space-y-2">
                  {option.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-oklch(240.325_100%_50%) flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                  {option.features.length > 4 && (
                    <div className="text-xs text-gray-500 mt-2">
                      +{option.features.length - 4} more features
                    </div>
                  )}
                </div>
              )}
              
              {isNone && (
                <div className="text-center text-gray-500">
                  <div className="text-sm">Choose this if you only need video services</div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Selected Service Summary */}
      {selectedOption && selectedOption.type !== 'none' && (
        <Card className="p-6 bg-gradient-to-r from-oklch(240.325_100%_50%)/5 to-oklch(240.325_100%_50%)/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-oklch(240.325_100%_50%) text-white rounded-lg flex items-center justify-center">
                {selectedOption.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedOption.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedOption.description}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Investment Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Setup:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedOption.price.initial)}
                      {selectedOption.enterprise && '+'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Maintenance:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedOption.price.annual)}
                      {selectedOption.enterprise && '+'}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Year 1 Total:</span>
                    <span className="text-oklch(240.325_100%_50%)">
                      {formatCurrency(selectedOption.price.initial + selectedOption.price.annual)}
                      {selectedOption.enterprise && '+'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">What's Included</h4>
                <div className="space-y-2">
                  {selectedOption.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-oklch(240.325_100%_50%) flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                  {selectedOption.features.length > 5 && (
                    <div className="text-sm text-gray-500">
                      ... and {selectedOption.features.length - 5} more features
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Video Bundle Benefits */}
      {selectedOption && selectedOption.type !== 'none' && selections.videoMinutes > 0 && (
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Perfect Integration with Your Videos
              </h3>
              <p className="text-green-800 mb-3">
                Your website will seamlessly integrate your video content with interactive tools 
                to create a comprehensive benefits experience for your employees.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <span>Enhanced employee engagement</span>
                <ArrowRight className="w-4 h-4" />
                <span>Better benefits utilization</span>
                <ArrowRight className="w-4 h-4" />
                <span>Reduced HR workload</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}