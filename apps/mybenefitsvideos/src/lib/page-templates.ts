// lib/page-templates.ts - Modular Page Assembly System

import { ContentBlockType } from './content-blocks';

export interface PageSection {
  id: string;
  blockType: ContentBlockType;
  blockId: string;
  active: boolean;
  order: number;
  conditions?: {
    showOnMobile?: boolean;
    showOnDesktop?: boolean;
    userSegment?: string[];
    abTestVariant?: string;
  };
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  type: 'landing' | 'product' | 'service' | 'content' | 'conversion';
  active: boolean;
  metadata: {
    lastModified: string;
    conversionGoal?: string;
    targetAudience?: string;
    testResults?: {
      conversionRate?: number;
      bounceRate?: number;
      timeOnPage?: number;
      notes?: string;
    };
  };
  sections: PageSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

// Homepage Templates
export const homepageTemplates: PageTemplate[] = [
  {
    id: 'homepage-primary',
    name: 'Primary Homepage',
    description: 'Conversion-optimized homepage focusing on ROI and benefits',
    type: 'landing',
    active: true,
    metadata: {
      lastModified: '2025-08-21',
      conversionGoal: 'Calculator usage',
      targetAudience: 'HR Directors, Benefits Managers',
      testResults: {
        conversionRate: 12.5,
        bounceRate: 35,
        timeOnPage: 145,
        notes: 'Strong performance with ROI-focused messaging'
      }
    },
    sections: [
      {
        id: 'homepage-header',
        blockType: 'hero',
        blockId: 'hero-primary',
        active: true,
        order: 1
      },
      {
        id: 'homepage-stats',
        blockType: 'stats',
        blockId: 'stats-engagement',
        active: true,
        order: 2
      },
      {
        id: 'homepage-problem',
        blockType: 'problem',
        blockId: 'problem-primary',
        active: true,
        order: 3
      },
      {
        id: 'homepage-solution',
        blockType: 'value-prop',
        blockId: 'value-prop-comprehensive',
        active: true,
        order: 4
      },
      {
        id: 'homepage-video-showcase',
        blockType: 'video-showcase',
        blockId: 'video-showcase-primary',
        active: true,
        order: 5
      },
      {
        id: 'homepage-testimonial',
        blockType: 'testimonial',
        blockId: 'testimonial-hr-director',
        active: true,
        order: 6
      },
      {
        id: 'homepage-pricing',
        blockType: 'pricing',
        blockId: 'pricing-value-focused',
        active: true,
        order: 7
      },
      {
        id: 'homepage-cta',
        blockType: 'cta',
        blockId: 'cta-calculator',
        active: true,
        order: 8
      }
    ],
    seo: {
      title: 'Benefits Video Production | Increase Engagement by 3x | myBenefitsVideos.com',
      description: 'Professional benefits explainer videos that boost enrollment 40% and reduce HR questions 75%. Transparent pricing, proven ROI. Get your quote today.',
      keywords: [
        'benefits videos',
        'employee benefits communication',
        'benefits explainer videos',
        'HR video production',
        'benefits enrollment videos',
        'employee engagement videos'
      ],
      canonicalUrl: 'https://mybenefitsvideos.com'
    }
  },
  {
    id: 'homepage-roi-focused',
    name: 'ROI-Focused Homepage',
    description: 'Emphasizes business outcomes and measurable results',
    type: 'landing',
    active: false,
    metadata: {
      lastModified: '2025-08-21',
      conversionGoal: 'ROI calculator usage',
      targetAudience: 'CFOs, Benefits Directors'
    },
    sections: [
      {
        id: 'homepage-roi-hero',
        blockType: 'hero',
        blockId: 'hero-roi-focused',
        active: true,
        order: 1
      },
      {
        id: 'homepage-roi-value',
        blockType: 'value-prop',
        blockId: 'value-prop-roi',
        active: true,
        order: 2
      },
      {
        id: 'homepage-roi-problem',
        blockType: 'problem',
        blockId: 'problem-cost-focused',
        active: true,
        order: 3
      },
      {
        id: 'homepage-roi-testimonial',
        blockType: 'testimonial',
        blockId: 'testimonial-ceo',
        active: true,
        order: 4
      },
      {
        id: 'homepage-roi-cta',
        blockType: 'cta',
        blockId: 'cta-calculator',
        active: true,
        order: 5
      }
    ],
    seo: {
      title: 'ROI-Driven Benefits Videos | 40% Higher Enrollment | Calculate Your ROI',
      description: 'Boost benefits enrollment 40% with professional videos. Average ROI in 8 months. Use our calculator to see your potential savings.',
      keywords: [
        'benefits video ROI',
        'benefits enrollment increase',
        'HR cost savings',
        'benefits communication ROI',
        'employee benefits videos'
      ]
    }
  }
];

// Service Page Templates
export const servicePageTemplates: PageTemplate[] = [
  {
    id: 'services-foundation-videos',
    name: 'Foundation Videos Service Page',
    description: 'Detailed page for foundation video services',
    type: 'service',
    active: true,
    metadata: {
      lastModified: '2025-08-21',
      conversionGoal: 'Service inquiry',
      targetAudience: 'HR Managers, Benefits Coordinators'
    },
    sections: [
      {
        id: 'service-hero',
        blockType: 'hero',
        blockId: 'hero-service-foundation',
        active: true,
        order: 1
      },
      {
        id: 'service-features',
        blockType: 'feature-grid',
        blockId: 'features-foundation-videos',
        active: true,
        order: 2
      },
      {
        id: 'service-pricing',
        blockType: 'pricing',
        blockId: 'pricing-foundation-specific',
        active: true,
        order: 3
      },
      {
        id: 'service-examples',
        blockType: 'video-showcase',
        blockId: 'examples-foundation-videos',
        active: true,
        order: 4
      },
      {
        id: 'service-testimonials',
        blockType: 'testimonial',
        blockId: 'testimonial-foundation-client',
        active: true,
        order: 5
      },
      {
        id: 'service-cta',
        blockType: 'cta',
        blockId: 'cta-service-inquiry',
        active: true,
        order: 6
      }
    ],
    seo: {
      title: 'Foundation Benefits Videos | Professional Production from $799/min',
      description: 'Professional benefits explanation videos with custom branding, stock footage, and proven results. Increase understanding and enrollment.',
      keywords: [
        'foundation benefits videos',
        'benefits video production',
        'professional benefits videos',
        'employee benefits explanation'
      ]
    }
  }
];

// Landing Page Templates
export const landingPageTemplates: PageTemplate[] = [
  {
    id: 'landing-healthcare',
    name: 'Healthcare Industry Landing',
    description: 'Specialized landing page for healthcare organizations',
    type: 'landing',
    active: true,
    metadata: {
      lastModified: '2025-08-21',
      conversionGoal: 'Lead generation',
      targetAudience: 'Healthcare HR Directors'
    },
    sections: [
      {
        id: 'healthcare-hero',
        blockType: 'hero',
        blockId: 'hero-healthcare-specific',
        active: true,
        order: 1
      },
      {
        id: 'healthcare-problem',
        blockType: 'problem',
        blockId: 'problem-healthcare-specific',
        active: true,
        order: 2
      },
      {
        id: 'healthcare-solution',
        blockType: 'value-prop',
        blockId: 'value-prop-healthcare',
        active: true,
        order: 3
      },
      {
        id: 'healthcare-case-study',
        blockType: 'case-study',
        blockId: 'case-study-healthcare',
        active: true,
        order: 4
      },
      {
        id: 'healthcare-cta',
        blockType: 'cta',
        blockId: 'cta-healthcare-demo',
        active: true,
        order: 5
      }
    ],
    seo: {
      title: 'Healthcare Benefits Videos | Specialized Communication for Healthcare Workers',
      description: 'Benefits videos designed for healthcare organizations. Address unique challenges of shift workers, diverse staff, and complex benefit packages.',
      keywords: [
        'healthcare benefits videos',
        'hospital benefits communication',
        'healthcare worker benefits',
        'medical staff benefits videos'
      ]
    }
  }
];

// Page Template Management Functions
export function getActiveTemplate(pageType: string): PageTemplate | undefined {
  const templates = {
    'homepage': homepageTemplates,
    'services': servicePageTemplates,
    'landing': landingPageTemplates
  };
  
  const pageTemplates = templates[pageType as keyof typeof templates] || [];
  return pageTemplates.find(template => template.active);
}

export function getAllTemplates(pageType?: string): PageTemplate[] {
  if (pageType) {
    const templates = {
      'homepage': homepageTemplates,
      'services': servicePageTemplates,
      'landing': landingPageTemplates
    };
    return templates[pageType as keyof typeof templates] || [];
  }
  
  return [
    ...homepageTemplates,
    ...servicePageTemplates,
    ...landingPageTemplates
  ];
}

export function activateTemplate(templateId: string, pageType: string): void {
  const templates = getAllTemplates(pageType);
  
  // Deactivate all templates of this type
  templates.forEach(template => {
    template.active = false;
  });
  
  // Activate the selected template
  const selectedTemplate = templates.find(t => t.id === templateId);
  if (selectedTemplate) {
    selectedTemplate.active = true;
    selectedTemplate.metadata.lastModified = new Date().toISOString().split('T')[0];
  }
}

export function updateSectionOrder(templateId: string, newOrder: string[]): void {
  const template = getAllTemplates().find(t => t.id === templateId);
  if (!template) return;
  
  newOrder.forEach((sectionId, index) => {
    const section = template.sections.find(s => s.id === sectionId);
    if (section) {
      section.order = index + 1;
    }
  });
  
  template.metadata.lastModified = new Date().toISOString().split('T')[0];
}

export function toggleSection(templateId: string, sectionId: string, active: boolean): void {
  const template = getAllTemplates().find(t => t.id === templateId);
  if (!template) return;
  
  const section = template.sections.find(s => s.id === sectionId);
  if (section) {
    section.active = active;
    template.metadata.lastModified = new Date().toISOString().split('T')[0];
  }
}

export function getTemplateSections(templateId: string): PageSection[] {
  const template = getAllTemplates().find(t => t.id === templateId);
  return template?.sections.filter(s => s.active).sort((a, b) => a.order - b.order) || [];
}

// A/B Testing for Page Templates
export function recordTemplatePerformance(templateId: string, metrics: any): void {
  const template = getAllTemplates().find(t => t.id === templateId);
  if (template) {
    template.metadata.testResults = {
      ...template.metadata.testResults,
      ...metrics,
      lastTested: new Date().toISOString().split('T')[0]
    };
  }
}

export function getBestPerformingTemplate(pageType: string): PageTemplate | undefined {
  const templates = getAllTemplates(pageType);
  return templates
    .filter(t => t.metadata.testResults?.conversionRate)
    .sort((a, b) => (b.metadata.testResults?.conversionRate || 0) - (a.metadata.testResults?.conversionRate || 0))[0];
}

// SEO Management
export function updateTemplateSEO(templateId: string, seoData: Partial<PageTemplate['seo']>): void {
  const template = getAllTemplates().find(t => t.id === templateId);
  if (template) {
    template.seo = { ...template.seo, ...seoData };
    template.metadata.lastModified = new Date().toISOString().split('T')[0];
  }
}

// Mobile-specific configurations
export function getTemplateMobileSections(templateId: string): PageSection[] {
  const template = getAllTemplates().find(t => t.id === templateId);
  return template?.sections
    .filter(s => s.active && (s.conditions?.showOnMobile !== false))
    .sort((a, b) => a.order - b.order) || [];
}

export default {
  homepageTemplates,
  servicePageTemplates,
  landingPageTemplates,
  getActiveTemplate,
  getAllTemplates,
  activateTemplate,
  updateSectionOrder,
  toggleSection,
  getTemplateSections,
  recordTemplatePerformance,
  getBestPerformingTemplate,
  updateTemplateSEO,
  getTemplateMobileSections
};