"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  contactFormSchema,
  type ContactFormData,
  defaultFormValues,
  projectTypeOptions,
  timelineOptions,
  employeeCountOptions,
  budgetPresets
} from "@/lib/contact-validation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Calendar,
  Zap,
  Upload,
  Shield,
  AlertCircle
} from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "hello@mojosolo.com",
    href: "mailto:hello@mojosolo.com"
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone", 
    value: "(555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Remote & On-site",
    href: null
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Response Time",
    value: "Within 24 hours",
    href: null
  }
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange'
  });

  const watchedMessage = watch('message', '');
  const watchedBudget = watch('budget', 10000);
  const watchedContactPreference = watch('contactPreference', 'email');

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const formatBudget = (value: number) => {
    if (value >= 100000) return '$100K+';
    return `$${(value / 1000).toFixed(0)}K`;
  };

  if (isSubmitted) {
    return (
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BlurFade delay={0}>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We've received your message and will get back to you within 24 hours. 
                We're excited to discuss your benefits video project!
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
              >
                Send Another Message
              </Button>
            </BlurFade>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Get Started
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your
              <span className="block text-oklch(240.325 100% 50%)">
                Benefits Communication?
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              Let's discuss your project and create videos that your employees will actually watch and understand.
            </p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Card className="p-8 bg-white border-0 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Submit Error */}
                  {submitError && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}

                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        placeholder="Your company"
                        {...register('company')}
                        className={errors.company ? 'border-red-500' : ''}
                      />
                      {errors.company && (
                        <p className="text-sm text-red-600">{errors.company.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...register('phone')}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Project Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectType">What type of project interests you? *</Label>
                        <Select
                          {...register('projectType')}
                          options={projectTypeOptions}
                          placeholder="Select project type"
                          error={errors.projectType?.message as string}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline *</Label>
                        <Select
                          {...register('timeline')}
                          options={timelineOptions}
                          placeholder="When do you need this?"
                          error={errors.timeline?.message as string}
                        />
                      </div>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-4">
                      <Label>Budget Range *</Label>
                      <div className="px-2">
                        <Slider
                          value={watchedBudget}
                          onValueChange={(value) => setValue('budget', value, { shouldValidate: true })}
                          min={1000}
                          max={100000}
                          step={1000}
                          formatValue={formatBudget}
                          marks={budgetPresets}
                          className="mb-4"
                        />
                        {errors.budget && (
                          <p className="text-sm text-red-600 mt-2">{errors.budget.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employeeCount">Number of Employees</Label>
                      <Select
                        {...register('employeeCount')}
                        options={employeeCountOptions}
                        placeholder="Select employee count"
                        error={errors.employeeCount?.message as string}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your project *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your benefits communication challenges, goals, or any specific requirements..."
                      {...register('message')}
                      rows={4}
                      maxLength={2000}
                      showCharCount
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Project Materials (Optional)</Label>
                    <FileUpload
                      onFilesChange={(files) => setValue('projectFiles', files)}
                      maxFiles={3}
                      maxSize={10}
                      acceptedTypes={['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.ppt', '.pptx']}
                      error={errors.projectFiles?.message as string}
                    />
                    <p className="text-xs text-gray-500">
                      Upload any existing materials, presentations, or documents related to your project.
                    </p>
                  </div>

                  {/* Contact Preference */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-900 mb-3">
                      How would you prefer to be contacted?
                    </Label>
                    <div className="flex gap-4">
                      {[
                        { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
                        { value: "phone", label: "Phone Call", icon: <Phone className="h-4 w-4" /> },
                        { value: "meeting", label: "Video Meeting", icon: <Calendar className="h-4 w-4" /> }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setValue('contactPreference', option.value as 'email' | 'phone' | 'meeting')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            watchedContactPreference === option.value
                              ? "bg-oklch(240.325 100% 50%) text-white border-oklch(240.325 100% 50%)"
                              : "bg-white text-gray-700 border-gray-200 hover:border-oklch(240.325 100% 50%)"
                          }`}
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compliance and Opt-ins */}
                  <div className="pt-4 space-y-4 border-t border-gray-100">
                    <div className="space-y-3">
                      <Checkbox
                        {...register('gdprConsent')}
                        id="gdprConsent"
                        error={errors.gdprConsent?.message as string}
                      >
                        <span className="text-sm">
                          I agree to the{' '}
                          <a href="/privacy" className="text-oklch(240.325 100% 50%) hover:underline" target="_blank">
                            Privacy Policy
                          </a>
                          {' '}and{' '}
                          <a href="/terms" className="text-oklch(240.325 100% 50%) hover:underline" target="_blank">
                            Terms of Service
                          </a>
                          {' '}*
                        </span>
                      </Checkbox>

                      <Checkbox
                        {...register('newsletterOptIn')}
                        id="newsletterOptIn"
                        label="Subscribe to our newsletter for benefits communication tips and updates"
                      />

                      <Checkbox
                        {...register('marketingOptIn')}
                        id="marketingOptIn"
                        label="I'd like to receive occasional marketing emails about relevant services and offers"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Shield className="h-3 w-3" />
                      Your information is secure and will never be shared with third parties.
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">
                      We'll get back to you within 24 hours. For urgent inquiries, call us directly.
                    </p>
                  </div>
                </form>
              </Card>
            </BlurFade>
          </div>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Contact Information */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-oklch(240.325 100% 50%)/10 rounded-lg flex items-center justify-center">
                        <div className="text-oklch(240.325 100% 50%)">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">{item.label}</div>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="font-medium text-gray-900 hover:text-oklch(240.325 100% 50%) transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="font-medium text-gray-900">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Meeting Scheduler */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Schedule a Meeting
                  </h4>
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                    onClick={() => window.open('https://calendly.com/mojosolo', '_blank')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book 15-min Discovery Call
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Perfect for discussing your project needs and getting a quick quote.
                  </p>
                </div>
              </Card>
            </BlurFade>

            {/* Quick Actions */}
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <Card className="p-6 bg-gradient-to-br from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 border border-oklch(240.325 100% 50%)/10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                    onClick={() => window.open('mailto:hello@mojosolo.com?subject=Urgent Inquiry', '_blank')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Urgent Email
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                    onClick={() => window.open('tel:+15551234567', '_blank')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call for Rush Projects
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                    onClick={() => window.open('/pricing', '_self')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Get Instant Pricing
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-oklch(240.325 100% 50%)/20">
                  <p className="text-xs text-gray-600">
                    <strong>Rush projects:</strong> Available with 50% surcharge for 2-week delivery. 
                    Call us to discuss your urgent timeline.
                  </p>
                </div>
              </Card>
            </BlurFade>

            {/* FAQ Preview */}
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Answers
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">How long does it take?</p>
                    <p className="text-gray-600">Standard projects: 3-4 weeks. Rush available.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">What's included?</p>
                    <p className="text-gray-600">Script, voiceover, animations, 2 revision rounds.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Starting price?</p>
                    <p className="text-gray-600">Foundation videos start at $2,499 (2 minutes).</p>
                  </div>
                </div>
              </Card>
            </BlurFade>

            {/* Testimonial */}
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="text-sm text-gray-600 mb-3">
                  "myBenefitsVideos.com transformed our boring benefits presentation into an engaging video that our employees actually watch. Enrollment increased 40%!"
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oklch(240.325 100% 50%)/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-oklch(240.325 100% 50%) rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Sarah Johnson</div>
                    <div className="text-xs text-gray-600">HR Director, TechCorp</div>
                  </div>
                </div>
              </Card>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}