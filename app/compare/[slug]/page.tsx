import { ContentPage } from '@/components/ContentPage';
import { getComparison } from '@/content/compare';
import type { PageContent } from '@/content/types';
import { getPage, slugsUnder } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return slugsUnder('/compare/').map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/compare/${slug}/`);
}

// Comparison template: answer → comparison table (the table IS the content) → when to choose each → FAQ.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/compare/${slug}/`;
  const c = getComparison(slug);
  const page = getPage(path);
  const content: PageContent = {
    answer: c.answer,
    blocks: [
      {
        kind: 'table',
        id: 'comparison-table',
        heading: `${page.h1}: how do they compare?`,
        caption: c.caption,
        columns: c.columns,
        rows: c.rows,
        bp: { purpose: 'The comparison table is the content AI engines cite', intent: page.primaryQuery, lenses: ['AEO', 'GEO', 'GSEO'] },
      },
      {
        kind: 'cards',
        heading: 'When should you choose each?',
        cols: c.choose.length === 3 ? 3 : 2,
        cards: c.choose.map((x) => ({ title: x.option, text: x.when.map((w) => `• ${w}`).join(' ') })),
        bp: { purpose: 'Decision guidance, honest about when the alternative wins', intent: 'Which should I choose?', lenses: ['AEO', 'GEO'] },
      },
    ],
    faq: c.faq,
  };
  return <ContentPage path={path} content={content} schema={{ article: { headline: page.h1, description: page.metaDescription, articleSection: 'Comparison' } }} />;
}
