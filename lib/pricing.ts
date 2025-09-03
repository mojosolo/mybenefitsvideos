// lib/pricing.ts
export type SubscriptionPlan = 'none' | 'essential' | 'growth' | 'enterprise';
export type MicrositeMode = 'none' | 'standalone' | 'bundled';

export interface PricingSelections {
  preset?: 'good' | 'better' | 'best' | 'custom';
  foundation: boolean;
  foundationMinutes: number; // >= 2
  extraMinutes: number; // >= 0
  teaser: boolean;
  microsite: MicrositeMode;
  diyLicense: boolean;
  altLanguageMinutes: number; // >= 0
  rush: boolean;
  subscriptionPlan: SubscriptionPlan;
  subscriptionMonths: number; // >= 0
}

export interface PricingBreakdown {
  lineItems: { label: string; amount: number }[];
  discountItems: { label: string; amount: number }[];
  subtotal: number;
  rushSurcharge: number;
  subscriptionTotal: number;
  totalDueNow: number;
  totalAllIn: number;
}

export function computePricing(sel: PricingSelections): PricingBreakdown {
  const FOUNDATION_PRICE = 2499;
  const EXTRA_MIN_PRICE = 799;
  const TEASER_PRICE = 999;
  const DIY_PRICE = 1999;
  const ALT_LANG_PER_MIN = 299;
  const MICROSITE_STANDALONE = 4999;
  const MICROSITE_BUNDLED = 3999;
  const RUSH_MULTIPLIER = 0.5;

  const SUBSCRIPTION = {
    none: 0,
    essential: 999,
    growth: 2499,
    enterprise: 4999,
  };

  const lineItems: { label: string; amount: number }[] = [];
  const discounts: { label: string; amount: number }[] = [];

  // Optional presets
  if (sel.preset === 'good') {
    sel.foundation = true;
    sel.foundationMinutes = Math.max(2, sel.foundationMinutes || 2);
    sel.extraMinutes = 0;
    sel.teaser = false;
    sel.microsite = 'none';
    sel.diyLicense = false;
    sel.altLanguageMinutes = 0;
  } else if (sel.preset === 'better') {
    sel.foundation = true;
    sel.foundationMinutes = Math.max(2, sel.foundationMinutes || 2);
    sel.extraMinutes = 0;
    sel.teaser = false;
    sel.microsite = 'bundled';
    sel.diyLicense = false;
    sel.altLanguageMinutes = 0;
  } else if (sel.preset === 'best') {
    sel.foundation = true;
    sel.foundationMinutes = Math.max(2, sel.foundationMinutes || 2);
    sel.extraMinutes = 0;
    sel.teaser = true;
    sel.microsite = 'bundled';
    sel.diyLicense = true;
    sel.altLanguageMinutes = Math.max(2, sel.altLanguageMinutes || 2);
  }

  // Foundation
  if (sel.foundation) {
    lineItems.push({ label: `Foundation (includes up to ${Math.max(2, sel.foundationMinutes)} min)`, amount: FOUNDATION_PRICE });
  }
  if (sel.extraMinutes && sel.extraMinutes > 0) {
    lineItems.push({ label: `Additional Explainer Minutes (${sel.extraMinutes} × $${EXTRA_MIN_PRICE})`, amount: sel.extraMinutes * EXTRA_MIN_PRICE });
  }
  if (sel.teaser) lineItems.push({ label: 'OE Teaser (≤1 min)', amount: TEASER_PRICE });
  if (sel.diyLicense) lineItems.push({ label: 'DIY PPT→Video License (AI VO)', amount: DIY_PRICE });
  if (sel.altLanguageMinutes && sel.altLanguageMinutes > 0) {
    lineItems.push({ label: `Alt‑Language Versions (${sel.altLanguageMinutes} min × $${ALT_LANG_PER_MIN})`, amount: sel.altLanguageMinutes * ALT_LANG_PER_MIN });
  }

  // Microsite
  if (sel.microsite === 'standalone') {
    lineItems.push({ label: 'Benefits Break Microsite (standalone)', amount: MICROSITE_STANDALONE });
  } else if (sel.microsite === 'bundled') {
    lineItems.push({ label: 'Benefits Break Microsite (bundled)', amount: MICROSITE_BUNDLED });
    discounts.push({ label: 'Bundle savings vs. standalone microsite', amount: MICROSITE_STANDALONE - MICROSITE_BUNDLED });
  }

  // Subtotal (pre-rush)
  const subtotal = lineItems.reduce((s, li) => s + li.amount, 0);

  // Rush applies to video-related items
  const videoLabels = ['Foundation', 'Additional Explainer Minutes', 'OE Teaser (≤1 min)', 'DIY PPT→Video License (AI VO)', 'Alt‑Language Versions'];
  const videoSubtotal = lineItems
    .filter(li => videoLabels.some(v => li.label.indexOf(v) === 0))
    .reduce((s, li) => s + li.amount, 0);

  const rushSurcharge = sel.rush ? Math.round(videoSubtotal * RUSH_MULTIPLIER) : 0;

  // Subscription
  const subMonthly = SUBSCRIPTION[sel.subscriptionPlan || 'none'] || 0;
  const subscriptionTotal = subMonthly * (sel.subscriptionMonths || 0);

  const totalDueNow = subtotal + rushSurcharge;
  const totalAllIn = totalDueNow + subscriptionTotal;

  return {
    lineItems,
    discountItems: discounts,
    subtotal,
    rushSurcharge,
    subscriptionTotal,
    totalDueNow,
    totalAllIn,
  };
}
