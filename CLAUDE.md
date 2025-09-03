# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Mojo Solo pricing calculator and proposal generation system for benefits explainer videos and microsites. The codebase provides tools to calculate pricing, generate proposals, and create Statements of Work (SOW) for client projects.

## Architecture

The system consists of:
- **TypeScript/React Components**: Interactive pricing calculator UI (`components/PricingCalculator.tsx`)
- **Pricing Logic Library**: Core pricing computation (`lib/pricing.ts`) 
- **Python Utilities**: DOCX document generation (`fill_proposal_from_json.py`, `generate_sow_docx.py`)
- **Schema Definition**: JSON Schema for pricing selections (`mojosolo_pricing_calculator.schema.json`)

## Common Commands

### Generate Proposal from Selections
```bash
# Using Python (recommended - no external dependencies)
python fill_proposal_from_json.py \
  --template mojosolo_proposal_template.docx \
  --selections example_selections.json \
  --out proposal_filled.docx \
  --client "Acme Health" \
  --project "OE 2025 Launch" \
  --date "2025-08-19" \
  --valid "2025-09-30" \
  --package "BEST — Launch + License" \
  --subscription "Essential ($999/mo)"
```

### Generate Complete SOW
```bash
python generate_sow_docx.py \
  --out example_sow.docx \
  --client "Acme Health" \
  --project "OE 2025" \
  --date "2025-08-19" \
  --valid "2025-09-30" \
  --selections example_sow.json
```

## Pricing Structure (2025)

### Base Packages
- **Foundation**: $2,499 (includes up to 2 minutes)
- **Extra Minutes**: $799/minute
- **Teaser**: $999 (≤1 minute OE teaser)
- **DIY PPT→Video License**: $1,999 (AI VO), +$1,000 for Human VO
- **Alt-Language**: $299/minute (after English final)
- **Rush**: +50% surcharge on video-related items

### Microsite Options
- **Standalone**: $4,999
- **Bundled with Foundation**: $3,999 (saves $1,000)

### Subscription Plans
- **Essential**: $999/month (1 minute/month)
- **Growth**: $2,499/month (3 minutes/month)
- **Enterprise**: $4,999/month (6 minutes/month)
- Rollover allowed up to 3 months

### Preset Packages
- **Good**: Foundation only (2 minutes)
- **Better**: Foundation + Bundled Microsite
- **Best**: Foundation + Teaser + Bundled Microsite + DIY License + Alt-Language (2 min)

## Key Implementation Details

### Pricing Computation
The pricing logic (`computePricing()`) handles:
1. Applies preset configurations (good/better/best)
2. Calculates line items based on selections
3. Computes bundle discounts for microsite
4. Applies rush surcharge to video items only
5. Calculates subscription totals
6. Returns complete breakdown with subtotals

### Document Generation
The Python scripts use native `zipfile` to manipulate DOCX files:
- Reads template with placeholders (e.g., `[[CLIENT_NAME]]`)
- Computes pricing from JSON selections
- Replaces placeholders with calculated values
- Outputs filled DOCX document

### Type Definitions
Core types are defined in `lib/pricing.ts`:
- `PricingSelections`: Input configuration
- `PricingBreakdown`: Computed pricing with line items
- `SubscriptionPlan`: 'none' | 'essential' | 'growth' | 'enterprise'
- `MicrositeMode`: 'none' | 'standalone' | 'bundled'

## Important Notes

- Prices exclude taxes
- Payment terms: 50% to start, 50% at V2 approval (Net 30 with PO for approved enterprises)
- Vimeo reviews only; 2 rounds included
- V3+ edits: $650 additional
- Unreviewed content ≥10 business days will be invoiced
- DOCX templates support up to 10 line items; extras are left blank