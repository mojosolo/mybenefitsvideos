// lib/content-blocks.ts - Modular Content Block Management System for myBenefitsVideos.com

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Content Block Types
export type ContentBlockType = 
  | 'hero' 
  | 'hero-video' 
  | 'problem' 
  | 'solution' 
  | 'value-prop' 
  | 'testimonial' 
  | 'pricing' 
  | 'cta' 
  | 'feature-grid' 
  | 'stats' 
  | 'process' 
  | 'faq' 
  | 'logo-grid' 
  | 'case-study' 
  | 'video-showcase';

export type ContentVariant = 'primary' | 'secondary' | 'alternative' | 'test';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  variant: ContentVariant;
  active: boolean;
  metadata: {
    title: string;
    description: string;
    lastModified: string;
    testResults?: {
      conversionRate?: number;
      engagementRate?: number;
      clickThroughRate?: number;
      notes?: string;
    };
  };
  content: {
    headline?: string;
    subheadline?: string;
    description?: string;
    cta?: {
      primary?: string;
      secondary?: string;
      href?: string;
    };
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      company: string;
      title: string;
      avatar?: string;
    };
    stats?: Array<{
      value: string;
      label: string;
      description?: string;
    }>;
    media?: {
      image?: string;
      video?: string;
      thumbnail?: string;
    };
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    padding?: string;
    layout?: string;
  };
}

// HERO SECTION BLOCKS
export const heroBlocks: ContentBlock[] = [
  {
    id: 'hero-primary',
    type: 'hero',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Primary Hero - Benefits Focus',
      description: 'Conversion-focused hero emphasizing benefits simplification',
      lastModified: '2025-08-21',
      testResults: {
        conversionRate: 12.5,
        engagementRate: 78,
        notes: 'Strong ROI messaging resonates with HR leaders'
      }
    },
    content: {
      headline: 'Make benefits simple with video',
      subheadline: 'Professional benefits explainer videos that help employees understand and value their benefits package. Increase engagement by 3x compared to traditional materials.',
      cta: {
        primary: 'Get Your Quote',
        secondary: 'View Examples',
        href: '/calculator'
      },
      media: {
        video: 'https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb',
        thumbnail: '/dashboard.png'
      }
    }
  },
  {
    id: 'hero-roi-focused',
    type: 'hero',
    variant: 'alternative',
    active: false,
    metadata: {
      title: 'ROI-Focused Hero',
      description: 'Emphasizes business outcomes and measurable results',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Boost Benefits Enrollment 40% with Professional Videos',
      subheadline: 'Transform complex benefits information into engaging videos that employees actually watch. Average ROI achieved in 8 months with 3x higher engagement than PDFs.',
      cta: {
        primary: 'Calculate ROI',
        secondary: 'See Examples',
        href: '/calculator'
      },
      stats: [
        { value: '40%', label: 'Higher Enrollment', description: 'Compared to traditional materials' },
        { value: '8 Months', label: 'Average ROI', description: 'Break-even on investment' },
        { value: '3x', label: 'More Engagement', description: 'Than PDF guides' }
      ]
    }
  },
  {
    id: 'hero-pain-solution',
    type: 'hero',
    variant: 'test',
    active: false,
    metadata: {
      title: 'Pain Point Hero',
      description: 'Leads with HR pain points before presenting solution',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Stop Losing Money on Unused Benefits',
      subheadline: 'When employees don\'t understand their benefits, your company loses thousands in wasted premiums. Our videos help employees see the true value of what you provide.',
      cta: {
        primary: 'Stop the Waste',
        secondary: 'Calculate Losses',
        href: '/calculator'
      }
    }
  }
];

// PROBLEM SECTION BLOCKS
export const problemBlocks: ContentBlock[] = [
  {
    id: 'problem-primary',
    type: 'problem',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Primary Problem Statement',
      description: 'Core HR challenges with benefits communication',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Why Traditional Benefits Communication Fails',
      subheadline: 'HR teams struggle with outdated methods that leave employees confused and disengaged',
      features: [
        {
          title: 'Information Overload',
          description: 'Dense PDFs and complex documents overwhelm employees, leading to poor understanding and low engagement with valuable benefits.',
          icon: 'Brain'
        },
        {
          title: 'Low Enrollment Rates',
          description: 'Employees skip important benefits they don\'t understand, costing companies money in unused premiums and unhappy staff.',
          icon: 'TrendingDown'
        },
        {
          title: 'Endless Questions',
          description: 'HR teams waste hours answering the same benefits questions over and over, taking time away from strategic initiatives.',
          icon: 'MessageCircle'
        }
      ]
    }
  },
  {
    id: 'problem-cost-focused',
    type: 'problem',
    variant: 'alternative',
    active: false,
    metadata: {
      title: 'Cost-Focused Problem',
      description: 'Emphasizes financial impact of poor benefits communication',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Poor Benefits Communication Costs Companies $1,000s',
      features: [
        {
          title: 'Wasted Premium Dollars',
          description: 'Companies lose an average of $1,200 per employee annually on unused benefits due to poor understanding.',
          icon: 'DollarSign'
        },
        {
          title: 'HR Time Drain',
          description: 'HR teams spend 40% of open enrollment time answering repetitive questions that could be prevented.',
          icon: 'Clock'
        },
        {
          title: 'Employee Dissatisfaction',
          description: 'Workers who don\'t understand their benefits are 60% more likely to seek employment elsewhere.',
          icon: 'Frown'
        }
      ]
    }
  }
];

