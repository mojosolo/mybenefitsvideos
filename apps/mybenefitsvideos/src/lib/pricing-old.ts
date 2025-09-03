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
  category: 'video' | 'microsite' | 'license' | 'subscription' | 'addon';
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
  enrollmentIncrease: number; // Percentage
  hrTimeSaved: number; // Hours per month
  costPerEmployee: number; // Dollar cost per employee reached
  breakEvenMonths: number; // Months to break even
  annualSavings: number; // Estimated annual savings
}

// Pricing constants - 2025 Correct Pricing Structure
export const PRICING_CONFIG = {
  // Video Services (per minute + tax)
  VIDEO_SERVICES: {
    standard: 799,        // $799/minute + tax (branded, stock footage)
    'semi-custom': 999,   // $999/minute + tax (branded animations)
    'full-custom': 1199,  // $1,199/minute + tax
    'full-animation': 5000, // $5,000 flat rate
  },
  
  // Video Add-ons
  OE_TEASER: 650,              // $650 + tax (1-minute)
  ALT_LANGUAGE_PER_MIN: 250,   // $250/minute + tax (after English final)
  DIY_POWERPOINT_AI: 2500,     // $2,500 + tax (AI VO)
  DIY_POWERPOINT_HUMAN: 1000,  // +$1,000 for human VO
  PPT_ALT_LANGUAGE: 3000,      // $3,000 + tax
  PPT_ALT_LANGUAGE_HUMAN: 1000, // +$1,000 for human VO
  VIDEO_UPDATES_MIN: 750,      // $750 minimum (no VO changes)
  VIDEO_UPDATES_WITH_VO: 1049, // $1,049 (with VO)
  
  // Website Services
  WEBSITE_SERVICES: {
    'benefits-break': {
      initial: 4999,   // $4,999 initial
      annual: 2499,    // $2,499 annual
    },
    'full-benefits': {
      initial: 24999,  // $24,999 initial
      annual: 12499,   // $12,499 annual
    },
    'custom-portal': {
      initial: 44999,  // $44,999+ initial
      annual: 24999,   // $24,999+ annual
    },
  },
  
  // Rush delivery
  RUSH_MULTIPLIER: 0.5, // +50% surcharge on video services only
  
  // Legacy subscription (if still needed)
  SUBSCRIPTION: {
    none: 0,
    essential: 999,
    growth: 2499,
    enterprise: 4999,
  },
  
  // Industry benchmarks for ROI calculation
  INDUSTRY_BENCHMARKS: {
    engagementIncrease: 65, // % increase in employee engagement
    enrollmentIncrease: 40, // % increase in benefits enrollment
    hrTimeSavedPerEmployee: 0.5, // Hours saved per employee per month
    averageHrHourlyRate: 35, // Average HR hourly rate
  }
} as const;

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
      'standard': 'Branded with stock footage',
      'semi-custom': 'Branded animations',
      'full-custom': 'Fully customized production',
      'full-animation': 'Complete animation package'
    };
    
    let videoAmount: number;
    let videoDescription: string;
    
    if (sel.videoType === 'full-animation') {
      videoAmount = SERVICE_PRICING.video[sel.videoType];
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
      description: `${sel.altLanguageMinutes} min × $${PRICING_CONFIG.ALT_LANGUAGE_PER_MIN}/min (after English final) + tax`,
      amount: sel.altLanguageMinutes * PRICING_CONFIG.ALT_LANGUAGE_PER_MIN,
      category: 'addon'
    });
  }

  // DIY PowerPoint License
  if (sel.diyPowerpoint) {
    const diyAmount = PRICING_CONFIG.DIY_POWERPOINT_AI + 
      (sel.diyHumanVoice ? PRICING_CONFIG.DIY_POWERPOINT_HUMAN : 0);
    const voiceType = sel.diyHumanVoice ? 'Human VO' : 'AI VO';
    
    lineItems.push({
      label: `DIY PowerPoint License (${voiceType})`,
      description: 'Transform presentations to professional videos + tax',
      amount: diyAmount,
      category: 'license'
    });
  }

  // PPT Alternative Language
  if (sel.pptAltLanguage) {
    const pptAltAmount = PRICING_CONFIG.PPT_ALT_LANGUAGE + 
      (sel.pptAltLanguageHumanVoice ? PRICING_CONFIG.PPT_ALT_LANGUAGE_HUMAN : 0);
    const voiceType = sel.pptAltLanguageHumanVoice ? 'Human VO' : 'AI VO';
    
    lineItems.push({
      label: `PPT Alternative Language (${voiceType})`,
      description: 'Translated PowerPoint video version + tax',
      amount: pptAltAmount,
      category: 'license'
    });
  }

  // Video Updates
  if (sel.videoUpdates) {
    const updateAmount = sel.videoUpdatesWithVoice ? 
      PRICING_CONFIG.VIDEO_UPDATES_WITH_VO : 
      PRICING_CONFIG.VIDEO_UPDATES_MIN;
    const updateType = sel.videoUpdatesWithVoice ? 'with VO changes' : 'no VO changes';
    
    lineItems.push({
      label: `Video Updates (${updateType})`,
      description: 'Modifications to existing video content',
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
    
    const websiteConfig = PRICING_CONFIG.WEBSITE_SERVICES[sel.websiteType];
    
    lineItems.push({
      label: `${websiteLabels[sel.websiteType]} (Initial)`,
      description: 'Custom website development and setup',
      amount: websiteConfig.initial,
      category: 'microsite'
    });
    
    lineItems.push({
      label: `${websiteLabels[sel.websiteType]} (Annual)`,
      description: 'Ongoing hosting, maintenance, and support',
      amount: websiteConfig.annual,
      category: 'subscription'
    });
  }

  // Calculate subtotal (pre-rush)
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);

  // Rush surcharge (applies only to video-related items)
  const videoSubtotal = lineItems
    .filter(item => item.category === 'video' || item.category === 'license')
    .reduce((sum, item) => sum + item.amount, 0);

  const rushSurcharge = sel.rush ? Math.round(videoSubtotal * PRICING_CONFIG.RUSH_MULTIPLIER) : 0;

  // Subscription calculations (legacy)
  const monthlySubscriptionCost = PRICING_CONFIG.SUBSCRIPTION[sel.subscriptionPlan || 'none'] || 0;
  const subscriptionTotal = monthlySubscriptionCost * (sel.subscriptionMonths || 0);

  const totalDueNow = subtotal + rushSurcharge;
  const totalAllIn = totalDueNow + subscriptionTotal;

  // Calculate timeline
  const estimatedTimeline = calculateTimeline(sel);
  const paymentTerms = "50% to start, 50% at V2 approval (Net 30 with PO for approved enterprises)";

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
    paymentTerms,
  };
}

