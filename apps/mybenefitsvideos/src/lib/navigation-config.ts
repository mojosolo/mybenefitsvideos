// lib/navigation-config.ts - Dynamic Navigation Configuration System

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  type: 'link' | 'dropdown' | 'mega-menu' | 'cta';
  active: boolean;
  order: number;
  metadata: {
    description?: string;
    target?: '_self' | '_blank';
    tracking?: string;
  };
  children?: NavigationSubItem[];
  megaMenu?: MegaMenuConfig;
  style?: {
    variant?: 'default' | 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    highlight?: boolean;
  };
}

export interface NavigationSubItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  active: boolean;
  tracking?: string;
}

export interface MegaMenuConfig {
  layout: 'services' | 'resources' | 'company';
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
    cta?: string;
  };
  sections: Array<{
    title: string;
    items: NavigationSubItem[];
  }>;
}

// Primary Navigation Configuration
export const primaryNavigation: NavigationItem[] = [
  {
    id: 'services',
    label: 'Services',
    type: 'mega-menu',
    active: true,
    order: 1,
    metadata: {
      description: 'Professional benefits video production services',
      tracking: 'nav-services'
    },
    megaMenu: {
      layout: 'services',
      featured: {
        title: 'Benefits Video Production',
        description: 'Professional videos that explain employee benefits clearly and drive 3x higher engagement.',
        href: '/services',
        image: '/nav-featured-video.jpg',
        cta: 'See Examples'
      },
      sections: [
        {
          title: 'Video Services',
          items: [
            {
              id: 'video-production',
              label: 'Video Production',
              href: '/services/foundation-videos',
              description: 'Professional videos from $799/min to full animation',
              icon: 'Video',
              active: true,
              tracking: 'nav-video-production'
            },
            {
              id: 'oe-teasers',
              label: 'OE Teaser Videos',
              href: '/services/teaser-videos',
              description: 'Short 1-minute videos for open enrollment campaigns',
              icon: 'Play',
              badge: '$650',
              active: true,
              tracking: 'nav-oe-teasers'
            },
            {
              id: 'diy-licenses',
              label: 'DIY PowerPoint License',
              href: '/services/diy-licenses',
              description: 'Transform presentations to professional videos',
              icon: 'FileSliders',
              badge: 'Popular',
              active: true,
              tracking: 'nav-diy-license'
            }
          ]
        },
        {
          title: 'Website Services',
          items: [
            {
              id: 'microsites',
              label: 'Benefits Microsites',
              href: '/services/microsites',
              description: 'Interactive websites starting at $4,999',
              icon: 'Globe',
              active: true,
              tracking: 'nav-microsites'
            },
            {
              id: 'full-websites',
              label: 'Full Benefits Websites',
              href: '/services/websites',
              description: 'Complete benefits portals with calculators',
              icon: 'Layout',
              active: true,
              tracking: 'nav-full-websites'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'solutions',
    label: 'Solutions',
    type: 'dropdown',
    active: true,
    order: 2,
    metadata: {
      description: 'Industry-specific solutions and use cases',
      tracking: 'nav-solutions'
    },
    children: [
      {
        id: 'healthcare',
        label: 'Healthcare',
        href: '/solutions/healthcare',
        description: 'Benefits videos for healthcare organizations',
        icon: 'Heart',
        active: true,
        tracking: 'nav-healthcare'
      },
      {
        id: 'technology',
        label: 'Technology',
        href: '/solutions/technology',
        description: 'Tech company benefits communication',
        icon: 'Laptop',
        active: true,
        tracking: 'nav-technology'
      },
      {
        id: 'manufacturing',
        label: 'Manufacturing',
        href: '/solutions/manufacturing',
        description: 'Industrial workforce benefits videos',
        icon: 'Factory',
        active: true,
        tracking: 'nav-manufacturing'
      },
      {
        id: 'financial-services',
        label: 'Financial Services',
        href: '/solutions/financial',
        description: 'Benefits videos for financial institutions',
        icon: 'Building',
        active: true,
        tracking: 'nav-financial'
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    type: 'mega-menu',
    active: true,
    order: 3,
    metadata: {
      description: 'Resources, case studies, and learning materials',
      tracking: 'nav-resources'
    },
    megaMenu: {
      layout: 'resources',
      featured: {
        title: 'Benefits Communication Guide',
        description: 'Complete guide to creating effective benefits communication that drives engagement.',
        href: '/resources/communication-guide',
        cta: 'Download Free Guide'
      },
      sections: [
        {
          title: 'Learn',
          items: [
            {
              id: 'blog',
              label: 'Blog',
              href: '/blog',
              description: 'Latest insights on benefits communication',
              icon: 'BookOpen',
              active: true,
              tracking: 'nav-blog'
            },
            {
              id: 'case-studies',
              label: 'Case Studies',
              href: '/case-studies',
              description: 'Success stories from our clients',
              icon: 'FileCheck',
              active: true,
              tracking: 'nav-case-studies'
            },
            {
              id: 'roi-calculator',
              label: 'ROI Calculator',
              href: '/calculator',
              description: 'Calculate your benefits video ROI',
              icon: 'Calculator',
              badge: 'Interactive',
              active: true,
              tracking: 'nav-roi-calculator'
            }
          ]
        },
        {
          title: 'Tools',
          items: [
            {
              id: 'pricing-calculator',
              label: 'Pricing Calculator',
              href: '/calculator',
              description: 'Get instant pricing for your project',
              icon: 'DollarSign',
              active: true,
              tracking: 'nav-pricing-calculator'
            },
            {
              id: 'video-examples',
              label: 'Video Portfolio',
              href: '/portfolio',
              description: 'Browse our video examples',
              icon: 'PlayCircle',
              active: true,
              tracking: 'nav-portfolio'
            },
            {
              id: 'templates',
              label: 'Communication Templates',
              href: '/resources/templates',
              description: 'Free benefits communication templates',
              icon: 'FileText',
              active: true,
              tracking: 'nav-templates'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'company',
    label: 'Company',
    type: 'dropdown',
    active: true,
    order: 4,
    metadata: {
      description: 'About us, team, and company information',
      tracking: 'nav-company'
    },
    children: [
      {
        id: 'about',
        label: 'About Us',
        href: '/about',
        description: 'Our mission and team',
        icon: 'Users',
        active: true,
        tracking: 'nav-about'
      },
      {
        id: 'process',
        label: 'Our Process',
        href: '/process',
        description: 'How we create engaging benefits videos',
        icon: 'Workflow',
        active: true,
        tracking: 'nav-process'
      },
      {
        id: 'careers',
        label: 'Careers',
        href: '/careers',
        description: 'Join our team',
        icon: 'Briefcase',
        active: false,
        tracking: 'nav-careers'
      }
    ]
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/calculator',
    type: 'link',
    active: true,
    order: 5,
    metadata: {
      description: 'Transparent pricing calculator',
      tracking: 'nav-pricing'
    },
    style: {
      highlight: true
    }
  },
  {
    id: 'get-quote',
    label: 'Get Quote',
    href: '/contact',
    type: 'cta',
    active: true,
    order: 6,
    metadata: {
      description: 'Contact us for a custom quote',
      tracking: 'nav-get-quote'
    },
    style: {
      variant: 'primary',
      size: 'md'
    }
  }
];

// Footer Navigation Configuration
export const footerNavigation = {
  sections: [
    {
      title: 'Services',
      links: [
        { href: '/services/foundation-videos', text: 'Video Production', tracking: 'footer-video-production' },
        { href: '/services/teaser-videos', text: 'OE Teaser Videos', tracking: 'footer-oe-teasers' },
        { href: '/services/diy-licenses', text: 'DIY Licenses', tracking: 'footer-diy-licenses' },
        { href: '/services/microsites', text: 'Website Services', tracking: 'footer-websites' },
        { href: '/calculator', text: 'Pricing Calculator', tracking: 'footer-pricing' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { href: '/solutions/healthcare', text: 'Healthcare', tracking: 'footer-healthcare' },
        { href: '/solutions/technology', text: 'Technology', tracking: 'footer-technology' },
        { href: '/solutions/manufacturing', text: 'Manufacturing', tracking: 'footer-manufacturing' },
        { href: '/solutions/financial', text: 'Financial Services', tracking: 'footer-financial' }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about', text: 'About Us', tracking: 'footer-about' },
        { href: '/process', text: 'Our Process', tracking: 'footer-process' },
        { href: '/case-studies', text: 'Case Studies', tracking: 'footer-case-studies' },
        { href: '/contact', text: 'Contact', tracking: 'footer-contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '/blog', text: 'Blog', tracking: 'footer-blog' },
        { href: '/calculator', text: 'ROI Calculator', tracking: 'footer-roi-calculator' },
        { href: '/resources/templates', text: 'Templates', tracking: 'footer-templates' },
        { href: '/portfolio', text: 'Video Examples', tracking: 'footer-portfolio' }
      ]
    }
  ],
  social: [
    { href: 'https://linkedin.com/company/mojosolo', text: 'LinkedIn', icon: 'Linkedin' },
    { href: 'https://twitter.com/mojosolo', text: 'Twitter', icon: 'Twitter' },
    { href: 'https://youtube.com/mojosolo', text: 'YouTube', icon: 'Youtube' }
  ],
  legal: [
    { href: '/privacy', text: 'Privacy Policy' },
    { href: '/terms', text: 'Terms of Service' },
    { href: '/accessibility', text: 'Accessibility' }
  ]
};

// Navigation Management Functions
export function getActiveNavItems(): NavigationItem[] {
  return primaryNavigation
    .filter(item => item.active)
    .sort((a, b) => a.order - b.order);
}

export function updateNavItemStatus(id: string, active: boolean): void {
  const item = primaryNavigation.find(nav => nav.id === id);
  if (item) {
    item.active = active;
  }
}

export function getNavItemById(id: string): NavigationItem | undefined {
  return primaryNavigation.find(item => item.id === id);
}

export function reorderNavItems(newOrder: string[]): void {
  newOrder.forEach((id, index) => {
    const item = getNavItemById(id);
    if (item) {
      item.order = index + 1;
    }
  });
}

// A/B Testing for Navigation
export function trackNavClick(itemId: string, context: string = 'header'): void {
  // This would integrate with your analytics system
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'navigation_click', {
      event_category: 'Navigation',
      event_label: `${context}-${itemId}`,
      value: 1
    });
  }
}

// Conditional Navigation Display
export function shouldShowNavItem(item: NavigationItem, userContext?: any): boolean {
  if (!item.active) return false;
  
  // Add conditional logic based on user context, A/B tests, etc.
  return true;
}

// Mobile Navigation Configuration
export const mobileNavigation = {
  primaryItems: primaryNavigation.filter(item => 
    item.active && ['services', 'solutions', 'pricing', 'get-quote'].includes(item.id)
  ),
  quickActions: [
    { label: 'Get Quote', href: '/contact', icon: 'MessageSquare', variant: 'primary' },
    { label: 'See Examples', href: '/portfolio', icon: 'Play', variant: 'outline' },
    { label: 'Calculate ROI', href: '/calculator', icon: 'Calculator', variant: 'outline' }
  ]
};
