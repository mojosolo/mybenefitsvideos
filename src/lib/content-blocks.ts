// 🎨 MODULAR CONTENT BLOCKS LIBRARY
// Rapidly assemble/reassemble page content with benefits-focused copy

export interface ContentBlock {
  id: string
  type: 'hero' | 'problem' | 'value-prop' | 'testimonial' | 'cta' | 'stats' | 'pricing' | 'video-showcase'
  variant: 'primary' | 'secondary' | 'alternative' | 'test-a' | 'test-b'
  content: Record<string, any>
  performance?: {
    views: number
    conversions: number
    conversionRate: number
  }
}

// 🎯 HERO SECTION BLOCKS
export const heroBlocks: Record<string, ContentBlock> = {
  'hero-primary': {
    id: 'hero-primary',
    type: 'hero',
    variant: 'primary',
    content: {
      badge: '🎬 Video Production + Benefits Videos That Work',
      headline: 'Boost benefits enrollment by 40% with professional explainer videos',
      subheadline: 'Transform complex benefits into engaging 2-minute videos that employees actually watch and understand. Reduce HR support tickets by 60% while increasing enrollment rates.',
      cta: {
        primary: { text: 'Calculate Your ROI', href: '/pricing-calculator' },
        secondary: { text: 'View Video Examples', href: '/services/video-production' }
      },
      features: [
        '40% higher enrollment rates proven',
        '60% reduction in HR support tickets', 
        '8-month average payback period',
        'Used by 500+ HR teams nationwide'
      ]
    }
  },
  'hero-test-a': {
    id: 'hero-test-a',
    type: 'hero',
    variant: 'test-a',
    content: {
      badge: '🚀 Save $50K+ Annually in Wasted Premiums',
      headline: 'Stop losing money on unused benefits',
      subheadline: 'Professional benefits videos that drive 3x higher engagement than PDFs. Turn your benefits package into a competitive advantage that saves money and retains talent.',
      cta: {
        primary: { text: 'Get Free ROI Analysis', href: '/pricing-calculator' },
        secondary: { text: 'See Success Stories', href: '/resources' }
      },
      features: [
        'Reduce wasted premium costs 45%',
        'Cut benefits explanation time 70%',
        'Increase voluntary enrollment 55%',
        '$847 average savings per employee'
      ]
    }
  }
}

// 💼 PROBLEM STATEMENT BLOCKS
export const problemBlocks: Record<string, ContentBlock> = {
  'problem-hr-pain': {
    id: 'problem-hr-pain',
    type: 'problem',
    variant: 'primary',
    content: {
      headline: 'Your benefits package costs too much for too little engagement',
      problems: [
        {
          icon: '💸',
          title: 'Wasted Premium Costs',
          description: 'Employees don\'t enroll in benefits they don\'t understand, wasting an average of $3,400 per employee in unused premiums annually.'
        },
        {
          icon: '⏰',
          title: 'HR Time Drain',
          description: 'Benefits counselors spend 40% of their time answering the same basic questions that could be prevented with clear communication.'
        },
        {
          icon: '📄',
          title: 'Information Overload',
          description: 'Traditional benefits guides are 50+ pages of dense text that 83% of employees admit they don\'t read completely.'
        },
        {
          icon: '😰',
          title: 'Decision Paralysis',
          description: 'Complex choices lead to suboptimal selections, with 67% of employees choosing default options rather than what\'s best for their situation.'
        }
      ]
    }
  }
}

// ⭐ VALUE PROPOSITION BLOCKS
export const valueBlocks: Record<string, ContentBlock> = {
  'value-roi-focused': {
    id: 'value-roi-focused',
    type: 'value-prop',
    variant: 'primary',
    content: {
      headline: 'Transform benefits complexity into clear value',
      subtitle: 'Professional 2-minute videos that explain what matters most',
      benefits: [
        {
          icon: '📈',
          title: 'Measurable Enrollment Increase',
          description: 'Average 40% increase in voluntary benefits enrollment within first year',
          metric: '40% increase',
          proof: 'Verified across 500+ implementations'
        },
        {
          icon: '💰',
          title: 'Immediate Cost Savings',
          description: 'Reduce HR support time by 60% and eliminate wasted premium costs',
          metric: '$50K+ annual savings',
          proof: 'Average for 1,000-employee organization'
        },
        {
          icon: '⚡',
          title: 'Rapid Implementation',
          description: 'From concept to deployment in 2-3 weeks with proven templates',
          metric: '10-15 business days',
          proof: 'Standard delivery timeline'
        },
        {
          icon: '🎯',
          title: 'Higher Comprehension',
          description: 'Video format increases benefits understanding by 3x vs traditional materials',
          metric: '3x engagement',
          proof: 'Measured via completion rates'
        }
      ]
    }
  }
}

// 🗣️ TESTIMONIAL BLOCKS
export const testimonialBlocks: Record<string, ContentBlock> = {
  'testimonial-hr-director': {
    id: 'testimonial-hr-director',
    type: 'testimonial',
    variant: 'primary',
    content: {
      quote: 'These videos solved our biggest open enrollment challenge. We saw a 45% increase in HSA participation and cut our benefits hotline calls in half. The ROI was clear within 6 months.',
      author: {
        name: 'Sarah Chen',
        title: 'HR Director',
        company: 'TechFlow Solutions',
        employees: '1,200 employees',
        industry: 'Technology'
      },
      metrics: [
        { label: 'HSA Enrollment Increase', value: '45%' },
        { label: 'Support Call Reduction', value: '52%' },
        { label: 'ROI Timeline', value: '6 months' }
      ],
      videoId: '744821736' // Vimeo testimonial if available
    }
  }
}

