// 🏗️ PAGE ASSEMBLY SYSTEM
// Rapidly create and modify pages using content blocks

export interface PageSection {
  blockId: string
  enabled: boolean
  order: number
  customProps?: Record<string, any>
}

export interface PageTemplate {
  id: string
  name: string
  description: string
  route: string
  sections: PageSection[]
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
  analytics?: {
    goalId?: string
    conversionEvents?: string[]
  }
}

// 🏠 HOMEPAGE TEMPLATES
export const homepageTemplates: Record<string, PageTemplate> = {
  'homepage-roi-focused': {
    id: 'homepage-roi-focused',
    name: 'ROI-Focused Homepage',
    description: 'Emphasizes cost savings and measurable results',
    route: '/',
    sections: [
      { blockId: 'hero-primary', enabled: true, order: 1 },
      { blockId: 'stats-primary', enabled: true, order: 2 },
      { blockId: 'problem-hr-pain', enabled: true, order: 3 },
      { blockId: 'value-roi-focused', enabled: true, order: 4 },
      { blockId: 'video-showcase-services', enabled: true, order: 5 },
      { blockId: 'testimonial-hr-director', enabled: true, order: 6 },
      { blockId: 'cta-calculator', enabled: true, order: 7 }
    ],
    seo: {
      title: 'Benefits Videos That Boost Enrollment 40% | myBenefitsVideos.com',
      description: 'Professional benefits explainer videos that increase enrollment by 40% and reduce HR support by 60%. Calculate your ROI in 2 minutes.',
      keywords: ['benefits videos', 'employee benefits', 'benefits enrollment', 'HR videos', 'benefits communication'],
      ogImage: '/og-homepage-roi.jpg'
    },
    analytics: {
      goalId: 'homepage-calculator-conversion',
      conversionEvents: ['calculator-click', 'consultation-request']
    }
  },
  'homepage-test-variant': {
    id: 'homepage-test-variant',
    name: 'Cost-Savings Focused (Test)',
    description: 'A/B test variant emphasizing waste reduction',
    route: '/',
    sections: [
      { blockId: 'hero-test-a', enabled: true, order: 1 },
      { blockId: 'problem-hr-pain', enabled: true, order: 2 },
      { blockId: 'stats-primary', enabled: true, order: 3 },
      { blockId: 'video-showcase-services', enabled: true, order: 4 },
      { blockId: 'value-roi-focused', enabled: true, order: 5 },
      { blockId: 'cta-consultation', enabled: true, order: 6 }
    ],
    seo: {
      title: 'Stop Wasting $50K+ on Unused Benefits | Professional Benefits Videos',
      description: 'Reduce wasted premium costs by 45% with engaging benefits videos. Professional production starting at $799/minute.',
      keywords: ['wasted benefits', 'benefits cost savings', 'employee benefits videos', 'HR cost reduction'],
      ogImage: '/og-homepage-savings.jpg'
    }
  }
}

// 🎬 SERVICE PAGE TEMPLATES
export const serviceTemplates: Record<string, PageTemplate> = {
  'video-production-services': {
    id: 'video-production-services',
    name: 'Video Production Services',
    description: 'Complete video production service breakdown',
    route: '/services/video-production',
    sections: [
      { 
        blockId: 'hero-services-video',
        enabled: true, 
        order: 1,
        customProps: {
          headline: 'Professional benefits videos that employees actually watch',
          subheadline: 'From $799/minute for standard videos to full custom animation. All with proven ROI.',
          cta: { text: 'Calculate Your Investment', href: '/pricing-calculator' }
        }
      },
      { blockId: 'pricing-roi-focused', enabled: true, order: 2 },
      { blockId: 'video-showcase-services', enabled: true, order: 3 },
      { blockId: 'testimonial-hr-director', enabled: true, order: 4 },
      { blockId: 'cta-calculator', enabled: true, order: 5 }
    ],
    seo: {
      title: 'Benefits Video Production Services | $799/min | Proven ROI',
      description: 'Professional benefits explainer videos from $799/minute. 40% enrollment increase guaranteed. View examples and calculate ROI.',
      keywords: ['benefits video production', 'employee benefits videos', 'benefits explainer videos', 'HR video services'],
      ogImage: '/og-video-services.jpg'
    }
  },
  'website-services': {
    id: 'website-services', 
    name: 'Website & Portal Services',
    description: 'Benefits communication platforms and portals',
    route: '/services/website-services',
    sections: [
      {
        blockId: 'hero-website-services',
        enabled: true,
        order: 1,
        customProps: {
          headline: 'Benefits communication platforms that drive engagement',
          subheadline: 'From simple microsites to enterprise portals. Integrate with your existing systems.'
        }
      },
      { blockId: 'pricing-website-focused', enabled: true, order: 2 },
      { blockId: 'value-website-platforms', enabled: true, order: 3 },
      { blockId: 'cta-consultation', enabled: true, order: 4 }
    ],
    seo: {
      title: 'Benefits Communication Platforms | Employee Benefits Portals',
      description: 'Custom benefits communication platforms from $4,999. Increase engagement and reduce support burden.',
      keywords: ['benefits portal', 'benefits platform', 'employee benefits website', 'benefits communication'],
      ogImage: '/og-website-services.jpg'
    }
  }
}

