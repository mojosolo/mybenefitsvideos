"use client";

import { useEffect } from "react";
import PricingCalculator from "@/components/PricingCalculator";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

export default function CalculatorPage() {
  // Set document title for SEO
  useEffect(() => {
    document.title = "Benefits Video Pricing Calculator - myBenefitsVideos.com";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get transparent pricing and ROI analysis for your benefits video project. Interactive calculator with real-time pricing updates and industry benchmarks.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/25 [mask-image:linear-gradient(0deg,transparent,black,transparent)] pointer-events-none" />
      
      <div className="relative">
        {/* Hero Section */}
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325_30%_70%)/10 border border-oklch(240.325_30%_70%)/20 mb-6">
                  <span className="text-sm font-medium text-oklch(240.325_100%_35%)">
                    Interactive Pricing Tool
                  </span>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Calculate Your
                  <span className="block text-oklch(240.325_100%_50%)">
                    Benefits Video Investment
                  </span>
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
                  Get transparent pricing, see your ROI, and receive a custom proposal 
                  in just a few minutes.
                </p>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">5 min</div>
                    <div className="text-sm text-gray-600">to complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">100%</div>
                    <div className="text-sm text-gray-600">transparent pricing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">24hrs</div>
                    <div className="text-sm text-gray-600">response time</div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <PricingCalculator 
                className="max-w-7xl mx-auto"
              />
            </BlurFade>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 lg:py-16 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                  Trusted by HR Teams Nationwide
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                    <div className="text-sm text-gray-600">Successful Projects</div>
                    <div className="text-xs text-gray-500 mt-2">Benefits videos delivered</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                    <div className="text-xs text-gray-500 mt-2">Would recommend to others</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                    <div className="text-sm text-gray-600">Average ROI</div>
                    <div className="text-xs text-gray-500 mt-2">Improvement in engagement</div>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Fortune 500</div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Healthcare</div>
                    <div className="text-xs text-gray-500">Organizations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Tech</div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Non-Profits</div>
                    <div className="text-xs text-gray-500">& Government</div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
                  Frequently Asked Questions
                </h2>
              </BlurFade>

              <div className="grid md:grid-cols-2 gap-8">
                <BlurFade delay={BLUR_FADE_DELAY * 8}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        How accurate is the pricing calculator?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Our calculator provides 95% accurate pricing based on your selections. 
                        Final pricing may vary slightly based on specific requirements discussed during consultation.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What's included in the quoted price?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Everything needed for a complete video: scriptwriting, professional voiceover, 
                        custom graphics, animation, 2 revision rounds, and HD delivery in multiple formats.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Can I customize my package after using the calculator?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Absolutely! The calculator provides a starting point. We'll work with you 
                        to customize the package to meet your specific needs and budget.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        How long does production take?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Standard delivery is 3-4 weeks from project kickoff. Rush delivery 
                        (2 weeks) is available with a 50% surcharge on video-related costs.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What if I'm not satisfied with the final video?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We offer a 100% satisfaction guarantee. We include 2 revision rounds 
                        and will work with you until you're completely happy with the result.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Do you work with companies of all sizes?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Yes! We've worked with organizations from 50 to 50,000+ employees. 
                        Our pricing scales appropriately, and our ROI calculations adjust to your size.
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}