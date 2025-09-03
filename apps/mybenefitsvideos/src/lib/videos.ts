// Video examples configuration with Vimeo URLs
export interface VideoExample {
  id: string;
  title: string;
  description: string;
  serviceType: 'standard' | 'semi-custom' | 'full-custom' | 'full-animation' | 'oe-teaser' | 'alt-language' | 'diy-ppt' | 'microsite';
  vimeoUrl: string;
  embedId?: string; // For embed-ready URLs
  thumbnailUrl?: string;
  duration?: string;
  clientName?: string;
}

export const VIDEO_EXAMPLES: VideoExample[] = [
  {
    id: 'standard-example',
    title: 'Standard Video Example',
    description: 'Branded video with stock footage explaining benefits package',
    serviceType: 'standard',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/744821736/f7f2d71129',
    embedId: '744821736',
    duration: '2:15',
    clientName: 'Sample Client'
  },
  {
    id: 'semi-custom-example',
    title: 'Semi-Custom Video Example', 
    description: 'Custom branded animations with company-specific messaging',
    serviceType: 'semi-custom',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/1023365575/e9c128930b',
    embedId: '1023365575',
    duration: '2:30',
    clientName: 'Sample Client'
  },
  {
    id: 'full-custom-example',
    title: 'Full Custom Video Example',
    description: 'Completely customized video production with unique animations',
    serviceType: 'full-custom', 
    vimeoUrl: 'https://vimeo.com/mojosolo/review/874206654/ceb87d0226',
    embedId: '874206654',
    duration: '3:00',
    clientName: 'Sample Client'
  },
  {
    id: 'full-animation-example',
    title: 'Full Animation Video Example',
    description: 'Complete animation package with custom characters and scenarios',
    serviceType: 'full-animation',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/693745318/145fbe1647',
    embedId: '693745318',
    duration: '2:45',
    clientName: 'Sample Client'
  },
  {
    id: 'oe-teaser-example',
    title: 'Open Enrollment Teaser Example',
    description: 'Short promotional video for OE campaigns',
    serviceType: 'oe-teaser',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/1110010927/f91fb8db0b',
    embedId: '1110010927',
    duration: '1:00',
    clientName: 'Sample Client'
  },
  {
    id: 'alt-language-example',
    title: 'Alternative Language Example',
    description: 'Spanish version of benefits video with native speaker voiceover',
    serviceType: 'alt-language',
    vimeoUrl: 'https://vimeopro.com/mojosolo/brighthealth-spanish-oe-2022',
    embedId: 'brighthealth-spanish-oe-2022',
    duration: '2:20',
    clientName: 'BrightHealth'
  },
  {
    id: 'diy-ppt-ai-example',
    title: 'DIY PowerPoint AI Example',
    description: 'PowerPoint presentation converted to video with AI voiceover',
    serviceType: 'diy-ppt',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/1011042698/be0f186c29',
    embedId: '1011042698',
    duration: '3:15',
    clientName: 'Sample Client'
  },
  {
    id: 'diy-ppt-translated-example',
    title: 'DIY PowerPoint Translated Example',
    description: 'Translated PowerPoint presentation with localized voiceover',
    serviceType: 'diy-ppt',
    vimeoUrl: 'https://vimeo.com/mojosolo/review/1015929647/d554a2a962',
    embedId: '1015929647',
    duration: '2:50',
    clientName: 'Sample Client'
  }
];

export const MICROSITE_DEMO = {
  id: 'microsite-demo',
  title: 'Benefits Break Microsite Demo',
  description: 'Interactive microsite with embedded videos and benefit calculators',
  serviceType: 'microsite' as const,
  vimeoUrl: 'https://demo.benefitsbreak.com/',
  embedId: 'demo',
  duration: 'Interactive',
  clientName: 'Demo Site'
};

// Helper functions for video management
export function getVideosByServiceType(serviceType: VideoExample['serviceType']): VideoExample[] {
  return VIDEO_EXAMPLES.filter(video => video.serviceType === serviceType);
}

export function getVideoById(id: string): VideoExample | undefined {
  return VIDEO_EXAMPLES.find(video => video.id === id);
}

export function getEmbedUrl(embedId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    title: '0',
    byline: '0', 
    portrait: '0',
    ...(autoplay && { autoplay: '1' })
  });
  
  return `https://player.vimeo.com/video/${embedId}?${params.toString()}`;
}

export function extractEmbedId(vimeoUrl: string): string | null {
  // Extract video ID from various Vimeo URL formats
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/.*\/review\/(\d+)/,
    /vimeopro\.com\/.*\/(.+)$/
  ];
  
  for (const pattern of patterns) {
    const match = vimeoUrl.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

// Service type labels and descriptions
export const SERVICE_TYPE_LABELS = {
  'standard': 'Standard Video',
  'semi-custom': 'Semi-Custom Video',
  'full-custom': 'Full Custom Video', 
  'full-animation': 'Full Animation Video',
  'oe-teaser': 'OE Teaser Video',
  'alt-language': 'Alternative Language',
  'diy-ppt': 'DIY PowerPoint',
  'microsite': 'Benefits Microsite'
} as const;

export const SERVICE_TYPE_DESCRIPTIONS = {
  'standard': 'Professional branded videos with stock footage and animations',
  'semi-custom': 'Custom branded animations tailored to your company',
  'full-custom': 'Completely customized video production from concept to delivery',
  'full-animation': 'Premium animation package with custom characters and scenarios', 
  'oe-teaser': 'Short promotional videos perfect for open enrollment campaigns',
  'alt-language': 'Professional translations with native speaker voiceovers',
  'diy-ppt': 'Transform existing PowerPoint presentations into professional videos',
  'microsite': 'Interactive websites featuring your videos and benefit tools'
} as const;