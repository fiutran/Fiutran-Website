import Link from 'next/link';
import type { PageEntry } from '@/content/types';
import { label, pages } from '@/lib/registry';

// Collapsible sitemap tree from the registry. Uses <details>, so it works without JS.
function Node({ p }: { p: PageEntry }) {
  const kids = pages.filter((c) => c.parent === p.path && c.path !== '/');
  const link = (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Link href={p.path === '/404/' ? '/this-page-does-not-exist/' : p.path}>{label(p)}</Link>
      <code className="text-xs text-g-600">{p.path}</code>
      <span className={`bp-badge bp-status-${p.status} text-[10px]`}>{p.status}</span>
      {p.noindex && <span className="bp-badge text-[10px]">noindex</span>}
    </span>
  );
  if (!kids.length) return <li className="py-0.5">{link}</li>;
  return (
    <li className="py-0.5">
      <details open={p.path === '/' || p.parent === '/'}>
        <summary className="cursor-pointer">{link}</summary>
        <ul className="ml-4 border-l border-g-300 pl-4">
          {kids.map((k) => (
            <Node key={k.path} p={k} />
          ))}
        </ul>
      </details>
    </li>
  );
}

export function SitemapTree() {
  return (
    <>
      <p className="mb-3 flex flex-wrap gap-2 text-sm">
        Status: <span className="bp-badge bp-status-skeleton">skeleton</span>
        <span className="bp-badge bp-status-draft">draft</span>
        <span className="bp-badge bp-status-final">final</span>
      </p>
      <ul data-testid="sitemap-tree">
        <Node p={pages.find((p) => p.path === '/')!} />
      </ul>
    </>
  );
}
