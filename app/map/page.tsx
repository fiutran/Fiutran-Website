import Link from 'next/link';
import { ContentPage } from '@/components/ContentPage';
import { Inventory } from '@/components/map/Inventory';
import { SitemapTree } from '@/components/map/SitemapTree';
import { sitewidePlaceholders } from '@/content/entity';
import { journeys, openDecisions } from '@/content/map';
import type { Owner, PageContent } from '@/content/types';
import { label, pages } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/map/';
export const metadata = buildMetadata(PATH);

const content: PageContent = {
  answer:
    'This internal page explains the whole Fiutran site in one place: a sitemap tree coloured by status, the four user journeys as clickable step flows, a sortable inventory of every page with its query, lenses and schema, all content still needed grouped by page and owner, and the open decisions blocking final copy.',
  blocks: [
    { kind: 'slot', name: 'tree', heading: 'Sitemap tree', bp: { purpose: 'Every page, generated from content/pages.ts', intent: 'Site structure', lenses: [] } },
    { kind: 'slot', name: 'journeys', heading: 'User journeys', bp: { purpose: 'The four journeys the site is built around; every step is clickable', intent: 'How visitors flow', lenses: [] } },
    { kind: 'slot', name: 'inventory', heading: 'Page inventory', bp: { purpose: 'Sortable registry view with live link counts', intent: 'Page-level detail', lenses: [] } },
    { kind: 'slot', name: 'needed', heading: 'Content needed', bp: { purpose: 'Checklist of every placeholder, by owner and page', intent: 'What content is missing?', lenses: [] } },
    { kind: 'slot', name: 'decisions', heading: 'Open decisions', bp: { purpose: 'Decisions that block final copy or config', intent: 'What needs deciding?', lenses: [] } },
  ],
  faq: [],
};

export default function Page() {
  const owners: Owner[] = ['Aarti', 'Diksha'];
  const total = pages.reduce((n, p) => n + p.placeholdersNeeded.length, 0) + sitewidePlaceholders.length;
  return (
    <ContentPage
      path={PATH}
      content={content}
      hideByline
      wrap="div"
      slots={{
        tree: <SitemapTree />,
        journeys: (
          <ol className="grid gap-6">
            {journeys.map((j) => (
              <li key={j.tag} className="border border-g-300 p-4" data-journey={j.tag}>
                <h3 className="font-bold">{j.persona}</h3>
                <p className="mb-3 text-sm text-g-600">Goal: {j.goal}</p>
                <ol className="flex flex-wrap items-stretch gap-2">
                  {j.steps.map((s, i) => (
                    <li key={s.href + i} className="flex items-center gap-2">
                      <Link href={s.href} className="card-link !p-3 text-sm" data-journey-step>
                        <span className="block text-xs text-g-600">Step {i + 1}</span>
                        <span className="font-semibold">{s.label}</span>
                        {s.note && <span className="block text-xs text-g-600">{s.note}</span>}
                      </Link>
                      {i < j.steps.length - 1 && <span aria-hidden="true">→</span>}
                    </li>
                  ))}
                </ol>
                <p className="mt-2 text-xs text-g-600">Pages tagged in the registry: {pages.filter((p) => p.journeyTags.includes(j.tag as never)).map(label).join(', ')}</p>
              </li>
            ))}
          </ol>
        ),
        inventory: (
          <Inventory
            rows={pages.map((p) => ({
              path: p.path,
              primaryQuery: p.primaryQuery,
              lenses: p.lenses.join(' '),
              schemaTypes: p.schemaTypes.join(', '),
              owner: p.contentOwner,
              status: p.status,
              pageType: p.pageType,
            }))}
          />
        ),
        needed: (
          <div data-scope="global">
            <p className="mb-4">{total} placeholders in total. Replace each with the real fact, then remove it from the page’s `placeholdersNeeded` in content/pages.ts.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {owners.map((o) => (
                <div key={o}>
                  <h3 className="mb-2 font-bold">Owner: {o}</h3>
                  <ul className="grid gap-3">
                    {pages
                      .filter((p) => p.contentOwner === o && p.placeholdersNeeded.length)
                      .map((p) => (
                        <li key={p.path} className="border border-g-300 p-3">
                          <Link href={p.path} className="font-semibold">
                            {label(p)}
                          </Link>{' '}
                          <code className="text-xs text-g-600">{p.path}</code>
                          <ul className="mt-2 list-ul text-sm">
                            {p.placeholdersNeeded.map((x) => (
                              <li key={x}>
                                <label className="inline-flex gap-2">
                                  <input type="checkbox" /> {x}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="mb-2 mt-6 font-bold">Sitewide (header / footer), owner: Diksha</h3>
            <ul className="list-ul text-sm">
              {sitewidePlaceholders.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ),
        decisions: (
          <ul className="grid gap-3">
            {openDecisions.map((d) => (
              <li key={d.topic} className="border border-g-300 p-3">
                <h3 className="font-bold">{d.topic}</h3>
                <p className="text-sm">{d.question}</p>
                <p className="mt-1 text-xs text-g-600">
                  Affects:{' '}
                  {d.affects.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ', '}
                      <Link href={a}>{a}</Link>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        ),
      }}
    />
  );
}
