// npm run e2e: click through the built site in Chromium. Visits every registry page,
// every journey step on /map, and every interactive flow. Fails on console errors,
// page errors, dead links, horizontal overflow or a broken flow.
// Run `npm run build` first. Screenshots land in reports/screenshots/.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT, loadRegistry } from './lib.mjs';
import { serve } from './serve.mjs';

const PORT = 4400;
const BASE = `http://localhost:${PORT}`;
const SHOTS = path.join(ROOT, 'reports/screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

const { pages } = await loadRegistry();
const server = await serve(PORT);
const browser = await chromium.launch();
const results = [];
const errors = [];
let current = '';

function watch(page) {
  page.on('console', (m) => {
    // the 404 page is served with HTTP 404 on purpose; Chromium logs that as a console error
    if (m.type() === 'error' && !(current.includes('/404/') && m.text().includes('status of 404'))) errors.push(`${current}: console error: ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`${current}: page error: ${e.message}`));
}

async function check(name, fn) {
  current = name;
  try {
    await fn();
    results.push(`✓ ${name}`);
  } catch (e) {
    results.push(`✗ ${name}: ${e.message.split('\n')[0]}`);
    errors.push(`${name}: ${e.message.split('\n')[0]}`);
  }
}

const assert = (c, msg) => {
  if (!c) throw new Error(msg);
};

const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
watch(page);
const payloads = [];
page.on('console', (m) => {
  if (m.text().startsWith('[submit:')) payloads.push(m.text());
});

// 1. Every registry page loads, has one H1 and no console errors.
for (const p of pages) {
  await check(`page ${p.path}`, async () => {
    const url = p.path === '/404/' ? '/does-not-exist/' : p.path;
    const res = await page.goto(BASE + url, { waitUntil: 'networkidle' });
    assert(res.status() === (p.path === '/404/' ? 404 : 200), `HTTP ${res.status()}`);
    assert((await page.locator('h1').count()) === 1, 'H1 count != 1');
    assert((await page.locator('h1').innerText()).trim() === p.h1, 'H1 text mismatch');
  });
}

// 2. Every journey step on /map is clickable and lands on a live page.
await page.goto(`${BASE}/map/`, { waitUntil: 'networkidle' });
const steps = await page.$$eval('[data-journey] [data-journey-step]', (as) =>
  as.map((a) => ({ href: a.getAttribute('href'), journey: a.closest('[data-journey]').getAttribute('data-journey'), label: a.innerText.split('\n')[1] })),
);
assert(steps.length >= 18, `expected ≥ 18 journey steps, found ${steps.length}`);
for (const s of steps) {
  await check(`journey ${s.journey}: ${s.label} (${s.href})`, async () => {
    await page.goto(`${BASE}/map/`, { waitUntil: 'networkidle' });
    await page.locator(`[data-journey="${s.journey}"] a[href="${s.href}"]`).first().click();
    await page.waitForURL((u) => u.pathname === s.href.split(/[?#]/)[0], { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    assert((await page.locator('h1').count()) === 1, 'no H1 after click');
    assert(!(await page.title()).startsWith('Page not found'), 'landed on 404');
  });
}

// 3. Sitemap tree on /map: every node clickable.
await check('map: sitemap tree has every registry page', async () => {
  await page.goto(`${BASE}/map/`, { waitUntil: 'networkidle' });
  const n = await page.locator('[data-testid="sitemap-tree"] a').count();
  assert(n === pages.length, `tree links ${n} != registry ${pages.length}`);
});
await check('map: inventory sorts and shows link counts', async () => {
  const firstBefore = await page.locator('[data-testid="inventory"] tbody tr:first-child th').innerText();
  await page.getByRole('button', { name: /^Path/ }).click();
  const firstAfter = await page.locator('[data-testid="inventory"] tbody tr:first-child th').innerText();
  assert(firstBefore !== firstAfter, 'sorting did not change order');
  await page.getByRole('button', { name: /^Inbound/ }).click();
  const cell = await page.locator('[data-testid="inventory"] tbody tr:first-child td').nth(5).innerText();
  assert(/^\d+$/.test(cell.trim()), `inbound count not numeric: ${cell}`);
});

// 4. Book-a-call flow.
await check('flow: book a call (validation, back/next, submit)', async () => {
  await page.goto(`${BASE}/contact/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Next →' }).click();
  assert(await page.getByText('Choose at least one option.').isVisible(), 'step 1 validation missing');
  await page.getByRole('button', { name: 'AI agents and automation' }).click();
  await page.getByRole('button', { name: 'CTO on demand' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  assert(await page.getByText('Choose your company size.').isVisible(), 'step 2 validation missing');
  await page.getByLabel('Company size').selectOption({ index: 2 });
  await page.getByLabel('Industry').selectOption('retail-and-d2c');
  await page.getByLabel('Timeline').selectOption({ index: 1 });
  await page.getByRole('button', { name: '← Back' }).click();
  assert(await page.getByRole('button', { name: 'CTO on demand' }).getAttribute('aria-pressed') === 'true', 'back lost step 1 state');
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Work email').fill('not-an-email');
  await page.locator('#cf-company').fill('Test Co');
  await page.getByLabel('What are you trying to fix?').fill('Slow replies to WhatsApp enquiries.');
  await page.getByRole('button', { name: 'Book my call' }).click();
  assert(await page.getByText('Enter a valid email address.').isVisible(), 'email validation missing');
  await page.getByLabel('Work email').fill('test@example.com');
  await page.getByRole('button', { name: 'Book my call' }).click();
  await page.waitForURL('**/thank-you/call/');
  assert(payloads.some((p) => p.startsWith('[submit:call]')), 'payload not logged');
});

// 5. AI readiness check → result → email → thank-you.
await check('flow: AI readiness check (8 questions → result → email)', async () => {
  await page.goto(`${BASE}/ai-readiness-check/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Next →' }).click();
  assert(await page.getByText('Choose one answer to continue.').isVisible(), 'validation missing');
  for (let i = 0; i < 8; i++) {
    await page.locator('form input[type="radio"]').nth(3).check();
    await page.getByRole('button', { name: i < 7 ? 'Next →' : 'See my result' }).click();
  }
  await page.waitForURL('**/ai-readiness-check/result/?a=33333333');
  assert((await page.getByTestId('result-level').innerText()) === 'Ready to scale', 'wrong level');
  assert(await page.getByTestId('result').getByRole('link', { name: 'Digital-transformation programs' }).isVisible(), 'service link missing');
  await page.getByLabel('Your email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Email me this' }).click();
  await page.waitForURL('**/thank-you/assessment/');
});
await check('flow: readiness levels map correctly', async () => {
  for (const [a, level, href] of [
    ['00000000', 'Exploring', '/services/ai-strategy-and-roadmap/'],
    ['12112121', 'Ready to pilot', '/services/ai-agents-and-automation/'],
  ]) {
    await page.goto(`${BASE}/ai-readiness-check/result/?a=${a}`, { waitUntil: 'networkidle' });
    assert((await page.getByTestId('result-level').innerText()) === level, `${a} → expected ${level}`);
    assert((await page.locator(`[data-testid="result"] a[href="${href}"]`).count()) === 1, `${level}: missing ${href}`);
  }
});

// 6. Work filters with shareable URLs.
await check('flow: work filters update URL and are shareable', async () => {
  await page.goto(`${BASE}/work/`, { waitUntil: 'networkidle' });
  assert((await page.locator('[data-work-item]').count()) === 3, 'expected 3 case studies');
  await page.getByRole('group', { name: 'Filter by service' }).getByRole('button', { name: 'Data foundations' }).click();
  assert(page.url().includes('service=data-foundations'), 'URL not updated');
  const n1 = await page.locator('[data-work-item]').count();
  await page.getByRole('group', { name: 'Filter by industry' }).getByRole('button', { name: 'Retail and D2C' }).click();
  assert(page.url().includes('industry=retail-and-d2c'), 'industry not in URL');
  const shared = page.url();
  await page.goto(shared, { waitUntil: 'networkidle' });
  assert((await page.locator('[data-work-item]').count()) === 1, 'shared URL not filtered');
  assert(n1 === 2, `service filter count ${n1} != 2`);
});

// 7. Newsletter.
await check('flow: footer newsletter → /thank-you/newsletter/', async () => {
  await page.goto(`${BASE}/insights/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Subscribe' }).click();
  assert(await page.getByText('Enter a valid email address.').isVisible(), 'validation missing');
  await page.getByLabel('Get Fiutran insights by email').fill('test@example.com');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await page.waitForURL('**/thank-you/newsletter/');
});

// 8. Blueprint mode.
await check('blueprint: toggle, annotate, persist via URL and navigation', async () => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  assert((await page.locator('.bp-strip').count()) === 0, 'strips visible while OFF');
  await page.getByRole('button', { name: /Blueprint/ }).click();
  await page.waitForSelector('.bp-strip');
  assert(page.url().includes('blueprint=1'), 'URL not updated');
  const strips = await page.locator('.bp-strip').count();
  const sections = await page.locator('[data-bp]').count();
  assert(strips === sections + 1, `strips ${strips} != sections ${sections} + page strip`);
  await page.locator('main a[href="/how-we-work/"]').first().click();
  await page.waitForURL((u) => u.pathname === '/how-we-work/');
  await page.waitForSelector('.bp-strip');
  assert(page.url().includes('blueprint=1'), 'blueprint lost on navigation');
  await page.screenshot({ path: path.join(SHOTS, 'blueprint-how-we-work.png'), fullPage: false });
  const fresh = await browser.newPage();
  watch(fresh);
  await fresh.goto(`${BASE}/services/geo-websites/?blueprint=1`, { waitUntil: 'networkidle' });
  await fresh.waitForSelector('.bp-strip');
  assert((await fresh.getByRole('button', { name: 'Blueprint: ON' }).count()) === 1, 'shared link not in blueprint mode');
  await fresh.getByRole('button', { name: 'Blueprint: ON' }).click();
  assert((await fresh.locator('.bp-strip').count()) === 0, 'strips remain after OFF');
  assert(!fresh.url().includes('blueprint'), 'param not removed');
  await fresh.close();
  await page.getByRole('button', { name: 'Blueprint: ON' }).click();
});

// 9. Header: Services dropdown (desktop) and mobile menu.
await check('header: Services ▾ dropdown', async () => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.locator('nav[aria-label="Main"] summary', { hasText: 'Services' }).click();
  await page.locator('nav[aria-label="Main"] a[href="/services/geo-websites/"]').click();
  await page.waitForURL('**/services/geo-websites/');
  assert(!(await page.locator('nav[aria-label="Main"] details[open]').count()), 'dropdown stayed open after navigation');
});

const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
const m = await mobile.newPage();
watch(m);
await check('header: mobile menu at 375px', async () => {
  await m.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  assert(!(await m.locator('nav[aria-label="Main"]').isVisible()), 'desktop nav visible on mobile');
  await m.getByText('Menu', { exact: true }).click();
  await m.locator('nav[aria-label="Mobile"] a[href="/cto-on-demand/"]').click();
  await m.waitForURL('**/cto-on-demand/');
});

// 10. Responsive: no horizontal overflow at 375 / 768 / 1280; screenshots.
for (const w of [375, 768, 1280]) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 } });
  const pg = await c.newPage();
  watch(pg);
  for (const p of pages) {
    await check(`responsive ${w}px ${p.path}`, async () => {
      await pg.goto(BASE + (p.path === '/404/' ? '/does-not-exist/' : p.path), { waitUntil: 'load' });
      const over = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert(over <= 0, `horizontal overflow ${over}px`);
    });
  }
  for (const p of ['/', '/services/ai-agents-and-automation/', '/compare/ai-partner-vs-ai-consultant/', '/map/']) {
    await pg.goto(BASE + p, { waitUntil: 'networkidle' });
    await pg.screenshot({ path: path.join(SHOTS, `${w}${p.replace(/\//g, '_') || '_home'}.png`), fullPage: true });
  }
  await c.close();
}

