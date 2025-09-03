"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, CreditCard, FileText, Play } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

export default function ServiceDisclaimers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Important Service Information
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please review these important terms and policies for our video production services.
            </p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Payment Terms</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• 50% to start, 50% at V2 approval</p>
                <p>• Net 30 with PO for approved enterprises</p>
                <p>• All prices exclude taxes</p>
                <p>• V3+ edits: $650 additional</p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Timelines</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Standard Video: 15 business days</p>
                <p>• Semi-Custom: 20 business days</p>
                <p>• Full Custom: 25 business days</p>
                <p>• Full Animation: 4-6 weeks</p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Review Process</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Vimeo reviews only</p>
                <p>• 2 rounds included</p>
                <p>• Unreviewed content ≥10 days will be invoiced</p>
                <p>• HD delivery in multiple formats</p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Rush Service</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• +50% surcharge on video services</p>
                <p>• 2 weeks or less delivery</p>
                <p>• Subject to availability</p>
                <p>• Same quality standards maintained</p>
              </div>
            </Card>
          </BlurFade>
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              Alternative language versions available for $250/minute + tax after English final approval. 
              DIY PowerPoint License: $2,500 + tax (AI voice), add $1,000 for human voice. 
              Website services include annual maintenance fees. All timelines subject to client approval cycles.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}