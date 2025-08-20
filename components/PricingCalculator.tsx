// components/PricingCalculator.tsx
'use client';

import React, { useMemo, useState } from 'react';
import type { PricingBreakdown, PricingSelections } from '../lib/pricing';
import { computePricing } from '../lib/pricing';

const defaultSelections: PricingSelections = {
  preset: 'custom',
  foundation: true,
  foundationMinutes: 2,
  extraMinutes: 0,
  teaser: false,
  microsite: 'none',
  diyLicense: false,
  altLanguageMinutes: 0,
  rush: false,
  subscriptionPlan: 'none',
  subscriptionMonths: 12,
};

function Currency({ value }: { value: number }) {
  return <span>${value.toLocaleString()}</span>;
}

export default function PricingCalculator() {
  const [sel, setSel] = useState<PricingSelections>(defaultSelections);
  const [currentStep, setCurrentStep] = useState(1);

  const breakdown: PricingBreakdown = useMemo(() => computePricing({ ...sel }), [sel]);
  
  // Calculate progress based on user interactions
  const calculateProgress = () => {
    let progress = 0;
    if (sel.preset !== 'custom') progress += 25;
    if (sel.foundation) progress += 25;
    if (sel.microsite !== 'none' || sel.teaser || sel.diyLicense || sel.altLanguageMinutes > 0) progress += 25;
    if (breakdown.totalDueNow > 0) progress += 25;
    return Math.min(progress, 100);
  };
  
  const progress = calculateProgress();
  
  // Value propositions for each step
  const valueProps = {
    preset: "Choose a package that fits your needs - each designed for different company sizes and goals.",
    foundation: "Professional 2-minute explainer videos increase employee understanding by 400% compared to PDFs.",
    addons: "Enhance your communication with teasers, multilingual support, and interactive microsites.",
    subscription: "Ongoing content keeps your benefits communication fresh and engaging year-round."
  };

  const set = <K extends keyof PricingSelections>(key: K, value: PricingSelections[K]) =>
    setSel(prev => ({ ...prev, [key]: value }));

  const handlePreset = (preset: 'good' | 'better' | 'best' | 'custom') => {
    setSel(prev => ({ ...prev, preset }));
    // computePricing applies preset logic internally, but we show preset state here
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Configuration Progress</span>
            <span className="text-sm text-gray-500">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Complete your configuration to see your custom proposal</p>
        </div>
        {/* Presets */}
        <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2">Pick a starting point</h3>
          <p className="text-sm text-blue-700 mb-3">{valueProps.preset}</p>
          <div className="flex flex-wrap gap-2">
            {(['good','better','best','custom'] as const).map(p => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`px-3 py-2 rounded border ${sel.preset===p ? 'bg-black text-white' : ''}`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Foundation */}
        <div className="p-4 border rounded-md bg-green-50 border-green-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold mb-1">Foundation Video</h3>
              <p className="text-sm text-green-700">{valueProps.foundation}</p>
            </div>
            <div className="text-right text-sm">
              <div className="bg-green-100 px-2 py-1 rounded text-green-800 font-medium">
                ✓ Most Popular
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={sel.foundation}
              onChange={(e) => set('foundation', e.target.checked)}
            />
            <span>Include Foundation (2‑minute benefits explainer)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Foundation Minutes</label>
              <input
                type="number"
                min={2}
                max={10}
                className="w-full border rounded px-2 py-1"
                value={sel.foundationMinutes}
                onChange={(e) => set('foundationMinutes', Math.max(2, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Extra Minutes</label>
              <input
                type="number"
                min={0}
                max={60}
                className="w-full border rounded px-2 py-1"
                value={sel.extraMinutes}
                onChange={(e) => set('extraMinutes', Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Rush (+50% on video items)</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={sel.rush ? 'yes' : 'no'}
                onChange={(e) => set('rush', e.target.value === 'yes')}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add‑ons */}
        <div className="p-4 border rounded-md bg-purple-50 border-purple-200">
          <h3 className="font-semibold mb-2">Add‑ons</h3>
          <p className="text-sm text-purple-700 mb-3">{valueProps.addons}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={sel.teaser} onChange={(e)=>set('teaser', e.target.checked)} />
              <span>OE Teaser (≤1 min)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={sel.diyLicense} onChange={(e)=>set('diyLicense', e.target.checked)} />
              <span>DIY PPT→Video license</span>
            </label>
            <div>
              <label className="block text-sm mb-1">Alt‑language minutes</label>
              <input type="number" min={0} className="w-full border rounded px-2 py-1" value={sel.altLanguageMinutes} onChange={(e)=>set('altLanguageMinutes', Math.max(0, Number(e.target.value)))} />
            </div>
            <div>
              <label className="block text-sm mb-1">Microsite</label>
              <select className="w-full border rounded px-2 py-1" value={sel.microsite} onChange={(e)=>set('microsite', e.target.value as any)}>
                <option value="none">None</option>
                <option value="standalone">Standalone ($4,999)</option>
                <option value="bundled">Bundled ($3,999)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="p-4 border rounded-md bg-orange-50 border-orange-200">
          <h3 className="font-semibold mb-2">Subscription (ongoing content)</h3>
          <p className="text-sm text-orange-700 mb-3">{valueProps.subscription}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Plan</label>
              <select className="w-full border rounded px-2 py-1" value={sel.subscriptionPlan} onChange={(e)=>set('subscriptionPlan', e.target.value as any)}>
                <option value="none">None</option>
                <option value="essential">Essential ($999/mo)</option>
                <option value="growth">Growth ($2,499/mo)</option>
                <option value="enterprise">Enterprise ($4,999/mo)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Months</label>
              <input type="number" min={0} max={36} className="w-full border rounded px-2 py-1" value={sel.subscriptionMonths} onChange={(e)=>set('subscriptionMonths', Math.max(0, Number(e.target.value)))} />
            </div>
          </div>
          <p className="text-xs mt-2">Rollover up to 3 months. Prices exclude tax.</p>
        </div>
      </div>

      {/* Summary */}
      <aside className="p-4 border rounded-md h-fit sticky top-4 space-y-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Your Custom Quote</h3>
          {progress === 100 && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Ready</span>}
        </div>
        
        {/* Social Proof */}
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-sm">
              ★★★★★
            </div>
            <span className="text-xs text-gray-600 ml-2">(150+ companies)</span>
          </div>
          <p className="text-xs text-blue-700">
            "Our enrollment jumped 28% after using Mojo Solo's video. Employees finally understood their options."
          </p>
          <p className="text-xs text-gray-500 mt-1">— Sarah Martinez, Benefits Director</p>
        </div>
        <ul className="space-y-1 text-sm">
          {breakdown.lineItems.map((li, idx) => (
            <li key={idx} className="flex justify-between"><span>{li.label}</span><span><Currency value={li.amount} /></span></li>
          ))}
          {breakdown.discountItems.length > 0 && <li className="mt-2 font-semibold">Discounts</li>}
          {breakdown.discountItems.map((di, idx) => (
            <li key={'d'+idx} className="flex justify-between text-green-700"><span>{di.label}</span><span>-<Currency value={di.amount} /></span></li>
          ))}
        </ul>
        <div className="border-t pt-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><Currency value={breakdown.subtotal} /></div>
          <div className="flex justify-between"><span>Rush surcharge</span><Currency value={breakdown.rushSurcharge} /></div>
          <div className="flex justify-between"><span>Subscription total</span><Currency value={breakdown.subscriptionTotal} /></div>
          <div className="flex justify-between font-semibold"><span>Total due now</span><Currency value={breakdown.totalDueNow} /></div>
          <div className="flex justify-between font-semibold"><span>All‑in (with subscription)</span><Currency value={breakdown.totalAllIn} /></div>
        </div>
        <button className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
          {progress < 100 ? 'Complete Configuration' : 'Get Custom Proposal'}
        </button>
        <div className="text-center">
          <p className="text-xs text-gray-500">Free proposal • No obligation • 2-minute delivery</p>
        </div>
        
        {/* Trust Indicators */}
        <div className="border-t pt-3">
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">🔒 Secure</span>
            <span className="flex items-center">⚡ Instant</span>
            <span className="flex items-center">✓ No Spam</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