// 🚀 CALL-TO-ACTION BLOCKS
export const ctaBlocks: Record<string, ContentBlock> = {
  'cta-calculator': {
    id: 'cta-calculator',
    type: 'cta',
    variant: 'primary',
    content: {
      headline: 'Calculate your benefits video ROI in 2 minutes',
      description: 'See exactly how much you could save and what video production would cost for your organization.',
      buttonText: 'Get Your Custom Quote',
      buttonHref: '/pricing-calculator',
      secondaryText: 'Free analysis, no commitment required',
      urgency: false,
      design: 'gradient-blue'
    }
  },
  'cta-consultation': {
    id: 'cta-consultation',
    type: 'cta',
    variant: 'secondary',
    content: {
      headline: 'Ready to boost your benefits enrollment?',
      description: 'Book a 15-minute consultation to discuss your specific needs and see relevant video examples.',
      buttonText: 'Schedule Free Consultation',
      buttonHref: '/contact',
      secondaryText: 'Available within 24 hours',
      urgency: true,
      design: 'solid-blue'
    }
  }
}

// 📊 STATISTICS BLOCKS
export const statsBlocks: Record<string, ContentBlock> = {
  'stats-primary': {
    id: 'stats-primary',
    type: 'stats',
    variant: 'primary',
    content: {
      headline: 'Proven results across 500+ implementations',
      stats: [
        {
          number: '40%',
          label: 'Average enrollment increase',
          description: 'Voluntary benefits participation boost'
        },
        {
          number: '60%',
          label: 'Reduction in support tickets',
          description: 'Fewer calls to HR hotlines'
        },
        {
          number: '8',
          label: 'Months average payback',
          description: 'Time to ROI from implementation'
        },
        {
          number: '3x',
          label: 'Higher engagement',
          description: 'Vs traditional PDF materials'
        }
      ]
    }
  }
}

// 💰 PRICING DISPLAY BLOCKS
export const pricingBlocks: Record<string, ContentBlock> = {
  'pricing-roi-focused': {
    id: 'pricing-roi-focused',
    type: 'pricing',
    variant: 'primary',
    content: {
      headline: 'Investment that pays for itself',
      subtitle: 'Professional benefits videos starting at $799/minute',
      tiers: [
        {
          name: 'Standard Video',
          price: '$799',
          unit: 'per minute',
          description: 'Perfect for straightforward benefits explanations',
          features: [
            'Professional voiceover',
            'Template-based design', 
            'Basic animations',
            '2 rounds of revisions',
            'Vimeo hosting included'
          ],
          cta: 'Calculate ROI',
          popular: false,
          videoExample: '744821736'
        },
        {
          name: 'Full Custom',
          price: '$1,199',
          unit: 'per minute',
          description: 'Completely customized for your brand and needs',
          features: [
            'Custom animation & design',
            'Brand-specific styling',
            'Premium voiceover talent',
            'Unlimited concept revisions',
            'Multi-format delivery'
          ],
          cta: 'Get Custom Quote',
          popular: true,
          videoExample: '981669652'
        }
      ],
      disclaimer: 'All prices exclude taxes. 50% deposit required.',
      roiNote: 'Average customer saves $50K+ annually in reduced support costs and wasted premiums.'
    }
  }
}

// 🎥 VIDEO SHOWCASE BLOCKS
export const videoBlocks: Record<string, ContentBlock> = {
  'video-showcase-services': {
    id: 'video-showcase-services',
    type: 'video-showcase',
    variant: 'primary',
    content: {
      headline: 'See the quality that drives results',
      subtitle: 'Real examples from our benefits video library',
      videos: [
        {
          id: '744821736',
          title: 'Health Insurance Explanation',
          serviceType: 'Standard Video',
          description: 'Clear breakdown of health plan options and cost comparison',
          metrics: { engagement: '94%', completion: '87%' }
        },
        {
          id: '981669652', 
          title: 'HSA Benefits Deep Dive',
          serviceType: 'Full Custom',
          description: 'Animated explanation of HSA advantages with tax scenarios',
          metrics: { engagement: '96%', completion: '91%' }
        },
        {
          id: '1004003832',
          title: 'Open Enrollment Overview',
          serviceType: 'Semi-Custom',
          description: 'Company-branded walkthrough of enrollment process',
          metrics: { engagement: '93%', completion: '85%' }
        }
      ]
    }
  }
}

// 🔧 UTILITY FUNCTIONS
export function getBlockById(blockId: string): ContentBlock | null {
  const allBlocks = {
    ...heroBlocks,
    ...problemBlocks,
    ...valueBlocks,
    ...testimonialBlocks,
    ...ctaBlocks,
    ...statsBlocks,
    ...pricingBlocks,
    ...videoBlocks
  }
  return allBlocks[blockId] || null
}

export function getBlocksByType(type: ContentBlock['type']): ContentBlock[] {
  const allBlocks = {
    ...heroBlocks,
    ...problemBlocks,
    ...valueBlocks,
    ...testimonialBlocks,
    ...ctaBlocks,
    ...statsBlocks,
    ...pricingBlocks,
    ...videoBlocks
  }
  return Object.values(allBlocks).filter(block => block.type === type)
}

export function getBlockVariants(baseId: string): ContentBlock[] {
  const allBlocks = {
    ...heroBlocks,
    ...problemBlocks,
    ...valueBlocks,
    ...testimonialBlocks,
    ...ctaBlocks,
    ...statsBlocks,
    ...pricingBlocks,
    ...videoBlocks
  }
  const baseType = allBlocks[baseId]?.type
  if (!baseType) return []
  
  return Object.values(allBlocks).filter(block => 
    block.type === baseType && block.id.startsWith(baseId.split('-')[0])
  )
}