// VALUE PROPOSITION BLOCKS
export const valuePropositionBlocks: ContentBlock[] = [
  {
    id: 'value-prop-comprehensive',
    type: 'value-prop',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Comprehensive Value Proposition',
      description: 'Complete benefits of video-based communication',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Transform Benefits Communication with Professional Video',
      subheadline: 'Purpose-built solutions that turn complex benefits into clear, engaging content employees actually consume',
      features: [
        {
          title: 'Increase Understanding',
          description: 'Visual explanations help employees grasp complex benefit options 3x faster than traditional materials.',
          icon: 'Eye'
        },
        {
          title: 'Boost Enrollment',
          description: 'Clear communication leads to 40% higher participation in voluntary benefits and retirement plans.',
          icon: 'TrendingUp'
        },
        {
          title: 'Save HR Time',
          description: 'Reduce repetitive benefits questions by 75%, freeing your team for strategic work.',
          icon: 'Timer'
        },
        {
          title: 'Measure Results',
          description: 'Track video engagement, completion rates, and enrollment metrics to prove ROI.',
          icon: 'BarChart'
        }
      ]
    }
  },
  {
    id: 'value-prop-roi',
    type: 'value-prop',
    variant: 'alternative',
    active: false,
    metadata: {
      title: 'ROI-Focused Value Prop',
      description: 'Emphasizes measurable business outcomes',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Proven ROI from Day One',
      stats: [
        { value: '3x', label: 'Higher Engagement', description: 'Video vs. PDF materials' },
        { value: '40%', label: 'Enrollment Increase', description: 'Average improvement' },
        { value: '75%', label: 'Fewer Questions', description: 'Reduction in HR inquiries' },
        { value: '8 Months', label: 'Average Payback', description: 'Time to ROI' }
      ]
    }
  }
];

// TESTIMONIAL BLOCKS
export const testimonialBlocks: ContentBlock[] = [
  {
    id: 'testimonial-hr-director',
    type: 'testimonial',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'HR Director Success Story',
      description: 'Results from large enterprise client',
      lastModified: '2025-08-21'
    },
    content: {
      testimonial: {
        quote: 'Our benefits video increased enrollment by 35% and cut our support calls in half. The ROI was clear within two quarters.',
        author: 'Sarah Martinez',
        company: 'TechCorp Industries',
        title: 'Director of Benefits',
        avatar: '/testimonials/sarah-martinez.jpg'
      }
    }
  },
  {
    id: 'testimonial-ceo',
    type: 'testimonial',
    variant: 'secondary',
    active: true,
    metadata: {
      title: 'CEO Perspective',
      description: 'C-level endorsement focusing on employee satisfaction',
      lastModified: '2025-08-21'
    },
    content: {
      testimonial: {
        quote: 'Investing in benefits videos was one of our best HR decisions. Employee satisfaction with benefits increased 60% and we saw immediate ROI.',
        author: 'Michael Chen',
        company: 'Innovate Healthcare',
        title: 'CEO',
        avatar: '/testimonials/michael-chen.jpg'
      }
    }
  }
];

// CTA BLOCKS
export const ctaBlocks: ContentBlock[] = [
  {
    id: 'cta-calculator',
    type: 'cta',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Calculator-Focused CTA',
      description: 'Drives to pricing calculator for immediate engagement',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'See Your ROI in Minutes',
      subheadline: 'Use our interactive calculator to get instant pricing and ROI projections for your benefits video project.',
      cta: {
        primary: 'Calculate ROI & Pricing',
        secondary: 'Talk to an Expert',
        href: '/calculator'
      }
    }
  },
  {
    id: 'cta-consultation',
    type: 'cta',
    variant: 'alternative',
    active: false,
    metadata: {
      title: 'Consultation-Focused CTA',
      description: 'Emphasizes human connection and expertise',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Ready to Transform Your Benefits Communication?',
      subheadline: 'Schedule a free consultation to discuss your specific needs and see examples from companies like yours.',
      cta: {
        primary: 'Schedule Free Consultation',
        secondary: 'View Portfolio',
        href: '/contact'
      }
    }
  }
];

