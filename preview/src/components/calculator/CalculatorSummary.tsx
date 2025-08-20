"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  type PricingSelections,
  type PricingBreakdown,
  type ROIMetrics,
  formatCurrency,
  formatNumber 
} from '@/lib/pricing';
import { 
  Send,
  Download,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Star,
  Shield,
  AlertCircle
} from 'lucide-react';

// Lead capture form schema
const leadCaptureSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().min(2, 'Company name is required'),
  title: z.string().optional(),
  employeeCount: z.string(),
  timeline: z.string(),
  primaryGoal: z.string(),
  currentChallenges: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'meeting']),
  marketingOptIn: z.boolean(),
  gdprConsent: z.boolean().refine((val) => val === true, 'You must accept the terms to continue')
});

type LeadCaptureForm = z.infer<typeof leadCaptureSchema>;

interface CalculatorSummaryProps {
  pricing: PricingBreakdown;
  roiMetrics: ROIMetrics;
  selections: PricingSelections;
  employeeCount: number;
  onLeadCapture?: (data: any) => void;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors: Record<string, string>;
  isLoading: boolean;
}

const timelineOptions = [
  { value: 'asap', label: 'ASAP (Rush delivery available)' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'planning', label: 'Still planning / researching' }
];

const goalOptions = [
  { value: 'engagement', label: 'Increase employee engagement' },
  { value: 'enrollment', label: 'Improve benefits enrollment rates' },
  { value: 'efficiency', label: 'Reduce HR workload and questions' },
  { value: 'communication', label: 'Better benefits communication' },
  { value: 'modernize', label: 'Modernize benefits presentation' }
];

const employeeCountOptions = [
  { value: '1-50', label: '1-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' }
];

