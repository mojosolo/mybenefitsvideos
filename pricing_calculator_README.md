# Mojo Solo Pricing Calculator

This package contains:
- `mojosolo_pricing_calculator.schema.json` — JSON Schema describing the pricing form fields.
- `pricing_calculator_example.ts` — Reference computation for totals and line items to display in your UI.

## Pricing Inputs
See the schema for details. Key inputs include the Foundation package, extra minutes, teaser, microsite mode (standalone vs bundled), DIY license, alt-language minutes, rush, and subscription plan/months.

## Pricing Rules (2025)
- Foundation: $2,499 (includes up to 2 minutes).
- Extra Minutes: $799/min.
- Teaser: $999.
- DIY PPT→Video License: $1,999 (Human VO +$1,000).
- Alt-Language: $299/min (after English final).
- Microsite: $4,999 standalone or $3,999 when bundled with Foundation.
- Rush: +50% surcharge on video-related items.
- Subscriptions: Essential $999/mo (1 minute/mo), Growth $2,499/mo (3 minutes/mo), Enterprise $4,999/mo (6 minutes/mo). Rollover up to 3 months.

> Taxes excluded. Payment terms: 50% to start; 50% at V2 approval (Net 30 with PO for approved enterprises).

## Usage
1. Bind the schema to your form (or map the fields manually in your UI).
2. Collect selections into a `PricingSelections` object.
3. Call `computePricing(selections)` to compute line items and totals.
4. Render the `lineItems`, `discountItems`, `subtotal`, `rushSurcharge`, `subscriptionTotal`, `totalDueNow`, and `totalAllIn` in your pricing UI.
