// 🧭 DYNAMIC NAVIGATION CONTROL SYSTEM
// Easily modify navigation structure, CTAs, and mobile experience

export interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  icon?: string
  badge?: string
  dropdown?: NavigationItem[]
  ctaStyle?: 'primary' | 'secondary' | 'outline' | 'ghost'
  hidden?: boolean
  mobileOnly?: boolean
  desktopOnly?: boolean
}

export interface NavigationConfig {
  id: string
  name: string
  description: string
  items: NavigationItem[]
  cta?: NavigationItem
  logo: {
    text: string
    href: string
    icon?: string
  }
  mobile: {
    collapseThreshold: number
    hamburgerStyle: 'minimal' | 'animated' | 'dots'
    slideDirection: 'left' | 'right' | 'top' | 'bottom'
  }
  analytics?: {
    trackClicks: boolean
    goalEvents: string[]
  }
}

// 🏠 MAIN NAVIGATION CONFIGURATIONS

export const navigationConfigs: Record<string, NavigationConfig> = {
  'main-nav-standard': {
    id: 'main-nav-standard',
    name: 'Standard Navigation',
    description: 'Professional navigation with services dropdown',
    logo: {
      text: 'myBenefitsVideos.com',
      href: '/',
      icon: '🎬'
    },
    items: [
      {
        id: 'services',
        label: 'Services',
        href: '/services',
        description: 'Video production and website services',
        dropdown: [
          {
            id: 'video-production',
            label: 'Video Production',
            href: '/services/video-production',
            description: 'Professional benefits explainer videos',
            icon: '🎥'
          },
          {
            id: 'website-services',
            label: 'Website Services',
            href: '/services/website-services', 
            description: 'Benefits communication platforms',
            icon: '🌐'
          },
          {
            id: 'view-examples',
            label: 'View Examples',
            href: '/services/video-production#examples',
            description: 'See our video portfolio',
            icon: '👀'
          }
        ]
      },
      {
        id: 'about',
        label: 'About',
        href: '/about',
        description: 'Our team and expertise'
      },
      {
        id: 'resources',
        label: 'Resources',
        href: '/resources',
        description: 'Case studies and ROI tools',
        dropdown: [
          {
            id: 'case-studies',
            label: 'Case Studies',
            href: '/resources/case-studies',
            description: 'Customer success stories'
          },
          {
            id: 'roi-calculator',
            label: 'ROI Calculator',
            href: '/pricing-calculator',
            description: 'Calculate your savings',
            badge: 'Free'
          }
        ]
      },
      {
        id: 'pricing-calculator',
        label: 'Pricing Calculator',
        href: '/pricing-calculator',
        description: 'Get your custom quote'
      }
    ],
    cta: {
      id: 'get-started',
      label: 'Get Started for Free',
      href: '/pricing-calculator',
      ctaStyle: 'primary'
    },
    mobile: {
      collapseThreshold: 768,
      hamburgerStyle: 'animated',
      slideDirection: 'right'
    },
    analytics: {
      trackClicks: true,
      goalEvents: ['nav-calculator-click', 'nav-services-click']
    }
  },

  'main-nav-conversion-focused': {
    id: 'main-nav-conversion-focused',
    name: 'Conversion-Focused Navigation',
    description: 'Optimized for driving to calculator and consultation',
    logo: {
      text: 'myBenefitsVideos.com',
      href: '/',
      icon: '💼'
    },
    items: [
      {
        id: 'services',
        label: 'Services & Pricing',
        href: '/services',
        description: 'See what we offer',
        badge: 'From $799'
      },
      {
        id: 'examples',
        label: 'Video Examples',
        href: '/services/video-production#examples',
        description: 'See our work'
      },
      {
        id: 'calculator',
        label: 'Calculate ROI',
        href: '/pricing-calculator',
        description: 'Free 2-minute analysis',
        badge: 'Free',
        ctaStyle: 'outline'
      }
    ],
    cta: {
      id: 'consultation',
      label: 'Book Consultation',
      href: '/contact',
      ctaStyle: 'primary'
    },
    mobile: {
      collapseThreshold: 768,
      hamburgerStyle: 'minimal',
      slideDirection: 'top'
    }
  },

  'main-nav-enterprise': {
    id: 'main-nav-enterprise',
    name: 'Enterprise Navigation',
    description: 'Professional navigation for enterprise clients',
    logo: {
      text: 'myBenefitsVideos',
      href: '/',
      icon: '🏢'
    },
    items: [
      {
        id: 'solutions',
        label: 'Solutions',
        href: '/services',
        dropdown: [
          {
            id: 'video-production',
            label: 'Video Production',
            href: '/services/video-production',
            description: 'Scalable video solutions'
          },
          {
            id: 'enterprise-platforms',
            label: 'Enterprise Platforms',
            href: '/services/website-services',
            description: 'Custom portals and integrations'
          },
          {
            id: 'consulting',
            label: 'Benefits Consulting',
            href: '/services/consulting',
            description: 'Strategic communication planning'
          }
        ]
      },
      {
        id: 'case-studies',
        label: 'Case Studies',
        href: '/resources/case-studies',
        description: 'Enterprise success stories'
      },
      {
        id: 'pricing',
        label: 'Pricing',
        href: '/pricing-calculator',
        description: 'Enterprise pricing calculator'
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        description: 'Speak with our team'
      }
    ],
    cta: {
      id: 'demo',
      label: 'Request Demo',
      href: '/contact?type=demo',
      ctaStyle: 'primary'
    },
    mobile: {
      collapseThreshold: 1024,
      hamburgerStyle: 'dots',
      slideDirection: 'left'
    }
  }
}

