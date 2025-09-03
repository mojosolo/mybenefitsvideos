// lib/pricing.ts - Accurate service-based pricing for myBenefitsVideos.com

export type VideoServiceType = 'standard' | 'semi-custom' | 'full-custom' | 'full-animation';
export type WebsiteServiceType = 'none' | 'benefits-break' | 'full-benefits' | 'custom-portal';
export type SubscriptionPlan = 'none' | 'essential' | 'growth' | 'enterprise';

// **CORRECT PRICING STRUCTURE** (2025)
export const SERVICE_PRICING = {
  // Video Services (per minute + tax)
  video: {
    standard: 799,        // $799/minute + tax (branded, stock footage)
    'semi-custom': 999,   // $999/minute + tax (branded animations)
    'full-custom': 1199,  // $1,199/minute + tax (fully customized)
    'full-animation': 5000 // $5,000 flat rate (complete animation)
  },
  
  // Website Services (initial + annual)
  website: {
    'benefits-break': { initial: 4999, annual: 2499 },   // Benefits Break Microsite
    'full-benefits': { initial: 24999, annual: 12499 }, // Full Benefits Site  
    'custom-portal': { initial: 44999, annual: 24999 }  // Custom Benefits Portal
  },
  
  // Subscription Plans (monthly)
  subscription: {
    none: 0,                         // No subscription
    essential: 999,                  // $999/month - 1 minute/month
    growth: 2499,                    // $2,499/month - 3 minutes/month
    enterprise: 4999                 // $4,999/month - 6 minutes/month
  },

  // Subscription Minutes Included
  subscription_MINUTES: {
    none: 0,                         // No subscription
    essential: 1,                    // 1 minute/month
    growth: 3,                       // 3 minutes/month
    enterprise: 6                    // 6 minutes/month
  },

  // Additional Services
  addons: {
    oeTeaserVideo: 650,              // One-minute OE Teaser + tax
    altLanguage: 250,                // Per minute of final video + tax
    diyPowerpoint: 2500,             // DIY PowerPoint + tax
    diyHumanVoice: 1000,             // Human VO upgrade + tax
    pptAltLanguage: 3000,            // PPT translated + tax
    pptAltLanguageHuman: 1000,       // Human VO for translated + tax
    videoUpdatesBasic: 750,          // Without voice-over changes + tax
    videoUpdatesVoice: 1049,         // With voice-over changes + tax
    rushSurchargePercent: 50         // 50% surcharge on video services only
  }
} as const;

export interface PricingSelections {
  // Video Services
  videoType: VideoServiceType;
  videoMinutes: number; // >= 1
  oeTeaserVideo: boolean;
  altLanguageMinutes: number; // >= 0
  diyPowerpoint: boolean;
  diyHumanVoice: boolean; // Human voice upgrade for DIY
  pptAltLanguage: boolean;
  pptAltLanguageHumanVoice: boolean;
  videoUpdates: boolean;
  videoUpdatesWithVoice: boolean;
  rush: boolean; // +50% on video services only
  
  // Website Services
  websiteType: WebsiteServiceType;
  
  // Subscription (if applicable)
  subscriptionPlan: SubscriptionPlan;
  subscriptionMonths: number; // >= 0
}

export interface PricingLineItem {
  label: string;
  description?: string;
  amount: number;
  category: 'video' | 'website' | 'addon' | 'subscription';
}

export interface PricingBreakdown {
  lineItems: PricingLineItem[];
  discountItems: { label: string; description?: string; amount: number }[];
  subtotal: number;
  rushSurcharge: number;
  subscriptionTotal: number;
  totalDueNow: number;
  totalAllIn: number;
  monthlySubscriptionCost: number;
  estimatedTimeline: string;
  paymentTerms: string;
}

export interface ROIMetrics {
  employeeEngagementIncrease: number; // Percentage
  enrollmentRateIncrease: number; // Percentage
  hrTimeSavingsHours: number; // Hours saved per month
  costPerEmployee: number; // Cost per employee
  breakEvenMonths: number; // Months to break even
  annualSavings: number; // Estimated annual savings
}

