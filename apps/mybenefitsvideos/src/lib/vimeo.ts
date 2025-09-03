"use client";

/**
 * Vimeo API Integration for myBenefitsVideos.com
 * Handles video data fetching and embed URL generation
 */

export interface VimeoVideo {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  embedUrl: string;
  privateUrl?: string;
  serviceType: 'standard' | 'semi-custom' | 'full-custom' | 'full-animation' | 'oe-teaser' | 'alternate-language' | 'ppt-ai' | 'ppt-translated';
  category: 'video-production' | 'website-services' | 'additional-services';
}

/**
 * Video examples database with all provided Vimeo URLs
 */
export const videoExamples: VimeoVideo[] = [
  {
    id: '744821736',
    title: 'Standard Video Example',
    description: 'Branded with your logo and colors, utilizing stock footage to create an engaging video.',
    duration: 120, // estimated
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/744821736',
    privateUrl: 'https://vimeo.com/mojosolo/review/744821736/f7f2d71129',
    serviceType: 'standard',
    category: 'video-production'
  },
  {
    id: '1023365575',
    title: 'Semi-Custom Video Example',
    description: 'Includes branded animations and transitions for enhanced visual appeal.',
    duration: 90,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/1023365575',
    privateUrl: 'https://vimeo.com/mojosolo/review/1023365575/e9c128930b',
    serviceType: 'semi-custom',
    category: 'video-production'
  },
  {
    id: '874206654',
    title: 'Full Custom Video Example',
    description: 'Completely customized video production with unique animations and branding.',
    duration: 150,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/874206654',
    privateUrl: 'https://vimeo.com/mojosolo/review/874206654/ceb87d0226',
    serviceType: 'full-custom',
    category: 'video-production'
  },
  {
    id: '693745318',
    title: 'Full Animation Example',
    description: 'Complete animated video production with custom character design and storytelling.',
    duration: 180,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/693745318',
    privateUrl: 'https://vimeo.com/mojosolo/review/693745318/145fbe1647',
    serviceType: 'full-animation',
    category: 'video-production'
  },
  {
    id: '1110010927',
    title: 'Open Enrollment Teaser Example',
    description: 'One-minute OE teaser with branded logo and enrollment call-to-action.',
    duration: 60,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/1110010927',
    privateUrl: 'https://vimeo.com/mojosolo/review/1110010927/f91fb8db0b',
    serviceType: 'oe-teaser',
    category: 'additional-services'
  },
  {
    id: '1011042698',
    title: 'PowerPoint to Video AI Example',
    description: 'Transform PowerPoint presentations into professional videos with AI voiceover.',
    duration: 120,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/1011042698',
    privateUrl: 'https://vimeo.com/mojosolo/review/1011042698/be0f186c29',
    serviceType: 'ppt-ai',
    category: 'additional-services'
  },
  {
    id: '1015929647',
    title: 'PowerPoint Translated Video Example',
    description: 'PowerPoint presentation translated and converted to video with AI voiceover.',
    duration: 110,
    thumbnail: '',
    embedUrl: 'https://player.vimeo.com/video/1015929647',
    privateUrl: 'https://vimeo.com/mojosolo/review/1015929647/d554a2a962',
    serviceType: 'ppt-translated',
    category: 'additional-services'
  }
];

/**
 * Extract video ID from various Vimeo URL formats
 */
export function extractVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/.*\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Generate embed URL from video ID
 */
export function generateEmbedUrl(videoId: string, options: {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
} = {}): string {
  const params = new URLSearchParams();
  
  if (options.autoplay) params.set('autoplay', '1');
  if (options.muted) params.set('muted', '1');
  if (options.loop) params.set('loop', '1');
  if (options.controls === false) params.set('controls', '0');
  
  // Add responsive and quality parameters
  params.set('responsive', '1');
  params.set('quality', 'auto');
  
  const queryString = params.toString();
  return `https://player.vimeo.com/video/${videoId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Get videos by service type
 */
export function getVideosByServiceType(serviceType: VimeoVideo['serviceType']): VimeoVideo[] {
  return videoExamples.filter(video => video.serviceType === serviceType);
}

/**
 * Get videos by category
 */
export function getVideosByCategory(category: VimeoVideo['category']): VimeoVideo[] {
  return videoExamples.filter(video => video.category === category);
}

/**
 * Get featured videos for homepage showcase
 */
export function getFeaturedVideos(): VimeoVideo[] {
  return [
    videoExamples.find(v => v.serviceType === 'standard')!,
    videoExamples.find(v => v.serviceType === 'semi-custom')!,
    videoExamples.find(v => v.serviceType === 'full-custom')!,
    videoExamples.find(v => v.serviceType === 'full-animation')!
  ].filter(Boolean);
}

/**
 * Format video duration
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Check if running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}