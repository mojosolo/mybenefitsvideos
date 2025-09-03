"use client";

import { VimeoGallery } from '@/components/VimeoPlayer';
import { getFeaturedVideos } from '@/lib/vimeo';
import { SERVICE_PRICING } from '@/lib/pricing';
import BlurFade from '@/components/magicui/blur-fade';
import { BLUR_FADE_DELAY } from '@/lib/config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, CheckCircle } from 'lucide-react';

export default function VideoShowcase() {
  const featuredVideos = getFeaturedVideos();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325_30%_70%)/10 border border-oklch(240.325_30%_70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325_100%_35%)">
                Video Portfolio
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              See Our Work in
              <span className="block text-oklch(240.325_100%_50%)">
                Benefits Video Production
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              From simple explanations to full animations, we create videos that 
              help employees understand and appreciate their benefits.
            </p>
          </BlurFade>
        </div>

        {/* Service Pricing Overview */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <Card className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                ${SERVICE_PRICING.video.standard}/min
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Standard Video
              </div>
              <div className="text-xs text-gray-500">
                Branded with stock footage
              </div>
            </Card>

            <Card className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                ${SERVICE_PRICING.video['semi-custom']}/min
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Semi-Custom
              </div>
              <div className="text-xs text-gray-500">
                Branded animations
              </div>
            </Card>

            <Card className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                ${SERVICE_PRICING.video['full-custom']}/min
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Full Custom
              </div>
              <div className="text-xs text-gray-500">
                Fully customized
              </div>
            </Card>

            <Card className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                ${SERVICE_PRICING.video['full-animation']}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Full Animation
              </div>
              <div className="text-xs text-gray-500">
                Complete animation package
              </div>
            </Card>
          </div>
        </BlurFade>

        {/* Video Gallery */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mb-12">
            <VimeoGallery
              videos={featuredVideos}
              columns={2}
              className="max-w-5xl mx-auto"
            />
          </div>
        </BlurFade>

        {/* Additional Services Preview */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    OE Special
                  </Badge>
                  <h3 className="font-semibold text-gray-900">Teaser Videos</h3>
                </div>
                <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                  ${SERVICE_PRICING.addons.oeTeaserVideo}
                </div>
                <p className="text-sm text-gray-600">
                  1-minute promotional videos perfect for open enrollment campaigns and deadline-driven communications.
                </p>
              </Card>

              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="mb-4">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">
                    DIY Solution
                  </Badge>
                  <h3 className="font-semibold text-gray-900">PowerPoint License</h3>
                </div>
                <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                  ${SERVICE_PRICING.addons.diyPowerpoint}
                </div>
                <p className="text-sm text-gray-600">
                  Transform your PowerPoint presentations into professional videos with AI voiceover. +$1,000 for human voice.
                </p>
              </Card>

              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="mb-4">
                  <Badge className="bg-purple-100 text-purple-800 mb-2">
                    Global Reach
                  </Badge>
                  <h3 className="font-semibold text-gray-900">Alternative Languages</h3>
                </div>
                <div className="text-2xl font-bold text-oklch(240.325_100%_50%) mb-2">
                  ${SERVICE_PRICING.addons.altLanguage}/min
                </div>
                <p className="text-sm text-gray-600">
                  Available after English final approval. Reach your diverse workforce with multilingual benefits content.
                </p>
              </Card>
            </div>
          </div>
        </BlurFade>

        {/* CTA Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="text-center">
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-oklch(240.325_100%_50%)/5 to-oklch(240.325_100%_60%)/5 border border-oklch(240.325_100%_50%)/10 max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Benefits Video?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                See transparent pricing, get instant ROI calculations, and receive your custom proposal in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%) text-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Get Pricing Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325_100%_50%) text-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_50%)/5"
                >
                  View All Examples
                </Button>
              </div>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}