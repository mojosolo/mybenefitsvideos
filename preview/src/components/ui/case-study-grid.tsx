"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CaseStudyCard from "@/components/ui/case-study-card";
import CaseStudyListItem from "@/components/ui/case-study-list-item";
import CaseStudyCompactCard from "@/components/ui/case-study-compact-card";
import { CaseStudy } from "@/lib/case-studies";
import { ChevronDown, Loader2 } from "lucide-react";

type ViewMode = 'grid' | 'list' | 'compact';

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  viewMode: ViewMode;
  isLoading?: boolean;
  itemsPerPage?: number;
}

export default function CaseStudyGrid({ 
  caseStudies, 
  viewMode, 
  isLoading = false,
  itemsPerPage = 6 
}: CaseStudyGridProps) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleCaseStudies = caseStudies.slice(0, displayCount);
  const hasMore = displayCount < caseStudies.length;

  const loadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + itemsPerPage, caseStudies.length));
      setIsLoadingMore(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-oklch(240.325 100% 50%) mx-auto mb-4" />
          <p className="text-gray-600">Loading case studies...</p>
        </div>
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No case studies found
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Try adjusting your filters or search criteria to find relevant case studies.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Case Studies Display */}
      {viewMode === 'grid' && (
        <div className="grid gap-8">
          {visibleCaseStudies.map((study, index) => (
            <div key={study.id}>
              <CaseStudyCard caseStudy={study} />
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {visibleCaseStudies.map((study, index) => (
            <div key={study.id}>
              <CaseStudyListItem caseStudy={study} />
            </div>
          ))}
        </div>
      )}

      {viewMode === 'compact' && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleCaseStudies.map((study, index) => (
            <div key={study.id}>
              <CaseStudyCompactCard caseStudy={study} />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            onClick={loadMore}
            disabled={isLoadingMore}
            size="lg"
            variant="outline"
            className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading More...
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Load More Case Studies ({caseStudies.length - displayCount} remaining)
              </>
            )}
          </Button>
        </div>
      )}

      {/* End Message */}
      {!hasMore && caseStudies.length > itemsPerPage && (
        <div className="text-center pt-8 pb-4">
          <p className="text-gray-500 text-sm">
            You've viewed all {caseStudies.length} case studies matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}