// 11. Content renders without JavaScript (what most AI crawlers see).
const nojs = await browser.newContext({ javaScriptEnabled: false });
const nj = await nojs.newPage();
for (const p of pages.filter((p) => !p.noindex)) {
  await check(`no-JS ${p.path}`, async () => {
    await nj.goto(BASE + p.path);
    assert((await nj.locator('h1').innerText()).trim() === p.h1, 'H1 missing without JS');
    assert((await nj.locator('#answer .answer-a').innerText()).length > 100, 'answer block missing without JS');
    assert((await nj.locator('script[type="application/ld+json"]').count()) === 1, 'JSON-LD missing without JS');
  });
}
await check('no-JS: menus work via <details>', async () => {
  await nj.goto(`${BASE}/`);
  await nj.locator('nav[aria-label="Main"] summary', { hasText: 'Services' }).click();
  assert(await nj.locator('nav[aria-label="Main"] a[href="/services/data-foundations/"]').isVisible(), 'dropdown not open without JS');
});

await browser.close();
server.close();

const failed = results.filter((r) => r.startsWith('✗'));
const consoleErrors = errors.filter((e) => /console error|page error/.test(e));
fs.writeFileSync(path.join(ROOT, 'reports/e2e.json'), JSON.stringify({ checks: results.length, failed, consoleErrors, journeySteps: steps.length }, null, 2));
console.log(`\nE2E: ${results.length} checks, ${failed.length} failed, ${consoleErrors.length} console/page errors, ${steps.length} journey steps clicked`);
if (failed.length) console.log(failed.join('\n'));
if (consoleErrors.length) console.log(consoleErrors.join('\n'));
if (failed.length || consoleErrors.length) process.exit(1);
console.log('E2E PASSED');
