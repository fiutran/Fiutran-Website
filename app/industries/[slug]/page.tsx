import { ContentPage } from '@/components/ContentPage';
import { getIndustry } from '@/content/industries';
import type { PageContent } from '@/content/types';
import { getPage, label, slugsUnder } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return slugsUnder('/industries/').map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/industries/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/industries/${slug}/`;
  const i = getIndustry(slug);
  const content: PageContent = {
    answer: i.answer,
    blocks: [
      { kind: 'list', heading: `What slows ${i.name.toLowerCase()} businesses down?`, items: i.challenges, bp: { purpose: 'Show we understand the industry', intent: `${i.name} challenges`, lenses: ['AEO', 'GSEO'] } },
      {
        kind: 'cards',
        heading: 'What do we build for this industry?',
        cols: 3,
        cards: i.useCases.map((u) => ({ title: u.title, text: u.text, href: u.service, linkLabel: label(getPage(u.service)) })),
        bp: { purpose: 'Map industry problems to services', intent: `AI use cases in ${i.name.toLowerCase()}`, lenses: ['AEO', 'SEO'], cta: 'Service page' },
      },
      { kind: 'prose', heading: 'What results have we seen?', paras: ['{{ph:industry-specific proof point}}'], bp: { purpose: 'Industry proof', intent: 'Does it work in my industry?', lenses: ['GEO'] } },
    ],
    faq: i.faq,
  };
  return <ContentPage path={path} content={content} />;
}
