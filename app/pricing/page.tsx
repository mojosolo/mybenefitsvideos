// app/pricing/page.tsx
import React from 'react';
import PricingCalculator from '../../components/PricingCalculator';

export const metadata = {
  title: 'Pricing — Mojo Solo',
  description: 'Start Simple. Scale Smart. Transparent bundles, clear add-ons, and monthly content with rollover.'
};

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Start Simple. Scale Smart.</h1>
        <p className="text-slate-600">Launch a crystal‑clear benefits explainer fast—then add a microsite and ongoing content as you grow.</p>
      </section>

      <section>
        <PricingCalculator />
      </section>

      <section className="prose max-w-none">
        <h2>How we work (summary)</h2>
        <ul>
          <li>Script lock → V1 in 10 business days → V2 in 2–3 days; Rush +50%.</li>
          <li>All feedback in Vimeo; 2 rounds included; V3+ $650/version; non‑Vimeo feedback +$500.</li>
          <li>Any version unreviewed ≥10 business days is invoiced in full.</li>
          <li>Alt‑language after English final; updates priced separately. Prices exclude tax.</li>
        </ul>
      </section>
    </main>
  );
}