// 🎯 SPECIALIZED NAVIGATION VARIANTS

export const landingPageNavs: Record<string, NavigationConfig> = {
  'landing-minimal': {
    id: 'landing-minimal',
    name: 'Minimal Landing Navigation',
    description: 'Clean navigation for focused landing pages',
    logo: {
      text: 'myBenefitsVideos',
      href: '/'
    },
    items: [
      {
        id: 'examples',
        label: 'Examples',
        href: '#examples'
      },
      {
        id: 'pricing',
        label: 'Pricing',
        href: '#pricing'
      }
    ],
    cta: {
      id: 'get-quote',
      label: 'Get Your Quote',
      href: '/pricing-calculator',
      ctaStyle: 'primary'
    },
    mobile: {
      collapseThreshold: 640,
      hamburgerStyle: 'minimal',
      slideDirection: 'top'
    }
  },

  'landing-roi-focused': {
    id: 'landing-roi-focused',
    name: 'ROI-Focused Landing Navigation',
    description: 'Navigation emphasizing ROI and savings',
    logo: {
      text: 'Save $50K+ on Benefits',
      href: '/'
    },
    items: [
      {
        id: 'calculator',
        label: 'ROI Calculator',
        href: '#calculator',
        badge: 'Free'
      },
      {
        id: 'case-studies',
        label: 'Success Stories',
        href: '#testimonials'
      }
    ],
    cta: {
      id: 'calculate-savings',
      label: 'Calculate Your Savings',
      href: '/pricing-calculator',
      ctaStyle: 'primary'
    },
    mobile: {
      collapseThreshold: 640,
      hamburgerStyle: 'animated',
      slideDirection: 'right'
    }
  }
}

// 🔧 NAVIGATION UTILITIES

export function getNavigationConfig(configId: string): NavigationConfig | null {
  const allConfigs = { ...navigationConfigs, ...landingPageNavs }
  return allConfigs[configId] || null
}

export function getVisibleItems(config: NavigationConfig, isMobile: boolean): NavigationItem[] {
  return config.items.filter(item => {
    if (item.hidden) return false
    if (isMobile && item.desktopOnly) return false
    if (!isMobile && item.mobileOnly) return false
    return true
  })
}

export function buildBreadcrumbs(currentPath: string, config: NavigationConfig): NavigationItem[] {
  const breadcrumbs: NavigationItem[] = []
  
  // Add home
  breadcrumbs.push({
    id: 'home',
    label: 'Home',
    href: '/'
  })
  
  // Find matching navigation items
  const findInItems = (items: NavigationItem[], path: string): NavigationItem | null => {
    for (const item of items) {
      if (item.href === path) return item
      if (item.dropdown) {
        const found = findInItems(item.dropdown, path)
        if (found) {
          breadcrumbs.push(item)
          return found
        }
      }
    }
    return null
  }
  
  const currentItem = findInItems(config.items, currentPath)
  if (currentItem) {
    breadcrumbs.push(currentItem)
  }
  
  return breadcrumbs
}

