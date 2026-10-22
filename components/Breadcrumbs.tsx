import Link from 'next/link';
import { breadcrumbs, label } from '@/lib/registry';
import type { Ctx } from './Section';

export function Breadcrumbs({ path, ctx }: { path: string; ctx: Ctx }) {
  const trail = breadcrumbs(path);
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumbs"
      data-schema="BreadcrumbList"
      data-bp={JSON.stringify({
        purpose: 'Show where this page sits in the site hierarchy',
        intent: 'Orientation; breadcrumb rich result',
        lenses: ['SEO', 'GSEO'],
        schema: 'BreadcrumbList',
        owner: ctx.owner,
        status: ctx.status,
      })}
    >
      <ol>
        {trail.map((p, i) => (
          <li key={p.path}>
            {i < trail.length - 1 ? <Link href={p.path}>{label(p)}</Link> : <span aria-current="page">{label(p)}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
