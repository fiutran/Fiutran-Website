import Link from 'next/link';
import type { PageEntry } from '@/content/types';
import { label } from '@/lib/registry';
import { rich } from './RichText';

// Cards for a set of registry pages (hub grids). Text defaults to the page's primary query.
export function PageCards({ pages, text, cols = 3, cta }: { pages: PageEntry[]; text?: (p: PageEntry) => string; cols?: 2 | 3 | 4; cta?: (p: PageEntry) => string }) {
  const c = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <ul className={`grid gap-4 ${c}`}>
      {pages.map((p) => (
        <li key={p.path} className="card">
          <h3 className="font-semibold">{label(p)}</h3>
          <p className="text-sm">{rich(text ? text(p) : p.primaryQuery)}</p>
          <Link href={p.path} className="card-cta">
            {cta ? cta(p) : label(p)} →
          </Link>
        </li>
      ))}
    </ul>
  );
}
