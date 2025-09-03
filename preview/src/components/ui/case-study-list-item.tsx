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
  ArrowUpRight,
  Target,
  CheckCircle
} from "lucide-react";
import Image from "next/image";
import { CaseStudy } from "@/lib/case-studies";

interface CaseStudyListItemProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyListItem({ caseStudy }: CaseStudyListItemProps) {
  return (
    <Card className={`p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300 ${
      caseStudy.featured ? 'ring-1 ring-oklch(240.325 100% 50%)/20 bg-oklch(240.325 100% 50%)/2' : ''
    }`}>
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Video Thumbnail - Smaller in List View */}
        <div className="lg:col-span-3">
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
                  <PlayCircle className="h-6 w-6 text-oklch(240.325 100% 50%)" />
                </button>
              </div>

              {/* Featured Badge */}
              {caseStudy.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-6 space-y-4">
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
            
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
              {caseStudy.title}
            </h3>
            
            <p className="text-lg text-oklch(240.325 100% 50%) font-medium">
              {caseStudy.client}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{caseStudy.employeeCount}</div>
                <div className="text-xs text-gray-500">Employees</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{caseStudy.timeline}</div>
                <div className="text-xs text-gray-500">Timeline</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-oklch(240.325 100% 50%)">{caseStudy.results.roi}</div>
                <div className="text-xs text-gray-500">ROI</div>
              </div>
            </div>
          </div>

          {/* Challenge & Solution - Condensed */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-red-500" />
                <span className="text-sm font-semibold text-gray-900">Challenge</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {caseStudy.challenge}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-900">Solution</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Services Used */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.services.slice(0, 3).map((service, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-gray-100 text-gray-700 text-xs"
              >
                {service}
              </Badge>
            ))}
            {caseStudy.services.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                +{caseStudy.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Results & Actions */}
        <div className="lg:col-span-3 space-y-4">
          {/* Key Results */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-oklch(240.325 100% 50%)" />
              Key Results
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="text-lg font-bold text-green-600 mb-1">
                  {caseStudy.results.engagement}
                </div>
                <div className="text-xs text-green-700">Engagement</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {caseStudy.results.roi}
                </div>
                <div className="text-xs text-blue-700">ROI</div>
              </div>
            </div>
          </div>

          {/* Quick Quote */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Quote className="h-4 w-4 text-oklch(240.325 100% 50%) mb-2" />
            <blockquote className="text-xs text-gray-700 leading-relaxed line-clamp-3 mb-2">
              "{caseStudy.quote}"
            </blockquote>
            <div className="text-xs">
              <div className="font-semibold text-gray-900">{caseStudy.quotePerson}</div>
              <div className="text-gray-600">{caseStudy.quoteTitle}</div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            asChild
            size="sm"
            className="w-full bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white text-sm"
          >
            <a href={`/case-studies/${caseStudy.id}`}>
              View Full Case Study
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}