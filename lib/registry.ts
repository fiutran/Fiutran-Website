import { pages } from '@/content/pages';
import type { PageEntry } from '@/content/types';

const byPath = new Map(pages.map((p) => [p.path, p]));

export function getPage(path: string): PageEntry {
  const p = byPath.get(path);
  if (!p) throw new Error(`Page not in registry: ${path}`);
  return p;
}

export function hasPage(path: string): boolean {
  return byPath.has(path.split('#')[0].split('?')[0]);
}

export function label(p: PageEntry): string {
  return p.label ?? p.h1;
}

export function children(path: string): PageEntry[] {
  return pages.filter((p) => p.parent === path && !p.noindex);
}

export function slugsUnder(path: string): string[] {
  return children(path).map((p) => p.path.slice(path.length).replace(/\/$/, ''));
}

export function breadcrumbs(path: string): PageEntry[] {
  const trail: PageEntry[] = [];
  let cur: PageEntry | undefined = byPath.get(path);
  while (cur) {
    trail.unshift(cur);
    cur = cur.parent ? byPath.get(cur.parent) : undefined;
  }
  return trail;
}

// Related links: explicit `related`, then parent, children and siblings from the registry.
export function related(path: string, min = 3, max = 6): PageEntry[] {
  const p = getPage(path);
  const out: PageEntry[] = [];
  const add = (q?: PageEntry) => {
    if (q && q.path !== path && !q.noindex && !out.includes(q)) out.push(q);
  };
  (p.related ?? []).forEach((r) => add(byPath.get(r)));
  if (p.parent && p.parent !== '/') add(byPath.get(p.parent));
  children(path).forEach(add);
  if (p.parent) children(p.parent).forEach(add);
  if (out.length < min) ['/services/', '/how-we-work/', '/insights/', '/contact/'].forEach((r) => add(byPath.get(r)));
  return out.slice(0, Math.max(min, Math.min(max, out.length)));
}

export function navItems(): PageEntry[] {
  return pages.filter((p) => p.navOrder !== undefined).sort((a, b) => a.navOrder! - b.navOrder!);
}

export function indexable(): PageEntry[] {
  return pages.filter((p) => !p.noindex);
}

export { pages };
