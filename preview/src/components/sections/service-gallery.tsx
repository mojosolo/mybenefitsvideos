"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { 
  Play, 
  Eye,
  Clock,
  Users,
  Building,
  ExternalLink,
  Filter,
  Grid,
  List
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  industry: string;
  results?: {
    metric: string;
    value: string;
  }[];
  tags: string[];
}

interface ServiceGalleryProps {
  title: string;
  subtitle: string;
  items: GalleryItem[];
  categories: string[];
  industries?: string[];
  showFilters?: boolean;
  viewType?: 'grid' | 'list';
}

export default function ServiceGallery({
  title,
  subtitle,
  items,
  categories,
  industries = [],
  showFilters = true,
  viewType = 'grid'
}: ServiceGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(viewType === 'grid');

  const filteredItems = items.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const industryMatch = activeIndustry === 'all' || item.industry === activeIndustry;
    return categoryMatch && industryMatch;
  });

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
          </BlurFade>
          
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <p className="text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Filters and View Toggle */}
        {showFilters && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <div className="flex flex-wrap gap-4">
                {/* Category Filters */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === 'all'
                          ? 'bg-oklch(240.325 100% 50%) text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activeCategory === category
                            ? 'bg-oklch(240.325 100% 50%) text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry Filters */}
                {industries.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Industry:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveIndustry('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activeIndustry === 'all'
                            ? 'bg-oklch(240.325 100% 50%) text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {industries.map(industry => (
                        <button
                          key={industry}
                          onClick={() => setActiveIndustry(industry)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            activeIndustry === industry
                              ? 'bg-oklch(240.325 100% 50%) text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded transition-colors ${
                    isGridView 
                      ? 'bg-oklch(240.325 100% 50%) text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded transition-colors ${
                    !isGridView 
                      ? 'bg-oklch(240.325 100% 50%) text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </BlurFade>
        )}

        {/* Gallery */}
        <div className={`${
          isGridView 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-8'
        }`}>
          {filteredItems.map((item, index) => (
            <BlurFade key={item.id} delay={BLUR_FADE_DELAY * (4 + index * 0.1)}>
              {isGridView ? (
                <Card 
                  className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-oklch(240.325 30% 85%) to-oklch(240.325 50% 75%) flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                        <p className="text-white font-medium text-sm">{item.title}</p>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center">
                        <Button 
                          size="sm"
                          className="bg-white/90 text-gray-900 hover:bg-white mb-3"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Preview
                        </Button>
                        <div className="flex items-center gap-4 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Sample
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-oklch(240.325 100% 50%) text-white">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-oklch(240.325 100% 50%) font-medium">
                        {item.industry}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.duration}
                      </span>
                    </div>

                    {/* Results */}
                    {item.results && item.results.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {item.results.slice(0, 2).map((result, resultIndex) => (
                          <div key={resultIndex} className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-oklch(240.325 100% 50%)">
                              {result.value}
                            </div>
                            <div className="text-xs text-gray-600">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-5 gap-6 p-6">
                    {/* Thumbnail */}
                    <div className="md:col-span-2">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <div className="w-full h-full bg-gradient-to-br from-oklch(240.325 30% 85%) to-oklch(240.325 50% 75%) flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                              <Play className="h-4 w-4 text-white ml-0.5" />
                            </div>
                            <p className="text-white text-sm font-medium">{item.title}</p>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-oklch(240.325 100% 50%) text-white text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {item.industry}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.duration}
                        </div>
                      </div>

                      {/* Results */}
                      {item.results && item.results.length > 0 && (
                        <div className="flex gap-4">
                          {item.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="text-center">
                              <div className="text-lg font-bold text-oklch(240.325 100% 50%)">
                                {result.value}
                              </div>
                              <div className="text-xs text-gray-600">
                                {result.metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
                        >
                          <Play className="mr-2 h-3 w-3" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </BlurFade>
          ))}
        </div>

        {/* View More Button */}
        {filteredItems.length > 6 && (
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="text-center mt-12">
              <Button 
                variant="outline"
                size="lg"
                className="border-oklch(240.325 100% 50%) text-oklch(240.325 100% 50%) hover:bg-oklch(240.325 100% 50%)/5"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Portfolio
              </Button>
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  );
}