export function calculateROI(selections: PricingSelections, employeeCount: number = 500): ROIMetrics {
  const pricing = computePricing(selections);
  const { INDUSTRY_BENCHMARKS } = PRICING_CONFIG;
  
  // Calculate cost per employee
  const costPerEmployee = pricing.totalDueNow / employeeCount;
  
  // Calculate HR time savings (hours saved per month across all employees)
  const hrTimeSaved = employeeCount * INDUSTRY_BENCHMARKS.hrTimeSavedPerEmployee;
  
  // Calculate annual savings from HR time efficiency
  const annualSavings = hrTimeSaved * 12 * INDUSTRY_BENCHMARKS.averageHrHourlyRate;
  
  // Calculate break-even period
  const monthlyBenefit = annualSavings / 12;
  const breakEvenMonths = pricing.totalDueNow / monthlyBenefit;

  return {
    employeeEngagementIncrease: INDUSTRY_BENCHMARKS.engagementIncrease,
    enrollmentIncrease: INDUSTRY_BENCHMARKS.enrollmentIncrease,
    hrTimeSaved: hrTimeSaved,
    costPerEmployee: costPerEmployee,
    breakEvenMonths: Math.ceil(breakEvenMonths),
    annualSavings: annualSavings,
  };
}

// Legacy function - no longer used with new service-based pricing
// Keeping for backward compatibility during transition
function applyPresetConfiguration(selections: PricingSelections): PricingSelections {
  return selections; // New structure doesn't use presets
}

function calculateTimeline(selections: PricingSelections): string {
  let weeks = 0;
  
  // Base timeline for video production
  if (selections.videoMinutes > 0) {
    const baseWeeks = {
      'standard': 3,
      'semi-custom': 4,
      'full-custom': 5,
      'full-animation': 6
    };
    weeks = Math.max(weeks, baseWeeks[selections.videoType]);
  }
  
  // Add time for additional components
  if (selections.oeTeaserVideo) weeks = Math.max(weeks, 3);
  if (selections.websiteType !== 'none') {
    const websiteWeeks = {
      'benefits-break': 4,
      'full-benefits': 8,
      'custom-portal': 12
    };
    weeks = Math.max(weeks, websiteWeeks[selections.websiteType]);
  }
  if (selections.diyPowerpoint) weeks = Math.max(weeks, 2);
  if (selections.altLanguageMinutes > 0) weeks += 1;
  if (selections.pptAltLanguage) weeks += 1;
  
  // Rush reduces timeline
  if (selections.rush) {
    weeks = Math.max(2, Math.ceil(weeks * 0.7));
    return `${weeks} weeks (Rush delivery)`;
  }
  
  return `${weeks}-${weeks + 1} weeks`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, suffix: string = ''): string {
  return new Intl.NumberFormat('en-US').format(num) + suffix;
}

// Default selections for calculator initialization
export const defaultPricingSelections: PricingSelections = {
  // Video Services
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
  
  // Website Services
  websiteType: 'none',
  
  // Subscription
  subscriptionPlan: 'none',
  subscriptionMonths: 0,
};