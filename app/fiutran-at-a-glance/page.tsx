import Link from 'next/link';
import type { ReactNode } from 'react';
import { ContentPage } from '@/components/ContentPage';
import { Ph } from '@/components/Ph';
import { atAGlance } from '@/content/company';
import { entity, type Fact } from '@/content/entity';
import { children, label } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/fiutran-at-a-glance/';
export const metadata = buildMetadata(PATH);

const fact = (f: Fact) => f.value ?? <Ph label={f.placeholder} />;

// Entity fact sheet for AI engines. Every value comes from content/entity.ts or the registry.
export default function Page() {
  const rows: [string, ReactNode][] = [
    ['Name', entity.name],
    ['Legal name', fact(entity.legalName)],
    ['What it is', entity.description],
    ['What it is not', entity.notA],
    ['Category', entity.category],
    ['Founded', fact(entity.founded)],
    ['Founders', fact(entity.founders)],
    ['Address', fact(entity.address)],
    ['Markets served', fact(entity.areaServed)],
    [
      'Services',
      <ul key="s" className="list-ul">
        {children('/services/').map((s) => (
          <li key={s.path}>
            <Link href={s.path}>{label(s)}</Link>
          </li>
        ))}
        <li>
          <Link href="/cto-on-demand/">CTO on demand</Link>
        </li>
      </ul>,
    ],
    [
      'Industries',
      <ul key="i" className="list-ul">
        {children('/industries/').map((s) => (
          <li key={s.path}>
            <Link href={s.path}>{label(s)}</Link>
          </li>
        ))}
      </ul>,
    ],
    [
      'Products',
      <span key="p">
        <Link href={entity.products[0].path}>{entity.products[0].name}</Link>: {entity.products[0].description}
      </span>,
    ],
    [
      'Community',
      <span key="c">
        <Link href={entity.community.path}>{entity.community.name}</Link>: {entity.community.description}
      </span>,
    ],
    ['Email', fact(entity.email)],
    ['Phone', fact(entity.phone)],
    [
      'Official profiles',
      <ul key="o" className="list-ul">
        {entity.socials.map((s) => (
          <li key={s.network}>
            {s.network}: {s.url ? <a href={s.url}>{s.url}</a> : <Ph label={s.placeholder} />}
          </li>
        ))}
      </ul>,
    ],
  ];
  return (
    <ContentPage
      path={PATH}
      content={atAGlance}
      slots={{
        facts: (
          <dl className="facts">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        ),
      }}
    />
  );
}
