import Link from 'next/link';
import { ContentPage } from '@/components/ContentPage';
import { Ph } from '@/components/Ph';
import { getService, servicePlaceholders } from '@/content/services';
import { getCaseStudy } from '@/content/work';
import type { Block, PageContent } from '@/content/types';
import { getPage, slugsUnder } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return slugsUnder('/services/').map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/services/${slug}/`);
}

// Service template: answer → who it's for → problems → deliverables → engagement steps →
// timeline + price → related case study → FAQ → CTA.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/services/${slug}/`;
  const s = getService(slug);
  const page = getPage(path);
  const cs = getCaseStudy(s.caseStudy.split('/')[2]);
  const blocks: Block[] = [
    { kind: 'list', heading: 'Who is it for?', items: s.whoFor, bp: { purpose: 'Qualify the visitor', intent: `Is ${s.name.toLowerCase()} for me?`, lenses: ['AEO', 'SEO'] } },
    { kind: 'list', heading: 'What problems does it solve?', items: s.problems, bp: { purpose: 'Match the visitor’s pain to the service', intent: page.primaryQuery, lenses: ['AEO', 'GSEO'] } },
    { kind: 'list', heading: 'What do we deliver?', items: s.deliverables, bp: { purpose: 'Concrete deliverables (liftable list)', intent: `What does ${s.name.toLowerCase()} include?`, lenses: ['AEO', 'GEO'], schema: 'Service' } },
    { kind: 'steps', heading: 'How does the engagement run?', steps: s.steps, bp: { purpose: 'Show the process to reduce risk', intent: 'How does it work?', lenses: ['AEO'] } },
    {
      kind: 'facts',
      heading: 'How long does it take and what does it cost?',
      rows: [
        ['Typical timeline', servicePlaceholders.timeline],
        ['Price range', servicePlaceholders.price],
        ['Engagement model', '[[/engagement-models/|See engagement models and pricing]]'],
      ],
      bp: { purpose: 'Transparent timeline and price (cited by AI answers)', intent: `How much does ${s.name.toLowerCase()} cost?`, lenses: ['GEO', 'AEO'] },
    },
    { kind: 'slot', name: 'case', heading: 'What does this look like in practice?', bp: { purpose: 'Proof: related case study', intent: 'Examples of this service', lenses: ['GEO', 'GSEO'], cta: 'Read case study' } },
  ];
  const content: PageContent = { answer: s.answer, blocks, faq: s.faq };
  return (
    <ContentPage
      path={path}
      content={content}
      schema={{ service: { name: s.name, description: s.answer, serviceType: s.serviceType } }}
      slots={{
        case: (
          <div className="card max-w-xl">
            <p className="card-meta">Sample case study</p>
            <h3 className="font-semibold">{cs.title}</h3>
            <p className="text-sm">{cs.summary}</p>
            <p className="text-sm">
              Approved case study for this service: <Ph label="related case study" />
            </p>
            <Link href={s.caseStudy} className="card-cta">
              Case study: {cs.title} →
            </Link>
          </div>
        ),
      }}
    />
  );
}
