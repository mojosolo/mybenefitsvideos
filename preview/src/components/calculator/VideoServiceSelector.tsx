"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Play, 
  Palette, 
  Sparkles, 
  Zap,
  Clock,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import { SERVICE_PRICING, formatCurrency, type PricingSelections, type VideoServiceType } from '@/lib/pricing';

interface VideoServiceSelectorProps {
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors?: Record<string, string>;
}

const videoServiceOptions = [
  {
    type: 'standard' as VideoServiceType,
    icon: <Play className="h-6 w-6" />,
    name: 'Standard Video',
    description: 'Branded with stock footage',
    pricePerMin: SERVICE_PRICING.video.standard,
    features: [
      'Professional script writing',
      'Branded graphics and animations', 
      'Stock footage and imagery',
      'High-quality voiceover',
      '2 rounds of revisions',
      'Multiple format delivery'
    ],
    popular: true
  },
  {
    type: 'semi-custom' as VideoServiceType,
    icon: <Palette className="h-6 w-6" />,
    name: 'Semi-Custom Video',
    description: 'Branded animations',
    pricePerMin: SERVICE_PRICING.video['semi-custom'],
    features: [
      'Everything in Standard, plus:',
      'Custom branded animations',
      'Company-specific imagery',
      'Enhanced visual design',
      'Custom graphic elements',
      'Advanced motion graphics'
    ],
    popular: false
  },
  {
    type: 'full-custom' as VideoServiceType,
    icon: <Sparkles className="h-6 w-6" />,
    name: 'Full Custom Video',
    description: 'Fully customized production',
    pricePerMin: SERVICE_PRICING.video['full-custom'],
    features: [
      'Everything in Semi-Custom, plus:',
      'Completely custom illustrations',
      'Unique animation style',
      'Custom character development',
      'Bespoke visual storytelling',
      'Premium production quality'
    ],
    popular: false
  },
  {
    type: 'full-animation' as VideoServiceType,
    icon: <Zap className="h-6 w-6" />,
    name: 'Full Animation',
    description: 'Complete animation package',
    pricePerMin: SERVICE_PRICING.video['full-animation'],
    isFlat: true,
    features: [
      'Premium animation package',
      'Custom character design',
      'Complex scene development',
      'Advanced motion graphics',
      'Cinematic quality production',
      'Unlimited revisions'
    ],
    popular: false
  }
];

export default function VideoServiceSelector({ 
  selections, 
  onSelectionsChange, 
  errors = {} 
}: VideoServiceSelectorProps) {
  
  const selectedOption = videoServiceOptions.find(opt => opt.type === selections.videoType);
  
  const updateVideoMinutes = (newMinutes: number) => {
    onSelectionsChange({ videoMinutes: Math.max(1, newMinutes) });
  };

  const calculateVideoPrice = () => {
    if (!selectedOption) return 0;
    
    if (selectedOption.isFlat) {
      return selectedOption.pricePerMin;
    }
    
    return selectedOption.pricePerMin * selections.videoMinutes;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Video Service
        </h2>
        <p className="text-gray-600">
          Select the level of customization that best fits your needs and budget
        </p>
      </div>

      {/* Service Type Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videoServiceOptions.map((option) => {
          const isSelected = selections.videoType === option.type;
          const price = option.isFlat ? 
            option.pricePerMin : 
            option.pricePerMin * selections.videoMinutes;
          
          return (
            <Card 
              key={option.type}
              className={`relative p-6 cursor-pointer transition-all border-2 ${
                isSelected 
                  ? 'border-oklch(240.325_100%_50%) bg-oklch(240.325_100%_50%)/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelectionsChange({ videoType: option.type })}
            >
              {option.popular && (
                <Badge className="absolute -top-2 left-4 bg-orange-100 text-orange-800 text-xs">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                  isSelected 
                    ? 'bg-oklch(240.325_100%_50%) text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {option.description}
                </p>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-oklch(240.325_100%_50%)">
                    {formatCurrency(price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.isFlat ? 'flat rate' : `${formatCurrency(option.pricePerMin)}/min`}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {option.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-oklch(240.325_100%_50%) rounded-full flex-shrink-0 mt-2" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
                {option.features.length > 3 && (
                  <div className="text-xs text-gray-500 mt-2">
                    +{option.features.length - 3} more features
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Video Duration Selector */}
      {selectedOption && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Video Duration
              </h3>
              <p className="text-gray-600">
                {selectedOption.isFlat 
                  ? 'Full Animation is a flat-rate service regardless of duration'
                  : 'Select the duration for your video (minimum 1 minute)'
                }
              </p>
            </div>

            {!selectedOption.isFlat && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="video-duration" className="text-sm font-medium">
                    Duration: {selections.videoMinutes} minute{selections.videoMinutes !== 1 ? 's' : ''}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateVideoMinutes(selections.videoMinutes - 1)}
                      disabled={selections.videoMinutes <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {selections.videoMinutes}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateVideoMinutes(selections.videoMinutes + 1)}
                      disabled={selections.videoMinutes >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Slider
                  id="video-duration"
                  min={1}
                  max={10}
                  step={1}
                  value={selections.videoMinutes}
                  onValueChange={(value) => updateVideoMinutes(value)}
                  className="w-full"
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 min</span>
                  <span>10 min</span>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {selectedOption.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedOption.isFlat 
                      ? 'Flat rate pricing'
                      : `${selections.videoMinutes} min × ${formatCurrency(selectedOption.pricePerMin)}/min`
                    }
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-oklch(240.325_100%_50%)">
                    {formatCurrency(calculateVideoPrice())}
                  </div>
                  <div className="text-sm text-gray-500">+ tax</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Add-On Services */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Video Services
        </h3>
        
        <div className="space-y-4">
          {/* OE Teaser Video */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Switch
                checked={selections.oeTeaserVideo}
                onCheckedChange={(checked) => onSelectionsChange({ oeTeaserVideo: checked })}
              />
              <div>
                <div className="font-medium text-gray-900">OE Teaser Video (1 min)</div>
                <div className="text-sm text-gray-600">Perfect for open enrollment campaigns</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-oklch(240.325_100%_50%)">
                {formatCurrency(SERVICE_PRICING.addons.oeTeaserVideo)}
              </div>
              <div className="text-xs text-gray-500">+ tax</div>
            </div>
          </div>

          {/* Rush Delivery */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Switch
                checked={selections.rush}
                onCheckedChange={(checked) => onSelectionsChange({ rush: checked })}
              />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-900">Rush Delivery</div>
                  <div className="text-sm text-gray-600">50% surcharge for expedited timeline</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-orange-600">+50%</div>
              <div className="text-xs text-gray-500">on video services</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Error Display */}
      {(errors.videoType || errors.videoMinutes) && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <div>
              {errors.videoType && <p>{errors.videoType}</p>}
              {errors.videoMinutes && <p>{errors.videoMinutes}</p>}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}