// 🧮 CALCULATOR PAGE TEMPLATE
export const calculatorTemplate: PageTemplate = {
  id: 'pricing-calculator',
  name: 'ROI Calculator',
  description: 'Interactive pricing and ROI calculator',
  route: '/pricing-calculator',
  sections: [
    {
      blockId: 'hero-calculator',
      enabled: true,
      order: 1,
      customProps: {
        headline: 'Calculate your benefits video ROI',
        subheadline: 'See exactly what video production costs and how much you could save.',
        showCalculator: true
      }
    },
    { blockId: 'stats-primary', enabled: true, order: 2 },
    { blockId: 'testimonial-hr-director', enabled: true, order: 3 }
  ],
  seo: {
    title: 'Benefits Video ROI Calculator | Calculate Your Savings',
    description: 'Calculate the cost and ROI of professional benefits videos for your organization. Free analysis in under 2 minutes.',
    keywords: ['benefits video calculator', 'benefits ROI calculator', 'video production pricing', 'benefits cost analysis'],
    ogImage: '/og-calculator.jpg'
  },
  analytics: {
    goalId: 'calculator-completion',
    conversionEvents: ['quote-generated', 'contact-request']
  }
}

// 📋 ABOUT PAGE TEMPLATE  
export const aboutTemplate: PageTemplate = {
  id: 'about-page',
  name: 'About Us',
  description: 'Company story and expertise',
  route: '/about',
  sections: [
    {
      blockId: 'hero-about',
      enabled: true,
      order: 1,
      customProps: {
        headline: 'Benefits communication experts since 2018',
        subheadline: 'We\'ve helped 500+ HR teams boost enrollment and reduce support burden with professional video.'
      }
    },
    { blockId: 'stats-primary', enabled: true, order: 2 },
    { blockId: 'value-expertise', enabled: true, order: 3 },
    { blockId: 'team-showcase', enabled: true, order: 4 },
    { blockId: 'cta-consultation', enabled: true, order: 5 }
  ],
  seo: {
    title: 'About myBenefitsVideos | Benefits Communication Experts',
    description: 'Professional benefits video production team with 500+ successful implementations. Learn about our expertise and approach.',
    keywords: ['benefits video experts', 'HR video production team', 'benefits communication specialists'],
    ogImage: '/og-about.jpg'
  }
}

// 🔧 PAGE ASSEMBLY UTILITIES
export function getPageTemplate(templateId: string): PageTemplate | null {
  const allTemplates = {
    ...homepageTemplates,
    ...serviceTemplates,
    'pricing-calculator': calculatorTemplate,
    'about-page': aboutTemplate
  }
  return allTemplates[templateId] || null
}

export function getTemplatesByRoute(route: string): PageTemplate[] {
  const allTemplates = {
    ...homepageTemplates,
    ...serviceTemplates,
    'pricing-calculator': calculatorTemplate,
    'about-page': aboutTemplate
  }
  return Object.values(allTemplates).filter(template => template.route === route)
}

export function assemblePageSections(template: PageTemplate): PageSection[] {
  return template.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
}

export function updatePageSection(
  templateId: string, 
  sectionIndex: number, 
  updates: Partial<PageSection>
): PageTemplate | null {
  const template = getPageTemplate(templateId)
  if (!template) return null
  
  const updatedSections = [...template.sections]
  updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], ...updates }
  
  return {
    ...template,
    sections: updatedSections
  }
}

export function reorderPageSections(templateId: string, newOrder: number[]): PageTemplate | null {
  const template = getPageTemplate(templateId)
  if (!template) return null
  
  const reorderedSections = template.sections.map((section, index) => ({
    ...section,
    order: newOrder[index]
  }))
  
  return {
    ...template,
    sections: reorderedSections.sort((a, b) => a.order - b.order)
  }
}

// 🎯 A/B TESTING UTILITIES
export interface ABTest {
  id: string
  name: string
  variants: {
    control: string // template ID
    test: string    // template ID
  }
  trafficSplit: number // 0-100, percentage for test variant
  startDate: string
  endDate?: string
  status: 'draft' | 'running' | 'completed'
  metrics: {
    conversions: { control: number; test: number }
    visitors: { control: number; test: number }
  }
}

export function createABTest(
  testName: string,
  controlTemplate: string,
  testTemplate: string,
  trafficSplit: number = 50
): ABTest {
  return {
    id: `test-${Date.now()}`,
    name: testName,
    variants: {
      control: controlTemplate,
      test: testTemplate
    },
    trafficSplit,
    startDate: new Date().toISOString(),
    status: 'draft',
    metrics: {
      conversions: { control: 0, test: 0 },
      visitors: { control: 0, test: 0 }
    }
  }
}

export function getActiveTemplate(route: string, visitorId: string): string {
  // Simple hash-based assignment for consistent user experience
  const hash = visitorId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const templates = getTemplatesByRoute(route)
  if (templates.length <= 1) return templates[0]?.id || 'default'
  
  // Return test variant based on hash
  return Math.abs(hash) % 100 < 50 ? templates[0].id : templates[1].id
}