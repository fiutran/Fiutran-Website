// npm run audit: the quality gate. Reads the registry (content/pages.ts) and the built
// output (out/) and FAILS (exit 1) if any page breaks a rule. Run `npm run build` first.
import fs from 'node:fs';
import path from 'node:path';
import { OUT, ROOT, exists, fileFor, internalLinks, load, loadRegistry, siteUrl, words } from './lib.mjs';
import { linkGraph } from './link-graph.mjs';

if (!fs.existsSync(path.join(OUT, 'index.html'))) {
  console.error('out/ not found. Run `npm run build` first.');
  process.exit(1);
}

const { pages, entity, sitewidePlaceholders } = await loadRegistry();
const SITE = siteUrl();
const graph = await linkGraph();
const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const llms = fs.readFileSync(path.join(OUT, 'llms.txt'), 'utf8');
const robots = fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const SITEWIDE_TYPES = new Set(['Organization', 'ProfessionalService', 'WebSite']);
const FAQ_EXEMPT = new Set(['thank-you', 'legal', 'error', 'internal']);

const failures = [];
const warnings = [];
const fail = (p, msg) => failures.push(`${p}  ✗ ${msg}`);
const warn = (p, msg) => warnings.push(`${p}  ! ${msg}`);
let jsonLdBlocks = 0;
let linksChecked = 0;

const htmlFiles = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.html')) htmlFiles.push(full);
  }
})(OUT);

// Every exported HTML page must be in the registry (no unregistered pages).
const registered = new Set(pages.map((p) => fileFor(p.path)));
for (const f of htmlFiles) {
  if (f.includes(`${path.sep}_next${path.sep}`)) continue;
  if (f.endsWith(`${path.sep}404${path.sep}index.html`) || f.endsWith('_not-found.html') || f.endsWith(`_not-found${path.sep}index.html`)) continue;
  if (!registered.has(f)) fail(path.relative(OUT, f), 'exported page is not in the registry');
}

