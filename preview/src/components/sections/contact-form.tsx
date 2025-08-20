"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormField from "@/components/ui/form-field";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Calendar,
  Zap
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  employeeCount: string;
  message: string;
  contactPreference: string;
}

const projectTypes = [
  "Foundation Video (2 minutes)",
  "Teaser Video (1 minute)", 
  "Microsite + Video Bundle",
  "Complete Package (Best)",
  "DIY PowerPoint License",
  "Multi-language Version",
  "Not sure - need guidance"
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000", 
  "$10,000 - $25,000",
  "$25,000+",
  "Need custom quote"
];

const timelines = [
  "ASAP (Rush - 2 weeks)",
  "Standard (3-4 weeks)",
  "Flexible (5+ weeks)",
  "Planning for next year"
];

const employeeCounts = [
  "Under 100",
  "100-500",
  "500-1,000",
  "1,000-5,000",
  "5,000+"
];

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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    employeeCount: "",
    message: "",
    contactPreference: "email"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      label="Full Name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(value) => handleInputChange("name", value)}
                      required
                    />
                    <FormField
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      label="Company Name"
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(value) => handleInputChange("company", value)}
                      required
                    />
                    <FormField
                      label="Phone Number"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(value) => handleInputChange("phone", value)}
                    />
                  </div>

                  {/* Project Details */}
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Project Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="What type of project interests you?"
                        type="select"
                        value={formData.projectType}
                        onChange={(value) => handleInputChange("projectType", value)}
                        options={projectTypes}
                        placeholder="Select project type"
                        required
                      />
                      <FormField
                        label="Budget Range"
                        type="select"
                        value={formData.budget}
                        onChange={(value) => handleInputChange("budget", value)}
                        options={budgetRanges}
                        placeholder="Select budget range"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Timeline"
                        type="select"
                        value={formData.timeline}
                        onChange={(value) => handleInputChange("timeline", value)}
                        options={timelines}
                        placeholder="When do you need this?"
                        required
                      />
                      <FormField
                        label="Number of Employees"
                        type="select"
                        value={formData.employeeCount}
                        onChange={(value) => handleInputChange("employeeCount", value)}
                        options={employeeCounts}
                        placeholder="Select employee count"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <FormField
                    label="Tell us about your project"
                    type="textarea"
                    placeholder="Describe your benefits communication challenges, goals, or any specific requirements..."
                    value={formData.message}
                    onChange={(value) => handleInputChange("message", value)}
                    rows={4}
                  />

                  {/* Contact Preference */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      How would you prefer to be contacted?
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
                        { value: "phone", label: "Phone Call", icon: <Phone className="h-4 w-4" /> },
                        { value: "meeting", label: "Video Meeting", icon: <Calendar className="h-4 w-4" /> }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange("contactPreference", option.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            formData.contactPreference === option.value
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
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Call
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Rush Project Quote
                  </Button>
                </div>
              </Card>
            </BlurFade>

            {/* Testimonial */}
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="text-sm text-gray-600 mb-3">
                  "Mojo Solo transformed our boring benefits presentation into an engaging video that our employees actually watch. Enrollment increased 40%!"
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