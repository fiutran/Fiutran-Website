import Link from 'next/link';
import { label, related } from '@/lib/registry';
import { Section, type Ctx } from './Section';

export function RelatedLinks({ path, ctx }: { path: string; ctx: Ctx }) {
  const items = related(path);
  return (
    <Section
      id="related"
      ctx={ctx}
      heading="Related"
      bp={{
        purpose: 'Internal links from registry relationships (parent, children, related)',
        intent: 'Next question in the cluster',
        lenses: ['SEO', 'GSEO'],
      }}
    >
      <ul className="related grid gap-3 md:grid-cols-3">
        {items.map((p) => (
          <li key={p.path}>
            <Link href={p.path} className="card-link">
              <span className="font-semibold">{label(p)}</span>
              <span className="block text-sm text-g-600">{p.primaryQuery}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
