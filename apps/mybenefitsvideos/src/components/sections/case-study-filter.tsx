"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlurFade from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CaseStudySearch from "@/components/ui/case-study-search";
import CaseStudyFilters, { FilterState } from "@/components/ui/case-study-filters";
import CaseStudyViewToggle from "@/components/ui/case-study-view-toggle";
import CaseStudyGrid from "@/components/ui/case-study-grid";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { caseStudies, CaseStudy } from "@/lib/case-studies";
import { 
  TrendingUp,
  Users,
  Award,
  PlayCircle,
  ArrowRight,
  Target
} from "lucide-react";

type ViewMode = 'grid' | 'list' | 'compact';

function CaseStudyFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    industry: "All",
    companySize: "All", 
    videoType: "All",
    service: "All",
    roiRange: [200, 600],
    engagementRange: [200, 500],
    showFeaturedOnly: false,
    sortBy: 'featured'
  });

  // Initialize from URL params
  useEffect(() => {
    const urlFilters: Partial<FilterState> = {};
    
    if (searchParams.get('industry')) urlFilters.industry = searchParams.get('industry')!;
    if (searchParams.get('companySize')) urlFilters.companySize = searchParams.get('companySize')!;
    if (searchParams.get('videoType')) urlFilters.videoType = searchParams.get('videoType')!;
    if (searchParams.get('service')) urlFilters.service = searchParams.get('service')!;
    if (searchParams.get('featured')) urlFilters.showFeaturedOnly = searchParams.get('featured') === 'true';
    if (searchParams.get('sort')) urlFilters.sortBy = searchParams.get('sort')!;
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search')!);
    if (searchParams.get('view')) setViewMode(searchParams.get('view') as ViewMode);

    if (Object.keys(urlFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...urlFilters }));
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.industry !== "All") params.set('industry', filters.industry);
    if (filters.companySize !== "All") params.set('companySize', filters.companySize);
    if (filters.videoType !== "All") params.set('videoType', filters.videoType);
    if (filters.service !== "All") params.set('service', filters.service);
    if (filters.showFeaturedOnly) params.set('featured', 'true');
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    if (searchQuery) params.set('search', searchQuery);
    if (viewMode !== 'grid') params.set('view', viewMode);

    const newUrl = params.toString() ? `?${params.toString()}` : '/case-studies';
    router.replace(newUrl, { scroll: false });
  }, [filters, searchQuery, viewMode, router]);

  // Filtered and sorted case studies
  const filteredAndSortedCaseStudies = useMemo(() => {
    let filtered = caseStudies.filter((study) => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          study.client,
          study.title,
          study.industry,
          study.challenge,
          study.solution,
          ...study.services,
          ...study.tags
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }

      // Industry filter
      if (filters.industry !== "All" && study.industry !== filters.industry) return false;
      
      // Company size filter
      if (filters.companySize !== "All") {
        const sizeMap = {
          'Small (50-200)': 'Small',
          'Mid-market (200-500)': 'Mid-market', 
          'Enterprise (500+)': 'Enterprise'
        };
        if (study.companySize !== sizeMap[filters.companySize as keyof typeof sizeMap]) return false;
      }

      // Video type filter
      if (filters.videoType !== "All" && !study.videoTypes.includes(filters.videoType)) return false;

      // Service filter  
      if (filters.service !== "All" && !study.services.some(s => s.includes(filters.service))) return false;

      // ROI range filter
      const roi = study.results.metrics.roiPercent;
      if (roi < filters.roiRange[0] || roi > filters.roiRange[1]) return false;

      // Engagement range filter
      const engagement = study.results.metrics.engagementPercent;
      if (engagement < filters.engagementRange[0] || engagement > filters.engagementRange[1]) return false;

      // Featured filter
      if (filters.showFeaturedOnly && !study.featured) return false;

      return true;
    });

    // Sort results
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'roi-desc':
          return b.results.metrics.roiPercent - a.results.metrics.roiPercent;
        case 'engagement-desc':
          return b.results.metrics.engagementPercent - a.results.metrics.engagementPercent;
        case 'date-desc':
          return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime();
        case 'company-size-desc':
          const sizeOrder = { 'Enterprise': 3, 'Mid-market': 2, 'Small': 1 };
          return sizeOrder[b.companySize] - sizeOrder[a.companySize];
        case 'timeline-asc':
          const getWeeks = (timeline: string) => parseInt(timeline.split(' ')[0]) || 0;
          return getWeeks(a.timeline) - getWeeks(b.timeline);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.results.metrics.roiPercent - a.results.metrics.roiPercent;
      }
    });
  }, [searchQuery, filters]);

  // Success stats
  const stats = [
    { 
      label: "Average ROI", 
      value: "385%", 
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Return on investment"
    },
    { 
      label: "Engagement Boost", 
      value: "315%", 
      icon: <Target className="h-5 w-5" />,
      description: "Average engagement increase"
    },
    { 
      label: "Client Success Rate", 
      value: "98%", 
      icon: <Award className="h-5 w-5" />,
      description: "Successful project completion"
    },
    { 
      label: "Employees Reached", 
      value: "50K+", 
      icon: <Users className="h-5 w-5" />,
      description: "Across all case studies"
    }
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-oklch(240.325 30% 70%)/10 border border-oklch(240.325 30% 70%)/20 mb-6">
              <span className="text-sm font-medium text-oklch(240.325 100% 35%)">
                Case Studies
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Real Results from Real
              <span className="block text-oklch(240.325 100% 50%)">
                Benefits Video Projects
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-gray-600 leading-relaxed">
              See how our benefits videos have transformed employee engagement and enrollment 
              across industries. Every project delivers measurable results.
            </p>
          </BlurFade>
        </div>

        {/* Success Stats */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-oklch(240.325 100% 50%)/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-oklch(240.325 100% 50%)">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-oklch(240.325 100% 50%) mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-900 text-sm font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-500 text-xs">
                  {stat.description}
                </div>
              </Card>
            ))}
          </div>
        </BlurFade>

        {/* Search */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="max-w-2xl mx-auto mb-8">
            <CaseStudySearch
              caseStudies={caseStudies}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </BlurFade>

        {/* Advanced Filters */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="mb-8">
            <CaseStudyFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filteredAndSortedCaseStudies.length}
              totalCount={caseStudies.length}
            />
          </div>
        </BlurFade>

        {/* View Toggle */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex justify-end mb-8">
            <CaseStudyViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </BlurFade>

        {/* Case Studies Display */}
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <CaseStudyGrid
            caseStudies={filteredAndSortedCaseStudies}
            viewMode={viewMode}
            isLoading={isLoading}
            itemsPerPage={viewMode === 'compact' ? 9 : viewMode === 'list' ? 5 : 3}
          />
        </BlurFade>

        {/* Bottom CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="mt-20 text-center">
            <Card className="p-8 lg:p-12 bg-gradient-to-r from-oklch(240.325 100% 50%)/5 to-oklch(240.325 100% 60%)/5 border border-oklch(240.325 100% 50%)/10 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join these industry leaders who've transformed their benefits communication 
                with engaging video content that drives real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 45%) text-white"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  View Sample Videos
                </Button>
              </div>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export default function CaseStudyFilter() {
  return (
    <Suspense fallback={
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full max-w-sm mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded max-w-lg mx-auto mb-8"></div>
              <div className="h-4 bg-gray-200 rounded max-w-md mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <CaseStudyFilterContent />
    </Suspense>
  );
}