// STATS BLOCKS
export const statsBlocks: ContentBlock[] = [
  {
    id: 'stats-engagement',
    type: 'stats',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Engagement Statistics',
      description: 'Key metrics demonstrating video effectiveness',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Proven Results Across Industries',
      stats: [
        { value: '40%', label: 'Higher Enrollment', description: 'in voluntary benefits' },
        { value: '3x', label: 'More Engagement', description: 'vs. traditional PDFs' },
        { value: '75%', label: 'Fewer Questions', description: 'to HR teams' },
        { value: '8 Months', label: 'Average ROI', description: 'payback period' }
      ]
    }
  }
];

// PRICING BLOCKS
export const pricingBlocks: ContentBlock[] = [
  {
    id: 'pricing-value-focused',
    type: 'pricing',
    variant: 'primary',
    active: true,
    metadata: {
      title: 'Value-Focused Pricing',
      description: 'Emphasizes value and outcomes over price',
      lastModified: '2025-08-21'
    },
    content: {
      headline: 'Transparent Pricing That Delivers ROI',
      subheadline: 'Professional video production with measurable results. Most clients see positive ROI within 8 months.',
      features: [
        {
          title: 'Standard Video Production',
          description: 'Starting at $799/minute + tax. Professional branded videos with stock footage and custom graphics.'
        },
        {
          title: 'Custom Animation',
          description: 'From $999/minute + tax. Fully branded animations tailored to your company and benefits.'
        },
        {
          title: 'Complete Solutions',
          description: 'Video + microsite packages from $6,597. Everything needed for successful benefits communication.'
        }
      ]
    }
  }
];

// Block Management Functions
export function getActiveBlocks(type: ContentBlockType): ContentBlock[] {
  const allBlocks = {
    'hero': heroBlocks,
    'problem': problemBlocks,
    'value-prop': valuePropositionBlocks,
    'testimonial': testimonialBlocks,
    'cta': ctaBlocks,
    'stats': statsBlocks,
    'pricing': pricingBlocks,
    'hero-video': heroBlocks.filter(b => b.content.media?.video),
    'solution': valuePropositionBlocks,
    'feature-grid': valuePropositionBlocks,
    'logo-grid': [],
    'case-study': testimonialBlocks,
    'video-showcase': [],
    'process': [],
    'faq': []
  };
  
  return (allBlocks[type] || []).filter(block => block.active);
}

export function getBlockById(id: string): ContentBlock | undefined {
  const allBlocks = [
    ...heroBlocks,
    ...problemBlocks,
    ...valuePropositionBlocks,
    ...testimonialBlocks,
    ...ctaBlocks,
    ...statsBlocks,
    ...pricingBlocks
  ];
  
  return allBlocks.find(block => block.id === id);
}

export function updateBlockStatus(id: string, active: boolean): void {
  const block = getBlockById(id);
  if (block) {
    block.active = active;
    block.metadata.lastModified = new Date().toISOString().split('T')[0];
  }
}

export function getBlockVariants(type: ContentBlockType): ContentBlock[] {
  const allBlocks = {
    'hero': heroBlocks,
    'problem': problemBlocks,
    'value-prop': valuePropositionBlocks,
    'testimonial': testimonialBlocks,
    'cta': ctaBlocks,
    'stats': statsBlocks,
    'pricing': pricingBlocks,
    'hero-video': heroBlocks.filter(b => b.content.media?.video),
    'solution': valuePropositionBlocks,
    'feature-grid': valuePropositionBlocks,
    'logo-grid': [],
    'case-study': testimonialBlocks,
    'video-showcase': [],
    'process': [],
    'faq': []
  };
  
  return allBlocks[type] || [];
}

// A/B Testing Functions
export function recordTestResult(blockId: string, results: any): void {
  const block = getBlockById(blockId);
  if (block) {
    block.metadata.testResults = {
      ...block.metadata.testResults,
      ...results,
      lastTested: new Date().toISOString().split('T')[0]
    };
  }
}

export function getBestPerformingVariant(type: ContentBlockType): ContentBlock | undefined {
  const variants = getBlockVariants(type);
  return variants
    .filter(v => v.metadata.testResults?.conversionRate)
    .sort((a, b) => (b.metadata.testResults?.conversionRate || 0) - (a.metadata.testResults?.conversionRate || 0))[0];
}