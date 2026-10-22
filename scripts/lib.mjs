// Shared helpers for build-output scripts (link graph, audit, e2e, lighthouse).
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const OUT = path.join(ROOT, 'out');

// The registry is TypeScript; Node 22 runs it directly (type stripping).
export async function loadRegistry() {
  const { pages } = await import(path.join(ROOT, 'content/pages.ts'));
  const { entity, sitewidePlaceholders } = await import(path.join(ROOT, 'content/entity.ts'));
  return { pages, entity, sitewidePlaceholders };
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fiutran.com').replace(/\/$/, '');
}

export function fileFor(p) {
  if (p === '/404/') return path.join(OUT, '404.html');
  return path.join(OUT, p, 'index.html');
}

export function exists(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (/\.[a-z0-9]+$/i.test(clean)) return fs.existsSync(path.join(OUT, clean));
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return fs.existsSync(path.join(OUT, withSlash, 'index.html'));
}

const cache = new Map();
export function load(p) {
  const f = typeof p === 'string' && p.startsWith('/') && !p.endsWith('.html') ? fileFor(p) : p;
  if (!cache.has(f)) cache.set(f, fs.existsSync(f) ? parse(fs.readFileSync(f, 'utf8')) : null);
  return cache.get(f);
}

// Internal hrefs in a DOM subtree, normalised to "/path/" (+ "#frag" kept separately).
export function internalLinks(root) {
  const out = [];
  if (!root) return out;
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith('#')) {
      out.push({ path: null, hash: href.slice(1), href, text: a.text.trim() });
      continue;
    }
    if (!href.startsWith('/')) continue;
    const [pq, hash] = href.split('#');
    const pathOnly = pq.split('?')[0];
    out.push({ path: pathOnly, hash: hash ?? null, href, text: a.text.trim() });
  }
  for (const f of root.querySelectorAll('form[action]')) {
    const href = f.getAttribute('action');
    if (href?.startsWith('/')) out.push({ path: href, hash: null, href, text: '(form)', form: true });
  }
  return out;
}

export function words(s) {
  return s.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}
