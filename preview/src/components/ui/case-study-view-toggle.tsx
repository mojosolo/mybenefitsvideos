"use client";

import { Button } from "@/components/ui/button";
import { Grid3x3, List, LayoutGrid } from "lucide-react";

type ViewMode = 'grid' | 'list' | 'compact';

interface CaseStudyViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function CaseStudyViewToggle({ viewMode, onViewModeChange }: CaseStudyViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className={`px-3 py-1.5 ${
          viewMode === 'grid'
            ? 'bg-white shadow-sm text-oklch(240.325 100% 50%)'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
        }`}
      >
        <LayoutGrid className="h-4 w-4 mr-1.5" />
        Grid
      </Button>
      
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('list')}
        className={`px-3 py-1.5 ${
          viewMode === 'list'
            ? 'bg-white shadow-sm text-oklch(240.325 100% 50%)'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
        }`}
      >
        <List className="h-4 w-4 mr-1.5" />
        List
      </Button>

      <Button
        variant={viewMode === 'compact' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('compact')}
        className={`px-3 py-1.5 ${
          viewMode === 'compact'
            ? 'bg-white shadow-sm text-oklch(240.325 100% 50%)'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
        }`}
      >
        <Grid3x3 className="h-4 w-4 mr-1.5" />
        Compact
      </Button>
    </div>
  );
}