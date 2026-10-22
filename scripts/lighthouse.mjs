// npm run lighthouse: Lighthouse (mobile + desktop) on Home and one service page against
// the exported build. Run `npm run build` first. Reports land in reports/lighthouse/.
import fs from 'node:fs';
import path from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from 'playwright';
import { ROOT } from './lib.mjs';
import { serve } from './serve.mjs';

const PORT = 4500;
const urls = ['/', '/services/ai-agents-and-automation/'];
const dir = path.join(ROOT, 'reports/lighthouse');
fs.mkdirSync(dir, { recursive: true });

const server = await serve(PORT);
const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
for (const formFactor of ['mobile', 'desktop']) {
  for (const u of urls) {
    const config = formFactor === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
    const r = await lighthouse(`http://localhost:${PORT}${u}`, { port: chrome.port, output: 'html', logLevel: 'error' }, config);
    const c = r.lhr.categories;
    const score = (k) => Math.round(c[k].score * 100);
    rows.push({ formFactor, url: u, performance: score('performance'), accessibility: score('accessibility'), bestPractices: score('best-practices'), seo: score('seo') });
    fs.writeFileSync(path.join(dir, `${formFactor}${u.replace(/\//g, '_')}.html`), r.report);
  }
}
await chrome.kill();
server.close();
console.table(rows);
fs.writeFileSync(path.join(dir, 'scores.json'), JSON.stringify(rows, null, 2));
const low = rows.filter((r) => Math.min(r.performance, r.accessibility, r.bestPractices, r.seo) < 95);
if (low.length) {
  console.log('Below 95:', low);
  process.exit(1);
}
console.log('LIGHTHOUSE ≥ 95 on all categories');
