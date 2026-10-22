import { ContentPage } from '@/components/ContentPage';
import { caseStudies, getCaseStudy } from '@/content/work';
import { getIndustry } from '@/content/industries';
import { getService } from '@/content/services';
import type { PageContent } from '@/content/types';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/work/${slug}/`);
}

// Case-study template: at-a-glance → challenge → what we did → what we built → results →
// client quote → related services.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/work/${slug}/`;
  const c = getCaseStudy(slug);
  const page = getPage(path);
  const industry = getIndustry(c.industry);
  const content: PageContent = {
    answer: c.answer,
    blocks: [
      {
        kind: 'facts',
        heading: 'At a glance',
        rows: [
          ['Client type', c.glance.clientType],
          ['Industry', `[[/industries/${industry.slug}/|${industry.name}]]`],
          ['Services', c.services.map((s) => `[[/services/${s}/|${getService(s).name}]]`).join(', ')],
          ['Timeline', c.glance.timeline],
          ['Stack', c.glance.stack],
        ],
        bp: { purpose: 'Structured summary AI engines can lift', intent: page.primaryQuery, lenses: ['GEO', 'AEO'] },
      },
      { kind: 'prose', heading: 'What was the challenge?', paras: c.challenge, draft: true, bp: { purpose: 'Problem framing', intent: 'Similar problem to mine?', lenses: ['GEO'] } },
      { kind: 'steps', heading: 'What did we do?', steps: c.whatWeDid, bp: { purpose: 'Show the method applied', intent: 'How was it done?', lenses: ['AEO'] } },
      { kind: 'list', heading: 'What did we build?', items: c.whatWeBuilt, bp: { purpose: 'Concrete outputs', intent: 'What was delivered?', lenses: ['GEO'] } },
      { kind: 'metrics', heading: 'What were the results?', tiles: c.results, bp: { purpose: 'Quotable, sourced results', intent: 'Results', lenses: ['GEO', 'GSEO'] } },
      { kind: 'quote', heading: 'What did the client say?', quote: c.quote.text, cite: c.quote.cite, bp: { purpose: 'Social proof', intent: 'Client view', lenses: ['GSEO'] } },
      {
        kind: 'links',
        heading: 'Which services were involved?',
        links: c.services.map((s) => ({ label: getService(s).name, href: `/services/${s}/` })),
        bp: { purpose: 'Related services (internal links)', intent: 'Get this for my business', lenses: ['SEO'], cta: 'Service page' },
      },
    ],
    faq: c.faq,
  };
  return <ContentPage path={path} content={content} schema={{ article: { headline: page.h1, description: page.metaDescription, articleSection: 'Case study' } }} />;
}
