"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Clock, 
  Users, 
  TrendingUp, 
  Star,
  PlayCircle,
  Quote,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className={`p-8 lg:p-10 bg-white border-0 shadow-sm ${
      caseStudy.featured ? 'ring-2 ring-oklch(240.325 100% 50%)/20 bg-oklch(240.325 100% 50%)/2' : ''
    }`}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Content */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {caseStudy.featured && (
                <Badge className="bg-orange-100 text-orange-800">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/5 text-oklch(240.325 100% 40%)">
                {caseStudy.industry}
              </Badge>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {caseStudy.title}
            </h3>
            
            <p className="text-lg text-oklch(240.325 100% 50%) font-medium">
              {caseStudy.client}
            </p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{caseStudy.employeeCount}</div>
                <div className="text-xs text-gray-500">Employees</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{caseStudy.timeline}</div>
                <div className="text-xs text-gray-500">Timeline</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">{caseStudy.services.length}</div>
                <div className="text-xs text-gray-500">Services</div>
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Our Solution</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Services Used */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Services Delivered</h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.services.map((service, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag, index) => (
              <Badge 
                key={index} 
                className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%) border border-oklch(240.325 100% 50%)/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results & Visual */}
        <div className="space-y-6">
          {/* Video Thumbnail */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-oklch(240.325 100% 50%) to-oklch(240.325 100% 40%) rounded-xl overflow-hidden group cursor-pointer">
              <Image
                src={caseStudy.videoThumbnail}
                alt={`${caseStudy.title} video thumbnail`}
                fill
                className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white transition-colors duration-300 rounded-full p-4 shadow-lg group-hover:scale-110 transform duration-300">
                  <PlayCircle className="h-8 w-8 text-oklch(240.325 100% 50%)" />
                </button>
              </div>

              {/* Case Study Label */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-900">
                  Case Study Video
                </Badge>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-oklch(240.325 100% 50%)" />
              Results Achieved
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {caseStudy.results.engagement}
                </div>
                <div className="text-sm text-green-700">Video Engagement</div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {caseStudy.results.enrollment}
                </div>
                <div className="text-sm text-blue-700">Enrollment Impact</div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {caseStudy.results.roi}
                </div>
                <div className="text-sm text-purple-700">ROI Achievement</div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {caseStudy.results.satisfaction}
                </div>
                <div className="text-sm text-orange-700">Employee Rating</div>
              </div>
              
              {caseStudy.results.additional && (
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Additional Impact
                  </div>
                  <div className="text-sm text-gray-700">
                    {caseStudy.results.additional}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Client Quote */}
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <Quote className="h-6 w-6 text-oklch(240.325 100% 50%) mb-3" />
            <blockquote className="text-gray-700 mb-4 leading-relaxed">
              "{caseStudy.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-oklch(240.325 100% 50%)/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-oklch(240.325 100% 50%) rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{caseStudy.quotePerson}</div>
                <div className="text-sm text-gray-600">{caseStudy.quoteTitle}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              asChild
              className="flex-1 bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
            >
              <a href={`/case-studies/${caseStudy.id}`}>
                View Full Case Study
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline"
              className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
            >
              Similar Project Quote
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}