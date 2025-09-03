"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  type PricingSelections,
  formatCurrency, 
  SERVICE_PRICING 
} from '@/lib/pricing';
import { 
  TrendingUp,
  Calendar,
  Zap,
  Award,
  Clock,
  Repeat,
  Info,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface SubscriptionPlansProps {
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors: Record<string, string>;
  isLoading: boolean;
}

interface SubscriptionPlan {
  id: 'none' | 'essential' | 'growth' | 'enterprise';
  name: string;
  subtitle: string;
  monthlyPrice: number;
  minutesIncluded: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPopular: boolean;
  badge?: string;
  color: {
    primary: string;
    background: string;
    border: string;
  };
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'none',
    name: 'One-Time Project',
    subtitle: 'No ongoing subscription',
    monthlyPrice: 0,
    minutesIncluded: 0,
    description: 'Perfect for single project needs',
    features: [
      'One-time video production',
      'All standard features included',
      'No recurring charges',
      'Ownership of all assets'
    ],
    icon: <Zap className="h-5 w-5" />,
    isPopular: false,
    color: {
      primary: 'text-gray-600',
      background: 'bg-gray-50',
      border: 'border-gray-200'
    }
  },
  {
    id: 'essential',
    name: 'Essential',
    subtitle: 'Perfect for smaller teams',
    monthlyPrice: SERVICE_PRICING.subscription.essential,
    minutesIncluded: SERVICE_PRICING.subscription_MINUTES.essential,
    description: 'Ideal for organizations with basic ongoing video needs',
    features: [
      '1 minute of video per month',
      'Rollover up to 3 months',
      'Priority email support',
      'Quarterly strategy calls',
      'Template library access'
    ],
    icon: <Calendar className="h-5 w-5" />,
    isPopular: false,
    color: {
      primary: 'text-blue-600',
      background: 'bg-blue-50',
      border: 'border-blue-200'
    }
  },
  {
    id: 'growth',
    name: 'Growth',
    subtitle: 'Most popular for mid-size companies',
    monthlyPrice: SERVICE_PRICING.subscription.growth,
    minutesIncluded: SERVICE_PRICING.subscription_MINUTES.growth,
    description: 'Best value for regular video production needs',
    features: [
      '3 minutes of video per month',
      'Rollover up to 3 months',
      'Priority phone support',
      'Monthly strategy calls',
      'Custom template creation',
      'Analytics dashboard'
    ],
    icon: <TrendingUp className="h-5 w-5" />,
    isPopular: true,
    badge: 'Most Popular',
    color: {
      primary: 'text-oklch(240.325_100%_50%)',
      background: 'bg-oklch(240.325_30%_95%)',
      border: 'border-oklch(240.325_30%_70%)'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For large organizations',
    monthlyPrice: SERVICE_PRICING.subscription.enterprise,
    minutesIncluded: SERVICE_PRICING.subscription_MINUTES.enterprise,
    description: 'Comprehensive solution for enterprise needs',
    features: [
      '6 minutes of video per month',
      'Rollover up to 3 months',
      'Dedicated account manager',
      'Weekly check-ins available',
      'Custom branding package',
      'Advanced analytics',
      'Rush delivery included'
    ],
    icon: <Award className="h-5 w-5" />,
    isPopular: false,
    badge: 'Best Value',
    color: {
      primary: 'text-purple-600',
      background: 'bg-purple-50',
      border: 'border-purple-200'
    }
  }
];

export default function SubscriptionPlans({ 
  selections, 
  onSelectionsChange, 
  errors, 
  isLoading 
}: SubscriptionPlansProps) {

  const handlePlanSelect = (plan: 'none' | 'essential' | 'growth' | 'enterprise') => {
    onSelectionsChange({ 
      subscriptionPlan: plan,
      subscriptionMonths: plan === 'none' ? 0 : selections.subscriptionMonths || 12 
    });
  };

  const handleMonthsChange = (months: number) => {
    onSelectionsChange({ subscriptionMonths: months });
  };

  const calculateSubscriptionTotal = () => {
    const monthlyRate = SERVICE_PRICING.subscription[selections.subscriptionPlan] || 0;
    return monthlyRate * (selections.subscriptionMonths || 0);
  };

  const calculateAnnualSavings = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.1; // 10% annual discount
  };

  const renderPlanCard = (plan: SubscriptionPlan, index: number) => {
    const isSelected = selections.subscriptionPlan === plan.id;
    
    return (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative ${plan.isPopular ? 'z-10' : 'z-0'}`}
      >
        <Card className={`
          relative p-6 h-full transition-all duration-300 cursor-pointer
          ${isSelected 
            ? `border-2 ${plan.color.border} shadow-lg ${plan.color.background}` 
            : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
          }
          ${plan.isPopular ? 'scale-105' : ''}
        `}
          onClick={() => handlePlanSelect(plan.id)}
        >
          {/* Badge */}
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className={`
                px-3 py-1 text-xs font-semibold
                ${plan.isPopular 
                  ? 'bg-oklch(240.325_100%_50%) text-white' 
                  : 'bg-purple-500 text-white'
                }
              `}>
                {plan.badge}
              </Badge>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <div className={`
              inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
              ${isSelected ? plan.color.background : 'bg-gray-100'}
              transition-colors
            `}>
              <div className={isSelected ? plan.color.primary : 'text-gray-600'}>
                {plan.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {plan.subtitle}
            </p>

            {/* Pricing */}
            <div className="mb-2">
              {plan.monthlyPrice > 0 ? (
                <>
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.monthlyPrice)}
                  </span>
                  <span className="text-gray-600 ml-1">/month</span>
                  {plan.minutesIncluded > 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      {plan.minutesIncluded} minute{plan.minutesIncluded > 1 ? 's' : ''} included
                    </div>
                  )}
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-900">
                  No subscription
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              {plan.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center
                    ${isSelected ? plan.color.background : 'bg-green-100'}
                  `}>
                    <CheckCircle className={`h-3 w-3 ${isSelected ? plan.color.primary : 'text-green-600'}`} />
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
                ? plan.id === 'none' 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%) text-white'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-oklch(240.325_100%_50%) hover:text-oklch(240.325_100%_50%)'
              }
            `}
            disabled={isLoading}
          >
            {isSelected ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Selected
              </>
            ) : (
              'Select Plan'
            )}
          </Button>

          {/* Selection indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute -top-2 -right-2 w-6 h-6 ${plan.color.background} ${plan.color.border} rounded-full flex items-center justify-center`}
            >
              <CheckCircle className={`h-4 w-4 ${plan.color.primary}`} />
            </motion.div>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Subscription Plan
        </h2>
        <p className="text-gray-600">
          Add ongoing video production to keep your benefits communication fresh and engaging.
        </p>
      </div>

      {/* Error Display */}
      {errors.subscriptionMonths && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <Zap className="h-5 w-5" />
            <p>{errors.subscriptionMonths}</p>
          </div>
        </div>
      )}

      {/* Plan Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {SUBSCRIPTION_PLANS.map((plan, index) => renderPlanCard(plan, index))}
      </div>

      {/* Subscription Length Selector */}
      {selections.subscriptionPlan !== 'none' && selections.subscriptionPlan && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              How many months would you like to subscribe?
            </h3>
            
            <div className="space-y-4">
              <Label className="block text-sm font-medium text-gray-700">
                Subscription Length: {selections.subscriptionMonths || 12} months
              </Label>
              <Slider
                value={selections.subscriptionMonths || 12}
                onValueChange={handleMonthsChange}
                min={1}
                max={36}
                step={1}
                formatValue={(value) => `${value} months`}
                marks={[
                  { value: 6, label: '6mo' },
                  { value: 12, label: '1yr' },
                  { value: 24, label: '2yr' },
                  { value: 36, label: '3yr' }
                ]}
                className="mb-4"
              />
              
              {selections.subscriptionMonths && selections.subscriptionMonths >= 12 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">Annual Commitment Benefits</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Unused minutes roll over up to 3 months
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Priority support and faster turnaround
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Flexible pause/resume options
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Subscription Summary */}
              <div className="bg-oklch(240.325_30%_95%) border border-oklch(240.325_30%_70%)/20 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Subscription Total</p>
                  <p className="text-2xl font-bold text-oklch(240.325_100%_50%)">
                    {formatCurrency(calculateSubscriptionTotal())}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatCurrency(SERVICE_PRICING.subscription[selections.subscriptionPlan] || 0)}/month × {selections.subscriptionMonths || 0} months
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Subscription Benefits */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center max-w-3xl mx-auto">
          <Repeat className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Why Choose a Subscription?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">60%</div>
              <div className="text-sm text-gray-600">More Cost Effective</div>
              <div className="text-xs text-gray-500 mt-1">vs. individual projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">3x</div>
              <div className="text-sm text-gray-600">Faster Turnaround</div>
              <div className="text-xs text-gray-500 mt-1">Priority production queue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Dedicated Support</div>
              <div className="text-xs text-gray-500 mt-1">Direct access to your team</div>
            </div>
          </div>
        </div>
      </Card>

      {/* No Subscription Selected */}
      {selections.subscriptionPlan === 'none' && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2 text-yellow-800">
            <Info className="h-4 w-4" />
            <p className="text-sm">
              <strong>No subscription selected.</strong> You can always add a subscription plan later 
              or work with us on individual projects as needed.
            </p>
          </div>
        </Card>
      )}

      {/* Contact for Custom Plans */}
      <Card className="p-6 text-center bg-gray-50 border-dashed border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Need a Custom Plan?
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Have unique requirements or need more than 6 minutes per month? 
          Let's create a plan that fits your organization perfectly.
        </p>
        <Button 
          variant="outline"
          className="border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/10"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Consultation
        </Button>
      </Card>
    </div>
  );
}