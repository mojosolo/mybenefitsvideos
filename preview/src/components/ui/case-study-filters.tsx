"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RangeSlider } from "@/components/ui/range-slider";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  Building2,
  TrendingUp,
  PlayCircle,
  Sparkles,
  Users
} from "lucide-react";
import { industries, companySizes, videoTypes, services, sortOptions } from "@/lib/case-studies";

export interface FilterState {
  industry: string;
  companySize: string;
  videoType: string;
  service: string;
  roiRange: [number, number];
  engagementRange: [number, number];
  showFeaturedOnly: boolean;
  sortBy: string;
}

interface CaseStudyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

export default function CaseStudyFilters({ 
  filters, 
  onFiltersChange, 
  resultCount, 
  totalCount 
}: CaseStudyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      industry: "All",
      companySize: "All",
      videoType: "All", 
      service: "All",
      roiRange: [200, 600],
      engagementRange: [200, 500],
      showFeaturedOnly: false,
      sortBy: 'featured'
    });
  };

  const hasActiveFilters = 
    filters.industry !== "All" ||
    filters.companySize !== "All" ||
    filters.videoType !== "All" ||
    filters.service !== "All" ||
    filters.roiRange[0] > 200 ||
    filters.roiRange[1] < 600 ||
    filters.engagementRange[0] > 200 ||
    filters.engagementRange[1] < 500 ||
    filters.showFeaturedOnly;

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.industry !== "All") count++;
    if (filters.companySize !== "All") count++;
    if (filters.videoType !== "All") count++;
    if (filters.service !== "All") count++;
    if (filters.roiRange[0] > 200 || filters.roiRange[1] < 600) count++;
    if (filters.engagementRange[0] > 200 || filters.engagementRange[1] < 500) count++;
    if (filters.showFeaturedOnly) count++;
    return count;
  };

  return (
    <Card className="p-6 bg-white border-0 shadow-sm">
      {/* Filter Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-oklch(240.325 100% 50%)" />
            <span className="font-semibold text-gray-900">Advanced Filters</span>
            {getActiveFilterCount() > 0 && (
              <Badge className="bg-oklch(240.325 100% 50%) text-white">
                {getActiveFilterCount()}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? (
              <>Less Filters <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>More Filters <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-oklch(240.325 100% 50%)">
              {resultCount}
            </span> of {totalCount} case studies
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <select
            value={filters.industry}
            onChange={(e) => updateFilter('industry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none text-sm"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Company Size Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
          <select
            value={filters.companySize}
            onChange={(e) => updateFilter('companySize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none text-sm"
          >
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Video Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Type</label>
          <select
            value={filters.videoType}
            onChange={(e) => updateFilter('videoType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none text-sm"
          >
            {videoTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-gray-100 pt-6 space-y-6">
          {/* Service Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select
              value={filters.service}
              onChange={(e) => updateFilter('service', e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none text-sm"
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* ROI Range Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ROI Range: {filters.roiRange[0]}% - {filters.roiRange[1]}%
            </label>
            <div className="max-w-md">
              <RangeSlider
                value={filters.roiRange}
                onValueChange={(value) => updateFilter('roiRange', value)}
                max={600}
                min={200}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>200%</span>
                <span>600%+</span>
              </div>
            </div>
          </div>

          {/* Engagement Range Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Engagement Improvement: {filters.engagementRange[0]}% - {filters.engagementRange[1]}%
            </label>
            <div className="max-w-md">
              <RangeSlider
                value={filters.engagementRange}
                onValueChange={(value) => updateFilter('engagementRange', value)}
                max={500}
                min={200}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>200%</span>
                <span>500%+</span>
              </div>
            </div>
          </div>

          {/* Featured Only Toggle */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="featured"
              checked={filters.showFeaturedOnly}
              onChange={(e) => updateFilter('showFeaturedOnly', e.target.checked)}
              className="data-[state=checked]:bg-oklch(240.325 100% 50%) data-[state=checked]:border-oklch(240.325 100% 50%)"
            />
            <label 
              htmlFor="featured" 
              className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-oklch(240.325 100% 50%)" />
              Show Featured Case Studies Only
            </label>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            
            {filters.industry !== "All" && (
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                <Building2 className="h-3 w-3 mr-1" />
                {filters.industry}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilter('industry', 'All')}
                />
              </Badge>
            )}

            {filters.companySize !== "All" && (
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                <Users className="h-3 w-3 mr-1" />
                {filters.companySize}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilter('companySize', 'All')}
                />
              </Badge>
            )}

            {filters.videoType !== "All" && (
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                <PlayCircle className="h-3 w-3 mr-1" />
                {filters.videoType}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilter('videoType', 'All')}
                />
              </Badge>
            )}

            {(filters.roiRange[0] > 200 || filters.roiRange[1] < 600) && (
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                <TrendingUp className="h-3 w-3 mr-1" />
                ROI: {filters.roiRange[0]}%-{filters.roiRange[1]}%
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilter('roiRange', [200, 600])}
                />
              </Badge>
            )}

            {filters.showFeaturedOnly && (
              <Badge variant="secondary" className="bg-oklch(240.325 100% 50%)/10 text-oklch(240.325 100% 50%)">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured Only
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => updateFilter('showFeaturedOnly', false)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}