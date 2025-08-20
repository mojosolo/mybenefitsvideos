# fill_proposal_from_json.py
# Usage: python fill_proposal_from_json.py --template mojosolo_proposal_template.docx --selections example_selections.json --out proposal_filled.docx
import argparse, json, zipfile, io, re
from typing import Dict, List

def compute_pricing(sel: Dict) -> Dict:
    FOUNDATION_PRICE = 2499
    EXTRA_MIN_PRICE = 799
    TEASER_PRICE = 999
    DIY_PRICE = 1999
    ALT_LANG_PER_MIN = 299
    MICROSITE_STANDALONE = 4999
    MICROSITE_BUNDLED = 3999
    RUSH_MULTIPLIER = 0.5
    SUBSCRIPTION = {'none':0, 'essential':999, 'growth':2499, 'enterprise':4999}

    # apply preset shortcuts
    preset = sel.get('preset')
    if preset == 'good':
        sel.update(dict(foundation=True, foundationMinutes=max(2, sel.get('foundationMinutes',2)), extraMinutes=0, teaser=False, microsite='none', diyLicense=False, altLanguageMinutes=0))
    elif preset == 'better':
        sel.update(dict(foundation=True, foundationMinutes=max(2, sel.get('foundationMinutes',2)), extraMinutes=0, teaser=False, microsite='bundled', diyLicense=False, altLanguageMinutes=0))
    elif preset == 'best':
        sel.update(dict(foundation=True, foundationMinutes=max(2, sel.get('foundationMinutes',2)), extraMinutes=0, teaser=True, microsite='bundled', diyLicense=True, altLanguageMinutes=max(2, sel.get('altLanguageMinutes',2))))

    line = []
    if sel.get('foundation', True):
        line.append(("Foundation (includes up to {} min)".format(max(2, sel.get('foundationMinutes',2))), FOUNDATION_PRICE))
    if sel.get('extraMinutes', 0) > 0:
        line.append(("Additional Explainer Minutes ({} × ${})".format(sel['extraMinutes'], EXTRA_MIN_PRICE), sel['extraMinutes']*EXTRA_MIN_PRICE))
    if sel.get('teaser'):
        line.append(("OE Teaser (≤1 min)", TEASER_PRICE))
    if sel.get('diyLicense'):
        line.append(("DIY PPT→Video License (AI VO)", DIY_PRICE))
    if sel.get('altLanguageMinutes',0) > 0:
        line.append(("Alt‑Language Versions ({} min × ${})".format(sel['altLanguageMinutes'], ALT_LANG_PER_MIN), sel['altLanguageMinutes']*ALT_LANG_PER_MIN))

    if sel.get('microsite') == 'standalone':
        line.append(("Benefits Break Microsite (standalone)", MICROSITE_STANDALONE))
    elif sel.get('microsite') == 'bundled':
        line.append(("Benefits Break Microsite (bundled)", MICROSITE_BUNDLED))

    subtotal = sum(a for _, a in line)
    video_labels = ("Foundation","Additional Explainer Minutes","OE Teaser (≤1 min)","DIY PPT→Video License (AI VO)","Alt‑Language Versions")
    video_subtotal = sum(a for (lbl,a) in line if lbl.startswith(video_labels))
    rush = int(round(video_subtotal * RUSH_MULTIPLIER)) if sel.get('rush') else 0
    sub_mo = SUBSCRIPTION.get(sel.get('subscriptionPlan','none'), 0)
    sub_total = sub_mo * int(sel.get('subscriptionMonths', 0))
    total_now = subtotal + rush
    total_all = total_now + sub_total

    return {
        "lineItems": line,
        "subtotal": subtotal,
        "rushSurcharge": rush,
        "subscriptionTotal": sub_total,
        "totalDueNow": total_now,
        "totalAllIn": total_all
    }

def fill_docx_placeholders(template_path: str, out_path: str, mapping: Dict[str,str]):
    # Replace placeholders in word/document.xml while preserving the rest of the docx
    with zipfile.ZipFile(template_path, 'r') as zin:
        with zipfile.ZipFile(out_path, 'w') as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                if item.filename == 'word/document.xml':
                    xml = data.decode('utf-8')
                    for key, val in mapping.items():
                        xml = xml.replace(key, val)
                    data = xml.encode('utf-8')
                zout.writestr(item, data)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument('--template', required=True)
    ap.add_argument('--selections', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--client', default='[[CLIENT_NAME]]')
    ap.add_argument('--project', default='[[PROJECT_NAME]]')
    ap.add_argument('--date', default='[[DATE]]')
    ap.add_argument('--valid', default='[[VALID_THROUGH]]')
    ap.add_argument('--package', default='[[PACKAGE]]')
    ap.add_argument('--subscription', default='[[SUBSCRIPTION]]')
    args = ap.parse_args()

    with open(args.selections,'r') as f:
        sel = json.load(f)

    pricing = compute_pricing(sel)

    # Build mapping for placeholders
    mapping = {
        '[[CLIENT_NAME]]': args.client,
        '[[PROJECT_NAME]]': args.project,
        '[[DATE]]': args.date,
        '[[VALID_THROUGH]]': args.valid,
        '[[PACKAGE]]': args.package,
        '[[SUBSCRIPTION]]': args.subscription,
        '[[SUBTOTAL]]': f"${pricing['subtotal']:,}",
        '[[RUSH]]': f"${pricing['rushSurcharge']:,}",
        '[[SUBSCRIPTION_TOTAL]]': f"${pricing['subscriptionTotal']:,}",
        '[[TOTAL_DUE_NOW]]': f"${pricing['totalDueNow']:,}",
        '[[TOTAL_ALL_IN]]': f"${pricing['totalAllIn']:,}",
    }

    # Fill in up to 10 line items
    for i in range(1, 11):
        if i <= len(pricing['lineItems']):
            lbl, amt = pricing['lineItems'][i-1]
            mapping[f'[[LI{i}_LABEL]]'] = lbl
            mapping[f'[[LI{i}_AMOUNT]]'] = f"${amt:,}"
        else:
            mapping[f'[[LI{i}_LABEL]]'] = ''
            mapping[f'[[LI{i}_AMOUNT]]'] = ''

    fill_docx_placeholders(args.template, args.out, mapping)
    print(f"Wrote {args.out}")