export default function CalculatorSummary({ 
  pricing, 
  roiMetrics,
  selections,
  employeeCount,
  onLeadCapture,
  onSelectionsChange,
  errors, 
  isLoading 
}: CalculatorSummaryProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors }
  } = useForm<LeadCaptureForm>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      employeeCount: getEmployeeCountRange(employeeCount),
      timeline: '1-2-months',
      primaryGoal: 'engagement',
      preferredContact: 'email',
      marketingOptIn: true,
      gdprConsent: false
    }
  });

  function getEmployeeCountRange(count: number): string {
    if (count <= 50) return '1-50';
    if (count <= 200) return '51-200';
    if (count <= 500) return '201-500';
    if (count <= 1000) return '501-1000';
    return '1000+';
  }

  const watchedPreferredContact = watch('preferredContact');

  const onSubmit = async (data: LeadCaptureForm) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Prepare the complete lead data
      const leadData = {
        ...data,
        calculatorData: {
          selections,
          pricing,
          roiMetrics,
          employeeCount,
          timestamp: new Date().toISOString()
        }
      };

      // Submit to API
      const response = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit lead');
      }

      // Call the callback if provided
      if (onLeadCapture) {
        onLeadCapture(leadData);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Lead submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Exporting PDF proposal...');
  };

  const handleScheduleMeeting = () => {
    // TODO: Open calendar booking
    window.open('https://calendly.com/mojosolo/discovery', '_blank');
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Card className="p-8 bg-green-50 border-green-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We've received your information and will get back to you within 24 hours 
            with a detailed proposal and next steps.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              onClick={handleExportPDF}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Your Quote
            </Button>
            <Button 
              onClick={handleScheduleMeeting}
              className="bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%)"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Discovery Call
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Check your email for a copy of your pricing breakdown and ROI analysis.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Custom Proposal
        </h2>
        <p className="text-gray-600">
          Complete the form below to receive a detailed proposal and connect with our team.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card className="p-4 bg-oklch(240.325_30%_95%) border-oklch(240.325_30%_70%)">
          <div className="text-center">
            <DollarSign className="h-6 w-6 text-oklch(240.325_100%_50%) mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(pricing.totalDueNow)}
            </div>
            <div className="text-xs text-gray-600">Total Investment</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(roiMetrics.annualSavings)}
            </div>
            <div className="text-xs text-gray-600">Annual Savings</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {roiMetrics.breakEvenMonths}
            </div>
            <div className="text-xs text-gray-600">Months to ROI</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(roiMetrics.costPerEmployee)}
            </div>
            <div className="text-xs text-gray-600">Per Employee</div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Lead Capture Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Let's Connect
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Submit Error */}
              {submitError && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Your full name"
                    className={formErrors.name ? 'border-red-500' : ''}
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="you@company.com"
                    className={formErrors.email ? 'border-red-500' : ''}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Your company"
                    className={formErrors.company ? 'border-red-500' : ''}
                  />
                  {formErrors.company && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.company.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="(555) 123-4567"
                    className={formErrors.phone ? 'border-red-500' : ''}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Your Title/Role</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="HR Director, Benefits Manager, etc."
                />
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Project Details</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <select
                      id="employeeCount"
                      {...register('employeeCount')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%)"
                    >
                      {employeeCountOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline">When do you need this?</Label>
                    <select
                      id="timeline"
                      {...register('timeline')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%)"
                    >
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="primaryGoal">What's your primary goal?</Label>
                  <select
                    id="primaryGoal"
                    {...register('primaryGoal')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%)"
                  >
                    {goalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="currentChallenges">Current Benefits Communication Challenges (Optional)</Label>
                  <Textarea
                    id="currentChallenges"
                    {...register('currentChallenges')}
                    placeholder="What specific challenges are you facing with benefits communication?"
                    rows={3}
                  />
                </div>
              </div>

              {/* Contact Preference */}
              <div>
                <Label className="block text-sm font-medium text-gray-900 mb-3">
                  How would you prefer to be contacted?
                </Label>
                <div className="flex gap-4">
                  {[
                    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
                    { value: "phone", label: "Phone", icon: <Phone className="h-4 w-4" /> },
                    { value: "meeting", label: "Video Meeting", icon: <Calendar className="h-4 w-4" /> }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue('preferredContact', option.value as 'email' | 'phone' | 'meeting')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        watchedPreferredContact === option.value
                          ? "bg-oklch(240.325_100%_50%) text-white border-oklch(240.325_100%_50%)"
                          : "bg-white text-gray-700 border-gray-200 hover:border-oklch(240.325_100%_50%)"
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <Checkbox
                  {...register('marketingOptIn')}
                  id="marketingOptIn"
                  label="I'd like to receive helpful tips and updates about benefits communication"
                />

                <Checkbox
                  {...register('gdprConsent')}
                  id="gdprConsent"
                  error={formErrors.gdprConsent?.message}
                >
                  <span className="text-sm">
                    I agree to the{' '}
                    <a href="/privacy" className="text-oklch(240.325_100%_50%) hover:underline" target="_blank">
                      Privacy Policy
                    </a>
                    {' '}and consent to being contacted about this inquiry *
                  </span>
                </Checkbox>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="h-3 w-3" />
                  Your information is secure and will never be shared with third parties.
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%)"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Get My Custom Proposal
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                We'll get back to you within 24 hours with a detailed proposal.
              </p>
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                onClick={handleExportPDF}
                variant="outline"
                className="w-full justify-start border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF Quote
              </Button>
              
              <Button 
                onClick={handleScheduleMeeting}
                variant="outline"
                className="w-full justify-start border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/10"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule 15-min Call
              </Button>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              What Happens Next?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-medium text-blue-900">Proposal Delivery</p>
                  <p className="text-blue-700">Receive your custom proposal within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-medium text-blue-900">Discovery Call</p>
                  <p className="text-blue-700">15-minute call to discuss your specific needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-medium text-blue-900">Project Kickoff</p>
                  <p className="text-blue-700">If approved, we begin production immediately</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-sm text-green-800 mb-3">
              "The ROI calculator was spot-on. We saw a 40% increase in enrollment 
              and cut our benefits questions in half. Best investment we've made."
            </p>
            <div className="text-xs text-green-600">
              <strong>Sarah M.</strong> - HR Director, TechCorp (850 employees)
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need to Talk Now?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:hello@mojosolo.com" className="text-oklch(240.325_100%_50%) hover:underline">
                    hello@mojosolo.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+15551234567" className="text-oklch(240.325_100%_50%) hover:underline">
                    (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}