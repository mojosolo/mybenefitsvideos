"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Clock, Tag } from 'lucide-react';
import { VimeoVideo, formatDuration, generateEmbedUrl } from '@/lib/vimeo';

interface VimeoPlayerProps {
  video: VimeoVideo;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  showMetadata?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export default function VimeoPlayer({ 
  video, 
  autoplay = false, 
  muted = true,
  className = '',
  showMetadata = true,
  aspectRatio = '16:9'
}: VimeoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(autoplay);
  const [hasError, setHasError] = useState(false);

  const embedUrl = generateEmbedUrl(video.id, {
    autoplay,
    muted,
    controls: true
  });

  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  }[aspectRatio];

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <Card className={`overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className={`relative ${aspectRatioClass} bg-gray-100`}>
        {!showPlayer && !hasError ? (
          // Thumbnail with play button overlay
          <div 
            className="relative w-full h-full bg-gradient-to-br from-oklch(240.325_100%_50%)/10 to-oklch(240.325_100%_60%)/20 flex items-center justify-center cursor-pointer group"
            onClick={handlePlayClick}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <Button
              size="lg"
              className="relative z-10 bg-white text-oklch(240.325_100%_50%) hover:bg-gray-50 shadow-lg"
              onClick={handlePlayClick}
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Play Video
            </Button>
            
            {/* Service type badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-oklch(240.325_100%_50%) text-white">
                {video.serviceType.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>

            {/* Duration badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="secondary" className="bg-black/50 text-white">
                <Clock className="mr-1 h-3 w-3" />
                {formatDuration(video.duration)}
              </Badge>
            </div>
          </div>
        ) : showPlayer && !hasError ? (
          // Vimeo iframe player
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
            onLoad={handleLoad}
            onError={handleError}
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          // Error state
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-center">
              <div className="mb-2">Video unavailable</div>
              {video.privateUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(video.privateUrl, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Vimeo
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {showMetadata && (
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{video.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {video.category.replace('-', ' ')}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDuration(video.duration)}
              </span>
            </div>

            {video.privateUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(video.privateUrl, '_blank')}
                className="text-oklch(240.325_100%_50%) hover:text-oklch(240.325_100%_45%)"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

// Video gallery component for showcasing multiple videos
interface VimeoGalleryProps {
  videos: VimeoVideo[];
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function VimeoGallery({ 
  videos, 
  title, 
  description, 
  columns = 3,
  className = ''
}: VimeoGalleryProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={className}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={`grid ${gridCols} gap-6`}>
        {videos.map((video, index) => (
          <VimeoPlayer
            key={video.id}
            video={video}
            showMetadata={true}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}