// Default selections for calculator initialization
export const defaultPricingSelections: PricingSelections = {
  videoType: 'standard',
  videoMinutes: 2,
  oeTeaserVideo: false,
  altLanguageMinutes: 0,
  diyPowerpoint: false,
  diyHumanVoice: false,
  pptAltLanguage: false,
  pptAltLanguageHumanVoice: false,
  videoUpdates: false,
  videoUpdatesWithVoice: false,
  rush: false,
  websiteType: 'none',
  subscriptionPlan: 'none',
  subscriptionMonths: 0
};

export function computePricing(sel: PricingSelections): PricingBreakdown {
  const lineItems: PricingLineItem[] = [];
  const discounts: { label: string; description?: string; amount: number }[] = [];
  
  // Video Services - Main video production
  if (sel.videoMinutes > 0) {
    const videoTypeLabels = {
      'standard': 'Standard Video',
      'semi-custom': 'Semi-Custom Video', 
      'full-custom': 'Full Custom Video',
      'full-animation': 'Full Animation Video'
    };
    
    const videoTypeDescriptions = {
      'standard': 'Branded with logo and colors, stock footage',
      'semi-custom': 'Branded animations and transitions',
      'full-custom': 'Fully customized production',
      'full-animation': 'Complete animated video production'
    };
    
    let videoAmount: number;
    let videoDescription: string;
    
    if (sel.videoType === 'full-animation') {
      videoAmount = SERVICE_PRICING.video['full-animation'];
      videoDescription = videoTypeDescriptions[sel.videoType];
    } else {
      videoAmount = SERVICE_PRICING.video[sel.videoType] * sel.videoMinutes;
      videoDescription = `${sel.videoMinutes} min × $${SERVICE_PRICING.video[sel.videoType]}/min - ${videoTypeDescriptions[sel.videoType]}`;
    }
    
    lineItems.push({
      label: `${videoTypeLabels[sel.videoType]} (${sel.videoMinutes} min)`,
      description: videoDescription + ' + tax',
      amount: videoAmount,
      category: 'video'
    });
  }
  
  // OE Teaser Video
  if (sel.oeTeaserVideo) {
    lineItems.push({
      label: 'Open Enrollment Teaser Video (1 min)',
      description: 'Short promotional video for OE campaigns + tax',
      amount: SERVICE_PRICING.addons.oeTeaserVideo,
      category: 'video'
    });
  }
  
  // Alternative Language Versions
  if (sel.altLanguageMinutes > 0) {
    lineItems.push({
      label: `Alternative Language Video`,
      description: `${sel.altLanguageMinutes} min × $${SERVICE_PRICING.addons.altLanguage}/min (after English final) + tax`,
      amount: sel.altLanguageMinutes * SERVICE_PRICING.addons.altLanguage,
      category: 'addon'
    });
  }
  
  // DIY PowerPoint License
  if (sel.diyPowerpoint) {
    const diyAmount = SERVICE_PRICING.addons.diyPowerpoint + 
      (sel.diyHumanVoice ? SERVICE_PRICING.addons.diyHumanVoice : 0);
    const voiceType = sel.diyHumanVoice ? 'Human VO' : 'AI VO';
    
    lineItems.push({
      label: `DIY PowerPoint License (${voiceType})`,
      description: 'Transform presentations to professional videos + tax',
      amount: diyAmount,
      category: 'addon'
    });
  }
  
  // PPT Alternative Language
  if (sel.pptAltLanguage) {
    const pptAltAmount = SERVICE_PRICING.addons.pptAltLanguage + 
      (sel.pptAltLanguageHumanVoice ? SERVICE_PRICING.addons.pptAltLanguageHuman : 0);
    const voiceType = sel.pptAltLanguageHumanVoice ? 'Human VO' : 'AI VO';
    
    lineItems.push({
      label: `PPT Alternative Language (${voiceType})`,
      description: 'Translated PowerPoint video version + tax',
      amount: pptAltAmount,
      category: 'addon'
    });
  }
  
  // Video Updates
  if (sel.videoUpdates) {
    const updateAmount = sel.videoUpdatesWithVoice ? 
      SERVICE_PRICING.addons.videoUpdatesVoice : 
      SERVICE_PRICING.addons.videoUpdatesBasic;
    const updateType = sel.videoUpdatesWithVoice ? 'with VO changes' : 'no VO changes';
    
    lineItems.push({
      label: `Video Updates (${updateType})`,
      description: 'Modifications to existing video content + tax',
      amount: updateAmount,
      category: 'addon'
    });
  }
  
  // Website Services
  if (sel.websiteType !== 'none') {
    const websiteLabels = {
      'benefits-break': 'Benefits Break Microsite',
      'full-benefits': 'Full Benefits Website',
      'custom-portal': 'Custom Benefits Portal'
    };
    
    const websiteConfig = SERVICE_PRICING.website[sel.websiteType];
    
    lineItems.push({
      label: `${websiteLabels[sel.websiteType]} (Initial)`,
      description: 'Custom website development and setup + tax',
      amount: websiteConfig.initial,
      category: 'website'
    });
    
    lineItems.push({
      label: `${websiteLabels[sel.websiteType]} (Annual)`,
      description: 'Hosting, maintenance, and updates + tax',
      amount: websiteConfig.annual,
      category: 'website'
    });
  }
  
  // Calculate subtotal
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  // Rush surcharge (applies only to video-related items)
  const videoSubtotal = lineItems
    .filter(item => item.category === 'video' || item.category === 'addon')
    .reduce((sum, item) => sum + item.amount, 0);
  const rushSurcharge = sel.rush ? Math.round(videoSubtotal * (SERVICE_PRICING.addons.rushSurchargePercent / 100)) : 0;
  
  // No subscriptions in current model - simplified
  const monthlySubscriptionCost = 0;
  const subscriptionTotal = 0;
  
  const totalDueNow = subtotal + rushSurcharge;
  const totalAllIn = totalDueNow + subscriptionTotal;
  
  // Estimate timeline based on video complexity and rush
  let estimatedTimeline = '15 business days';
  if (sel.videoType === 'full-animation') {
    estimatedTimeline = '4-6 weeks';
  } else if (sel.videoType === 'full-custom') {
    estimatedTimeline = '3-4 weeks';
  } else if (sel.rush) {
    estimatedTimeline = '7-10 business days';
  }
  
  return {
    lineItems,
    discountItems: discounts,
    subtotal,
    rushSurcharge,
    subscriptionTotal,
    totalDueNow,
    totalAllIn,
    monthlySubscriptionCost,
    estimatedTimeline,
    paymentTerms: '50% to start, 50% at V2 approval (Net 30 with PO for approved enterprises)'
  };
}

export function calculateROI(selections: PricingSelections, employeeCount: number = 500): ROIMetrics {
  const pricing = computePricing(selections);
  
  // Calculate cost per employee
  const costPerEmployee = pricing.totalDueNow / employeeCount;
  
  // Industry benchmarks for benefits video ROI
  const engagementIncrease = 40; // 40% average increase
  const enrollmentIncrease = 25; // 25% average increase
  const hrTimeSavingsHours = Math.round(employeeCount * 0.5); // 30 minutes per employee saved
  
  // Estimate annual savings (HR time + improved enrollment efficiency)
  const hourlyHRCost = 45; // Average HR cost per hour
  const annualSavings = hrTimeSavingsHours * 12 * hourlyHRCost;
  const breakEvenMonths = Math.round(pricing.totalDueNow / (annualSavings / 12));
  
  return {
    employeeEngagementIncrease: engagementIncrease,
    enrollmentRateIncrease: enrollmentIncrease,
    hrTimeSavingsHours,
    costPerEmployee,
    breakEvenMonths: Math.max(1, breakEvenMonths),
    annualSavings
  };
}

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(num: number): string {
  return `${num}%`;
}