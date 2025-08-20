# Mojo Solo Proposal Template (DOCX) — Auto‑fill from JSON

This template uses simple placeholders (e.g., [[CLIENT_NAME]]) so you can programmatically fill a proposal from calculator selections.

## Files
- `mojosolo_proposal_template.docx` — base DOCX with placeholders
- `example_selections.json` — sample input matching the pricing calculator schema
- `fill_proposal_from_json.py` — Python helper (no external deps) that computes totals and fills placeholders
- `fill_proposal_from_json.ts` — Node/TS helper (requires `yauzl` and `yazl`) to fill placeholders

## Python (recommended)
```bash
python fill_proposal_from_json.py --template mojosolo_proposal_template.docx   --selections example_selections.json   --out proposal_filled.docx   --client "Acme Health"   --project "OE 2025 Launch"   --date "2025-08-19"   --valid "2025-09-30"   --package "BEST — Launch + License"   --subscription "Essential ($999/mo)"
```

## Node (optional)
Install: `npm i -D ts-node typescript yauzl yazl`

```bash
ts-node fill_proposal_from_json.ts --template mojosolo_proposal_template.docx   --selections example_selections.json   --out proposal_filled.docx   --client "Acme Health"   --project "OE 2025 Launch"   --date "2025-08-19"   --valid "2025-09-30"   --package "BEST — Launch + License"   --subscription "Essential ($999/mo)"
```

## Notes
- The helpers compute pricing using the same rules as the web calculator.
- The DOCX contains up to 10 line item rows; extras are left blank.
- Prices exclude tax; refer to your SOW for terms (Vimeo reviews only; 2 rounds incl.; V3+ $650; rush +50%; unreviewed ≥10 business days = invoiced).

