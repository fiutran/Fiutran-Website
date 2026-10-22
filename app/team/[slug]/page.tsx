import { ContentPage } from '@/components/ContentPage';
import { getPerson, team } from '@/content/team';
import type { PageContent } from '@/content/types';
import { pages } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return team.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/team/${slug}/`);
}

// Person page (E-E-A-T): role, bio, expertise, writing, official profiles.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/team/${slug}/`;
  const p = getPerson(slug);
  const writing = pages.filter((x) => p.owner && x.contentOwner === p.owner && x.pageType === 'insight');
  const content: PageContent = {
    answer: `${p.name} is part of the Fiutran team, the AI and digital-transformation partner that designs, builds and runs systems for growing businesses. Role: {{ph:${p.rolePlaceholder}}}. This page lists background, areas of expertise, articles written for Fiutran Insights and links to official professional profiles.`,
    heroImage: `Portrait: ${p.name}`,
    blocks: [
      { kind: 'prose', heading: `What is ${p.name}’s background?`, paras: [p.bio], bp: { purpose: 'Experience and expertise (E-E-A-T)', intent: `Who is ${p.name}?`, lenses: ['GEO', 'GSEO'], schema: 'Person' } },
      {
        kind: 'list',
        heading: 'Areas of expertise',
        items: p.expertise.length ? p.expertise : [`{{ph:${p.name} areas of expertise}}`],
        bp: { purpose: 'knowsAbout signals', intent: 'Expertise', lenses: ['GEO'] },
      },
      writing.length
        ? { kind: 'links', heading: `What has ${p.name} written?`, links: writing.map((w) => ({ label: w.h1, href: w.path })), bp: { purpose: 'Author → article links (E-E-A-T)', intent: 'Articles by this author', lenses: ['GSEO'] } }
        : { kind: 'prose', heading: 'Articles', paras: ['No articles yet.'], bp: { purpose: 'Author → article links', intent: 'Articles by this author', lenses: ['GSEO'] } },
      { kind: 'prose', heading: 'Official profiles', paras: [`{{ph:${p.name} LinkedIn / profile URLs}}`], bp: { purpose: 'sameAs links for entity resolution', intent: `${p.name} LinkedIn`, lenses: ['GEO'] } },
    ],
    faq: p.faq,
  };
  return <ContentPage path={path} content={content} schema={{ person: p }} />;
}
