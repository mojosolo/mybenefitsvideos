// fill_proposal_from_json.ts
// Usage: ts-node fill_proposal_from_json.ts --template mojosolo_proposal_template.docx --selections example_selections.json --out proposal_filled.docx --client "Acme Inc." --project "OE 2025"
import fs from 'fs';
import path from 'path';
import yauzl from 'yauzl';
import yazl from 'yazl';
import { computePricing } from './lib/pricing';

interface Args { [k: string]: string }
function arg(k: string, def='') { const i = process.argv.indexOf(`--${k}`); return i> -1 ? (process.argv[i+1]||'') : def; }

const template = arg('template');
const selectionsPath = arg('selections');
const out = arg('out');
const client = arg('client', '[[CLIENT_NAME]]');
const project = arg('project', '[[PROJECT_NAME]]');
const date = arg('date', '[[DATE]]');
const valid = arg('valid', '[[VALID_THROUGH]]');
const pkg = arg('package', '[[PACKAGE]]');
const subscription = arg('subscription', '[[SUBSCRIPTION]]');

if (!template || !selectionsPath || !out) {
  console.error('Missing --template, --selections, or --out');
  process.exit(1);
}

const selections = JSON.parse(fs.readFileSync(selectionsPath, 'utf8'));
const pricing = computePricing(selections);

const mapping: Record<string,string> = {
  '[[CLIENT_NAME]]': client,
  '[[PROJECT_NAME]]': project,
  '[[DATE]]': date,
  '[[VALID_THROUGH]]': valid,
  '[[PACKAGE]]': pkg,
  '[[SUBSCRIPTION]]': subscription,
  '[[SUBTOTAL]]': `$${pricing.subtotal.toLocaleString()}`,
  '[[RUSH]]': `$${pricing.rushSurcharge.toLocaleString()}`,
  '[[SUBSCRIPTION_TOTAL]]': `$${pricing.subscriptionTotal.toLocaleString()}`,
  '[[TOTAL_DUE_NOW]]': `$${pricing.totalDueNow.toLocaleString()}`,
  '[[TOTAL_ALL_IN]]': `$${pricing.totalAllIn.toLocaleString()}`,
};

for (let i=1;i<=10;i++) {
  if (i <= pricing.lineItems.length) {
    const [lbl, amt] = pricing.lineItems[i-1];
    mapping[`[[LI${i}_LABEL]]`] = lbl;
    mapping[`[[LI${i}_AMOUNT]]`] = `$${amt.toLocaleString()}`;
  } else {
    mapping[`[[LI${i}_LABEL]]`] = '';
    mapping[`[[LI${i}_AMOUNT]]`] = '';
  }
}

// Replace placeholders in word/document.xml inside the .docx (zip)
function replaceInBuffer(buf: Buffer, map: Record<string,string>) {
  let xml = buf.toString('utf8');
  for (const [k,v] of Object.entries(map)) xml = xml.split(k).join(v);
  return Buffer.from(xml, 'utf8');
}

yauzl.open(template, { lazyEntries: true }, (err, zip) => {
  if (err || !zip) throw err;
  const zipOut = new yazl.ZipFile();
  zip.on('entry', (entry) => {
    zip.openReadStream(entry, (e, readStream) => {
      if (e || !readStream) throw e;
      const chunks: Buffer[] = [];
      readStream.on('data', (c) => chunks.push(c));
      readStream.on('end', () => {
        let data = Buffer.concat(chunks);
        if (entry.fileName === 'word/document.xml') {
          data = replaceInBuffer(data, mapping);
        }
        zipOut.addBuffer(data, entry.fileName);
        zip.readEntry();
      });
    });
  });
  zip.on('end', () => {
    zipOut.end();
    const ws = fs.createWriteStream(out);
    zipOut.outputStream.pipe(ws);
  });
  zip.readEntry();
});
