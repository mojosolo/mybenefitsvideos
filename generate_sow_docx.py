# generate_sow_docx.py
# Build a complete SOW (DOCX) that includes Scope (Video + optional Microsite),
# "How We Work" terms, Pricing table from selections, and signature lines.
# Usage:
#   python generate_sow_docx.py --out example_sow.docx --client "Acme Health" --project "OE 2025" --date "2025-08-19" --valid "2025-09-30" --selections example_sow.json

import argparse, json, datetime, zipfile

def compute_pricing(sel):
    FOUNDATION_PRICE = 2499
    EXTRA_MIN_PRICE = 799
    TEASER_PRICE = 999
    DIY_PRICE = 1999
    ALT_LANG_PER_MIN = 299
    MICROSITE_STANDALONE = 4999
    MICROSITE_BUNDLED = 3999
    RUSH_MULTIPLIER = 0.5
    SUBSCRIPTION = {'none':0, 'essential':999, 'growth':2499, 'enterprise':4999}

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
    return {"lineItems": line, "subtotal": subtotal, "rushSurcharge": rush, "subscriptionTotal": sub_total, "totalDueNow": total_now, "totalAllIn": total_all}

def build_docx(out_path, fields, pricing, include_microsite):
    def p(text):
        return f"<w:p><w:r><w:t xml:space='preserve'>{text}</w:t></w:r></w:p>"

    def table_row(c1, c2):
        return f"<w:tr><w:tc><w:p><w:r><w:t>{c1}</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>{c2}</w:t></w:r></w:p></w:tc></w:tr>"

    header = [
        p("STATEMENT OF WORK"),
        p(f"Client: {fields['client']}"),
        p(f"Project: {fields['project']}"),
        p(f"Date: {fields['date']}    Valid Through: {fields['valid']}"),
        p("")
    ]

    scope = [p("1) SCOPE OF WORK"), p("Video Explainer(s): Branded, captioned, and delivered in standard aspect ratios (16:9, 1:1, 9:16).")]
    if include_microsite:
        scope += [p("Benefits Break Microsite:"),
                  p("• Single, branded hub to centralize benefits content (up to 18 sections), with embedded videos and links.")]
    scope += [p("Optional items may include: OE Teaser, DIY PPT→Video license, Alt‑Language versions, Animation uplift, Wellness poster pack.")]

    schedule = [p("2) SCHEDULE & MILESTONES"),
                p("Script Lock → Version 1 (V1) in 10 business days → Version 2 (V2) in 2–3 business days → Final."),
                p("Rush delivery: +50% (capacity‑dependent).")]

    reviews = [p("3) REVIEW & COLLABORATION"),
               p("All feedback in Vimeo review pages (time‑coded). Two review rounds included; V3+ billed at $650/version."),
               p("Edits outside Vimeo (email/Docs) add $500 for workflow handling."),
               p("Any version left unreviewed for 10 business days will be invoiced in full, and the project may be rescheduled.")]

    pricing_rows = "".join([table_row(lbl, f"${amt:,}") for (lbl, amt) in pricing['lineItems']])
    totals = "".join([
        table_row("Subtotal", f"${pricing['subtotal']:,}"),
        table_row("Rush Surcharge", f"${pricing['rushSurcharge']:,}"),
        table_row("Subscription Total", f"${pricing['subscriptionTotal']:,}"),
        table_row("Total Due Now", f"${pricing['totalDueNow']:,}"),
        table_row("All‑in (with subscription)", f"${pricing['totalAllIn']:,}")
    ])

    pricing_tbl = f"<w:tbl><w:tblPr><w:tblW w:w='0' w:type='auto'/></w:tblPr>{table_row('Line Item','Amount (USD)')}{pricing_rows}{totals}</w:tbl>"

    payments = [p("4) PRICING & PAYMENTS"),
                p("Payment terms: 50% to start; 50% at V2 approval. Net 30 with PO available for approved enterprise clients."),
                p("Prices exclude applicable taxes. Card payments incur a 3% processing fee.")]

    changes = [p("5) CHANGE ORDERS & KILL FEES"),
               p("Scope changes after Script Lock require a written change order and schedule reset."),
               p("If canceled post‑Script Lock but pre‑V1: 35% of remaining SOW value is due; after V1: 70% is due.")]

    legal = [p("6) ACCESS, PRIVACY & SECURITY"),
             p("Least‑privilege access; client‑owned content; secure file transfer; optional watermarking on review files."),
             p("Accessibility: captions by default; transcripts on request. Microsite built with WCAG‑aware practices."),
             p("7) INTELLECTUAL PROPERTY"),
             p("Upon final payment, client receives a non‑exclusive, perpetual license for delivered assets per SOW. Third‑party stock/fonts/music remain under their licenses."),
             p("8) ACCEPTANCE"),
             p("By signing this SOW, Client accepts these terms and the process outlined herein.")]

    sigs = [p(""),
            p("Authorized Signatures:"),
            p("Client: ____________________________   Date: __________"),
            p("Mojo Solo: _________________________   Date: __________")]

    body = "".join(header + scope + [p("")] + schedule + [p("")] + reviews + [p("")] + [pricing_tbl] + [p("")] + payments + [p("")] + changes + [p("")] + legal + [p("")] + sigs)

    content_types = """<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""
    rels = """<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>"""
    now = datetime.date.today().isoformat()
    core = f"""<?xml version="1.0" encoding="UTF-8"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Statement of Work - {fields['project']}</dc:title>
  <dc:creator>Mojo Solo</dc:creator>
  <cp:lastModifiedBy>Mojo Solo</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified>
</cp:coreProperties>"""
    app = """<?xml version="1.0" encoding="UTF-8"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Mojo Solo</Application>
</Properties>"""
    document = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
 xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
 xmlns:v="urn:schemas-microsoft-com:vml"
 xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
 xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
 xmlns:w10="urn:schemas-microsoft-com:office:word"
 xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
 xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
 xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
 xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
 xmlns:wne="http://schemas.microsoft.com/office/2006/wordml"
 xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
 mc:Ignorable="w14 wp14">
  <w:body>
    {body}
    <w:sectPr/>
  </w:body>
</w:document>
"""
    with zipfile.ZipFile(out_path, "w") as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("docProps/core.xml", core)
        z.writestr("docProps/app.xml", app)
        z.writestr("word/document.xml", document)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', required=True)
    ap.add_argument('--client', required=True)
    ap.add_argument('--project', required=True)
    ap.add_argument('--date', required=True)
    ap.add_argument('--valid', required=True)
    ap.add_argument('--selections', required=True)
    args = ap.parse_args()

    with open(args.selections, 'r') as f:
        sel = json.load(f)

    pricing = compute_pricing(sel)
    include_microsite = sel.get('microsite', 'none') in ('bundled','standalone')
    fields = {"client": args.client, "project": args.project, "date": args.date, "valid": args.valid}
    build_docx(args.out, fields, pricing, include_microsite)
    print(f"Wrote {args.out}")