// 📊 NAVIGATION ANALYTICS

export interface NavigationAnalytics {
  configId: string
  period: {
    start: string
    end: string
  }
  metrics: {
    totalClicks: number
    topItems: Array<{
      itemId: string
      label: string
      clicks: number
      conversionRate: number
    }>
    ctaPerformance: {
      clicks: number
      conversions: number
      conversionRate: number
    }
    mobileVsDesktop: {
      mobile: { clicks: number; conversions: number }
      desktop: { clicks: number; conversions: number }
    }
  }
}

export function trackNavigationClick(itemId: string, configId: string, isMobile: boolean): void {
  // Analytics tracking implementation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigation_click', {
      item_id: itemId,
      config_id: configId,
      device_type: isMobile ? 'mobile' : 'desktop'
    })
  }
}

export function optimizeNavigationForConversions(
  config: NavigationConfig,
  analyticsData: NavigationAnalytics
): NavigationConfig {
  // Auto-optimize navigation based on performance data
  const optimizedItems = config.items.map(item => {
    const itemMetrics = analyticsData.metrics.topItems.find(m => m.itemId === item.id)
    
    if (itemMetrics && itemMetrics.conversionRate > 0.1) {
      // High-converting items get badges
      return {
        ...item,
        badge: item.badge || 'Popular'
      }
    }
    
    return item
  })
  
  return {
    ...config,
    items: optimizedItems
  }
}

// 🎨 NAVIGATION THEMES

export interface NavigationTheme {
  id: string
  name: string
  styles: {
    background: string
    text: string
    hover: string
    active: string
    dropdown: string
    cta: string
    border: string
  }
}

export const navigationThemes: Record<string, NavigationTheme> = {
  'professional': {
    id: 'professional',
    name: 'Professional Blue',
    styles: {
      background: 'bg-white',
      text: 'text-gray-700',
      hover: 'hover:text-blue-600',
      active: 'text-blue-600',
      dropdown: 'bg-white border border-gray-200 shadow-lg',
      cta: 'bg-blue-600 text-white hover:bg-blue-700',
      border: 'border-gray-200'
    }
  },
  'minimal': {
    id: 'minimal',
    name: 'Minimal Clean',
    styles: {
      background: 'bg-white/95 backdrop-blur',
      text: 'text-gray-600',
      hover: 'hover:text-gray-900',
      active: 'text-gray-900',
      dropdown: 'bg-white/95 backdrop-blur border border-gray-100 shadow-xl',
      cta: 'bg-gray-900 text-white hover:bg-gray-800',
      border: 'border-gray-100'
    }
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    styles: {
      background: 'bg-gray-900',
      text: 'text-gray-300',
      hover: 'hover:text-white',
      active: 'text-white',
      dropdown: 'bg-gray-800 border border-gray-700 shadow-xl',
      cta: 'bg-blue-500 text-white hover:bg-blue-400',
      border: 'border-gray-700'
    }
  }
}

// 🔄 NAVIGATION A/B TESTING

export function createNavigationABTest(
  testName: string,
  controlConfig: string,
  testConfig: string,
  trafficSplit: number = 50
) {
  return {
    id: `nav-test-${Date.now()}`,
    name: testName,
    variants: {
      control: controlConfig,
      test: testConfig
    },
    trafficSplit,
    startDate: new Date().toISOString(),
    status: 'draft' as const,
    metrics: {
      clicks: { control: 0, test: 0 },
      conversions: { control: 0, test: 0 }
    }
  }
}

export function getNavigationVariant(visitorId: string, route: string): string {
  // Simple hash-based assignment for consistent experience
  const hash = visitorId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  // Return test variant based on hash and route
  if (route === '/') {
    return Math.abs(hash) % 100 < 50 ? 'main-nav-standard' : 'main-nav-conversion-focused'
  }
  
  return 'main-nav-standard'
}