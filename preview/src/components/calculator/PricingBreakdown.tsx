"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  type PricingSelections,
  type PricingBreakdown as PricingBreakdownType,
  formatCurrency 
} from '@/lib/pricing';
import { 
  DollarSign,
  FileText,
  Clock,
  TrendingDown,
  Zap,
  Calendar,
  Info,
  CheckCircle,
  Download,
  Share,
  Calculator
} from 'lucide-react';

interface PricingBreakdownProps {
  pricing: PricingBreakdownType;
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors: Record<string, string>;
  isLoading: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'video': return <FileText className="h-4 w-4" />;
    case 'microsite': return <Calculator className="h-4 w-4" />;
    case 'license': return <Download className="h-4 w-4" />;
    case 'subscription': return <Calendar className="h-4 w-4" />;
    case 'addon': return <Zap className="h-4 w-4" />;
    default: return <DollarSign className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'video': return 'text-blue-600 bg-blue-50';
    case 'microsite': return 'text-green-600 bg-green-50';
    case 'license': return 'text-purple-600 bg-purple-50';
    case 'subscription': return 'text-oklch(240.325_100%_50%) bg-oklch(240.325_30%_95%)';
    case 'addon': return 'text-orange-600 bg-orange-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export default function PricingBreakdown({ 
  pricing, 
  selections, 
  onSelectionsChange, 
  errors, 
  isLoading 
}: PricingBreakdownProps) {

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    console.log('Exporting pricing breakdown...');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    const shareData = {
      title: 'Benefits Video Pricing',
      text: `Custom benefits video package: ${formatCurrency(pricing.totalDueNow)}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Investment Breakdown
        </h2>
        <p className="text-gray-600">
          Transparent pricing with no hidden fees. All prices exclude taxes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Line Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Project Components
            </h3>
            
            <div className="space-y-3">
              {pricing.lineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Discounts */}
            {pricing.discountItems.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Savings & Discounts
                </h4>
                <div className="space-y-2">
                  {pricing.discountItems.map((discount, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">{discount.label}</p>
                        {discount.description && (
                          <p className="text-xs text-green-600 mt-1">{discount.description}</p>
                        )}
                      </div>
                      <p className="font-semibold text-green-700">
                        -{formatCurrency(discount.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rush Surcharge */}
            {pricing.rushSurcharge > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">Rush Delivery Surcharge</span>
                  </div>
                  <p className="font-semibold text-red-700">
                    +{formatCurrency(pricing.rushSurcharge)}
                  </p>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  50% surcharge on video-related items for 2-week delivery
                </p>
              </div>
            )}
          </Card>

          {/* Payment Terms */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Payment Terms & Timeline
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Payment Structure</p>
                  <p className="text-blue-700">{pricing.paymentTerms}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Estimated Timeline</p>
                  <p className="text-blue-700">{pricing.estimatedTimeline}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">What's Included</p>
                  <p className="text-blue-700">Script development, design, animation, voiceover, 2 revision rounds, HD delivery</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          {/* Total Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Investment Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(pricing.subtotal)}</span>
              </div>
              
              {pricing.rushSurcharge > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Rush Surcharge</span>
                  <span className="font-medium">+{formatCurrency(pricing.rushSurcharge)}</span>
                </div>
              )}
              
              {pricing.discountItems.length > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Total Savings</span>
                  <span className="font-medium">
                    -{formatCurrency(pricing.discountItems.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
              )}
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Due Now</span>
                <span className="text-2xl font-bold text-oklch(240.325_100%_50%)">
                  {formatCurrency(pricing.totalDueNow)}
                </span>
              </div>
              
              {pricing.subscriptionTotal > 0 && (
                <>
                  <hr className="border-gray-200" />
                  <div className="bg-oklch(240.325_30%_95%) p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Subscription Total</span>
                      <span className="font-medium text-oklch(240.325_100%_50%)">
                        {formatCurrency(pricing.subscriptionTotal)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(pricing.monthlySubscriptionCost)}/month for {selections.subscriptionMonths} months
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Total Investment</span>
                    <span className="text-oklch(240.325_100%_50%)">
                      {formatCurrency(pricing.totalAllIn)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleExport}
              className="w-full bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%)"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF Quote
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleShare}
              className="w-full border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/10"
            >
              <Share className="h-4 w-4 mr-2" />
              Share Quote
            </Button>
          </div>

          {/* Quick Stats */}
          <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
            <h4 className="font-semibold text-gray-900 mb-3 text-center">
              Value Highlights
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cost per minute</span>
                <span className="font-medium">
                  {formatCurrency(Math.round(pricing.totalDueNow / Math.max(1, selections.videoMinutes + (selections.oeTeaserVideo ? 1 : 0))))}
                </span>
              </div>
              {selections.subscriptionPlan !== 'none' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly investment</span>
                  <span className="font-medium">
                    {formatCurrency(pricing.monthlySubscriptionCost)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Timeline</span>
                <span className="font-medium">{pricing.estimatedTimeline}</span>
              </div>
            </div>
          </Card>

          {/* Satisfaction Guarantee */}
          <Card className="p-4 bg-yellow-50 border-yellow-200 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-yellow-900 mb-1">
              100% Satisfaction Guarantee
            </h4>
            <p className="text-xs text-yellow-800">
              We're committed to your success. If you're not satisfied, we'll make it right.
            </p>
          </Card>
        </div>
      </div>

      {/* Detailed Terms */}
      <Card className="p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Important Details
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What's Included</h4>
            <ul className="space-y-1">
              <li>• Professional scriptwriting and consultation</li>
              <li>• Custom graphics and animation</li>
              <li>• Professional voiceover (AI or human)</li>
              <li>• 2 rounds of revisions included</li>
              <li>• HD video delivery in multiple formats</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
            <ul className="space-y-1">
              <li>• All prices exclude applicable taxes</li>
              <li>• V3+ edits available for $650 additional</li>
              <li>• Unreviewed content ≥10 days will be invoiced</li>
              <li>• Rush delivery available with 50% surcharge</li>
              <li>• Vimeo reviews only (no YouTube/social)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}