for (const p of pages) {
  const doc = load(p.path);
  if (!doc) {
    fail(p.path, `no built HTML at ${path.relative(ROOT, fileFor(p.path))}`);
    continue;
  }
  const head = doc.querySelector('head');
  const main = doc.querySelector('main');

  // ── Title / meta / canonical / robots
  const title = head.querySelector('title')?.text.trim();
  if (!title) fail(p.path, 'missing <title>');
  else if (title !== p.title) fail(p.path, `title differs from registry: "${title}"`);
  if (p.title.length > 60) fail(p.path, `title is ${p.title.length} chars (max 60)`);
  const meta = head.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!meta) fail(p.path, 'missing meta description');
  else if (meta !== p.metaDescription) fail(p.path, 'meta description differs from registry');
  if (p.metaDescription.length > 155) fail(p.path, `meta description is ${p.metaDescription.length} chars (max 155)`);
  const canonical = head.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const expectedCanonical = `${SITE}${p.path}`;
  if (!canonical) fail(p.path, 'missing canonical');
  else if (canonical !== expectedCanonical) fail(p.path, `canonical is ${canonical}, expected ${expectedCanonical}`);
  const robotsMeta = head.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (p.noindex && !robotsMeta.includes('noindex')) fail(p.path, 'registry says noindex but page is indexable');
  if (!p.noindex && robotsMeta.includes('noindex')) fail(p.path, 'page is noindex but registry says indexable');
  for (const og of ['og:title', 'og:description', 'og:url', 'og:type']) if (!head.querySelector(`meta[property="${og}"]`)) fail(p.path, `missing ${og}`);
  if (!head.querySelector('meta[name="twitter:card"]')) fail(p.path, 'missing twitter:card');
  if (head.querySelectorAll('link[hreflang]').length) warn(p.path, 'hreflang tags present (flag should be off by default)');

  // ── Semantic structure
  for (const tag of ['header', 'nav', 'main', 'footer']) if (!doc.querySelector(tag)) fail(p.path, `missing <${tag}>`);
  if (doc.querySelectorAll('main').length !== 1) fail(p.path, 'must have exactly one <main>');
  const h1s = doc.querySelectorAll('h1');
  if (h1s.length !== 1) fail(p.path, `has ${h1s.length} H1s (exactly 1 required)`);
  else if (h1s[0].text.trim() !== p.h1) fail(p.path, `H1 "${h1s[0].text.trim()}" differs from registry "${p.h1}"`);
  for (const img of doc.querySelectorAll('img')) if (!img.hasAttribute('alt')) fail(p.path, 'img without alt');

  // ── Answer block (40–60 words)
  const answer = main?.querySelector('#answer .answer-a');
  if (!answer) fail(p.path, 'missing answer block');
  else {
    const n = words(answer.text);
    if (n < 40 || n > 60) fail(p.path, `answer block is ${n} words (40–60)`);
  }

  // ── FAQ (4–8) for indexable content pages; related links; byline
  const faqItems = main?.querySelectorAll('#faq .faq-item').length ?? 0;
  if (!FAQ_EXEMPT.has(p.pageType) && !p.noindex && (faqItems < 4 || faqItems > 8)) fail(p.path, `FAQ has ${faqItems} questions (4–8)`);
  const related = main?.querySelectorAll('#related a').length ?? 0;
  if (p.pageType !== 'home' && related < 3) fail(p.path, `related links: ${related} (min 3)`);
  if (!p.noindex && !FAQ_EXEMPT.has(p.pageType) && p.pageType !== 'home') {
    const byline = main?.querySelector('.byline');
    if (!byline) fail(p.path, 'missing byline');
    else if (!byline.querySelector('a[href^="/team/"]')) fail(p.path, 'byline does not link to a /team/ page');
    else if (!byline.querySelector('time[datetime]')) fail(p.path, 'byline missing Last updated <time>');
  }

  // ── Link graph
  const g = graph[p.path];
  if (g.out < 3) fail(p.path, `only ${g.out} internal outbound links in <main> (min 3)`);
  if (p.path !== '/404/' && g.inAll === 0) fail(p.path, 'orphan: zero inbound links');
  else if (p.path !== '/404/' && g.in === 0) warn(p.path, 'only reachable via header/footer (no contextual inbound link)');

  // ── Broken internal links (whole page, including header/footer) and anchors
  for (const l of internalLinks(doc)) {
    linksChecked++;
    if (l.path && !exists(l.path)) fail(p.path, `broken link → ${l.href}`);
    else if (l.hash) {
      const target = l.path ? load(l.path) : doc;
      if (target && !target.querySelector(`[id="${l.hash}"]`)) fail(p.path, `broken anchor → ${l.href}`);
    }
    if (!l.form && !l.text && !doc.querySelector(`a[href="${l.href}"][aria-label]`)) fail(p.path, `link without text → ${l.href}`);
  }

  // ── JSON-LD: valid JSON; declared schemaTypes emitted and vice versa
  const emitted = new Set();
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    jsonLdBlocks++;
    try {
      const data = JSON.parse(s.textContent);
      if (data['@context'] !== 'https://schema.org') fail(p.path, 'JSON-LD missing @context https://schema.org');
      for (const n of data['@graph'] ?? [data]) {
        const t = n['@type'];
        (Array.isArray(t) ? t : [t]).forEach((x) => emitted.add(x));
        if (!n['@id']) fail(p.path, `JSON-LD node ${t} has no @id`);
        if (JSON.stringify(n).includes('PLACEHOLDER')) fail(p.path, `JSON-LD node ${t} contains a placeholder string`);
      }
      const org = (data['@graph'] ?? []).find((n) => Array.isArray(n['@type']) && n['@type'].includes('Organization'));
      if (!org) fail(p.path, 'sitewide Organization node missing');
      else if (org.description !== entity.description) fail(p.path, 'Organization description differs from content/entity.ts');
    } catch (e) {
      fail(p.path, `invalid JSON-LD: ${e.message}`);
    }
  }
  if (!emitted.size) fail(p.path, 'no JSON-LD');
  for (const t of p.schemaTypes) if (!emitted.has(t)) fail(p.path, `declares ${t} but does not emit it`);
  for (const t of emitted) if (!SITEWIDE_TYPES.has(t) && !p.schemaTypes.includes(t)) fail(p.path, `emits ${t} but registry does not declare it`);

  // ── Sitemap + llms.txt
  const abs = `${SITE}${p.path}`;
  if (!p.noindex) {
    if (!sitemapUrls.has(abs)) fail(p.path, 'missing from sitemap.xml');
    if (!llms.includes(`(${abs})`)) fail(p.path, 'missing from llms.txt');
  } else {
    if (sitemapUrls.has(abs)) fail(p.path, 'noindex page is listed in sitemap.xml');
    if (llms.includes(`(${abs})`)) fail(p.path, 'noindex page is listed in llms.txt');
  }

  // ── Placeholders: chips on the page (outside sitewide chrome) must match the registry
  const chips = new Set(
    (main?.querySelectorAll('.ph') ?? []).filter((c) => !c.closest('[data-scope="global"]')).map((c) => c.getAttribute('data-ph')),
  );
  const declared = new Set(p.placeholdersNeeded);
  for (const c of chips) if (!declared.has(c)) fail(p.path, `placeholder not registered in placeholdersNeeded: "${c}"`);
  for (const c of declared) if (!chips.has(c) && p.path !== '/ai-readiness-check/result/') fail(p.path, `registered placeholder not on page: "${c}"`);
}

// ── Sitewide checks
for (const s of sitewidePlaceholders) {
  const footer = load('/')?.querySelector('footer');
  if (!footer?.querySelector(`.ph[data-ph="${s}"]`)) warn('sitewide', `sitewide placeholder not rendered in footer: "${s}"`);
}
if (!llms.includes(entity.description)) fail('/llms.txt', 'entity description missing');
if (!load('/').querySelector('main').text.includes(entity.description)) fail('/', 'entity sentence missing from Home');
if (!load('/fiutran-at-a-glance/').querySelector('main').text.includes(entity.description)) fail('/fiutran-at-a-glance/', 'entity sentence missing');
for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'])
  if (!new RegExp(`User-agent: ${bot}\\nAllow: /`).test(robots)) fail('/robots.txt', `${bot} not explicitly allowed`);
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('/robots.txt', 'Sitemap line missing');
if (!/<lastmod>/.test(sitemap)) fail('/sitemap.xml', 'no lastmod');
const paths = pages.map((p) => p.path);
if (new Set(paths).size !== paths.length) fail('registry', 'duplicate paths');
for (const p of pages) if (p.parent && !paths.includes(p.parent)) fail(p.path, `parent ${p.parent} not in registry`);
for (const p of pages) for (const r of p.related ?? []) if (!paths.includes(r)) fail(p.path, `related ${r} not in registry`);

// ── Report
const report = { pages: pages.length, htmlFiles: htmlFiles.length, jsonLdBlocks, linksChecked, failures, warnings };
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'reports/audit.json'), JSON.stringify(report, null, 2));
console.log(`\nAudit: ${pages.length} registry pages · ${jsonLdBlocks} JSON-LD blocks parsed · ${linksChecked} internal links checked`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n  ${warnings.join('\n  ')}`);
if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):\n  ${failures.join('\n  ')}\n\nAUDIT FAILED`);
  process.exit(1);
}
console.log('\nAUDIT PASSED');
