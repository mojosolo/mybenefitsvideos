"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Clock, 
  Users, 
  TrendingUp, 
  PlayCircle,
  ArrowUpRight,
  Star
} from "lucide-react";
import Image from "next/image";
import { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCompactCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCompactCard({ caseStudy }: CaseStudyCompactCardProps) {
  return (
    <Card className={`p-6 bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
      caseStudy.featured ? 'ring-2 ring-oklch(240.325 100% 50%)/20 bg-oklch(240.325 100% 50%)/2' : ''
    }`}>
      <div className="space-y-4">
        {/* Video Thumbnail */}
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-oklch(240.325 100% 50%) to-oklch(240.325 100% 40%) rounded-lg overflow-hidden group cursor-pointer">
            <Image
              src={caseStudy.videoThumbnail}
              alt={`${caseStudy.title} video thumbnail`}
              fill
              className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/90 hover:bg-white transition-colors duration-300 rounded-full p-3 shadow-lg group-hover:scale-110 transform duration-300">
                <PlayCircle className="h-5 w-5 text-oklch(240.325 100% 50%)" />
              </button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {caseStudy.featured && (
                <Badge className="bg-orange-100 text-orange-800 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* ROI Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-100 text-green-800 text-xs font-bold">
                {caseStudy.results.roi}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/5 text-oklch(240.325 100% 40%) text-xs">
                {caseStudy.industry}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                {caseStudy.companySize}
              </Badge>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {caseStudy.title}
            </h3>
            
            <p className="text-sm text-oklch(240.325 100% 50%) font-medium">
              {caseStudy.client}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-3 w-3 text-gray-400" />
              </div>
              <div className="font-medium text-gray-900">{caseStudy.employeeCount}</div>
              <div className="text-gray-500">Employees</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-3 w-3 text-gray-400" />
              </div>
              <div className="font-medium text-gray-900">{caseStudy.timeline}</div>
              <div className="text-gray-500">Timeline</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <div className="font-medium text-green-600">{caseStudy.results.engagement}</div>
              <div className="text-gray-500">Engagement</div>
            </div>
          </div>

          {/* Challenge Preview */}
          <div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Key Results */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <div className="text-sm font-bold text-blue-600">
                {caseStudy.results.enrollment}
              </div>
              <div className="text-xs text-blue-700">Enrollment</div>
            </div>
            <div className="p-2 bg-purple-50 rounded border border-purple-100">
              <div className="text-sm font-bold text-purple-600">
                {caseStudy.results.satisfaction}
              </div>
              <div className="text-xs text-purple-700">Rating</div>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-1">
            {caseStudy.services.slice(0, 2).map((service, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-gray-100 text-gray-700 text-xs"
              >
                {service}
              </Badge>
            ))}
            {caseStudy.services.length > 2 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                +{caseStudy.services.length - 2}
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <Button 
            asChild
            size="sm"
            className="w-full bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white text-sm"
          >
            <a href={`/case-studies/${caseStudy.id}`}>
              View Case Study
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}