import { ContentPage } from '@/components/ContentPage';
import { WorkFilters } from '@/components/WorkFilters';
import { caseStudies } from '@/content/work';
import { industries } from '@/content/industries';
import { services } from '@/content/services';
import type { PageContent } from '@/content/types';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/work/';
export const metadata = buildMetadata(PATH);

const content: PageContent = {
  answer:
    'Fiutran’s work is systems it designed, built and still runs: AI agents, custom platforms, data foundations and CTO-on-demand engagements for growing businesses. Each case study shows the challenge, what we did, what we built and the measured results. The entries below are sample templates until real case studies are approved.',
  blocks: [
    {
      kind: 'slot',
      name: 'filters',
      heading: 'Browse case studies',
      bp: { purpose: 'Filterable proof library (shareable filtered URLs)', intent: 'Fiutran case studies by service / industry', lenses: ['SEO', 'GEO'], cta: 'Read case study', schema: 'ItemList' },
    },
  ],
  faq: [
    { q: 'Are these real clients?', a: 'Not yet. These are sample templates; approved case studies will replace them.' },
    { q: 'Can I filter by my industry?', a: 'Yes. Use the industry filter; the URL updates so you can share the filtered view.' },
    { q: 'Can I speak to a past client?', a: 'Reference calls can be arranged once case studies are approved.' },
    { q: 'Do you publish client names?', a: 'Only with written approval. Otherwise case studies are anonymised.' },
  ],
};

export default function Page() {
  return (
    <ContentPage
      path={PATH}
      content={content}
      schema={{ itemList: children(PATH) }}
      slots={{
        filters: (
          <WorkFilters
            items={caseStudies.map(({ slug, title, summary, industry, services }) => ({ slug, title, summary, industry, services }))}
            services={services.map((s) => ({ value: s.slug, label: s.name }))}
            industries={industries.map((i) => ({ value: i.slug, label: i.name }))}
          />
        ),
      }}
    />
  );
}
