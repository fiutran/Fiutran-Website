import Link from 'next/link';
import { ContentPage } from '@/components/ContentPage';
import { Section } from '@/components/Section';
import { getInsight, insights } from '@/content/insights';
import { ownerPerson } from '@/content/team';
import type { PageContent } from '@/content/types';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import { toc } from '@/lib/toc';

export const dynamicParams = false;
export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(`/insights/${slug}/`);
}

// Insight template: answer → table of contents → body (MDX, H2 questions) → key takeaways →
// FAQ → author box.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = `/insights/${slug}/`;
  const page = getPage(path);
  const a = getInsight(slug);
  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);
  const ctx = { owner: page.contentOwner, status: page.status };
  const author = ownerPerson(page.contentOwner);
  const content: PageContent = {
    answer: a.answer,
    blocks: [
      {
        kind: 'list',
        id: 'key-takeaways',
        heading: 'Key takeaways',
        items: a.takeaways,
        bp: { purpose: 'Summary list AI engines and skimmers lift', intent: page.primaryQuery, lenses: ['AEO', 'GEO'] },
      },
    ],
    faq: a.faq,
  };
  const items = toc(slug);
  return (
    <ContentPage
      path={path}
      content={content}
      schema={{ article: { headline: page.h1, description: page.metaDescription, articleSection: a.section } }}
      before={
        <>
          <Section as="nav" ctx={ctx} id="toc" heading="In this article" bp={{ purpose: 'Table of contents (jump links, sitelinks)', intent: 'Navigate the article', lenses: ['SEO', 'AEO'] }}>
            <ol className="list-ol">
              {items.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.text}</a>
                </li>
              ))}
              <li>
                <a href="#key-takeaways">Key takeaways</a>
              </li>
              <li>
                <a href="#faq">Frequently asked questions</a>
              </li>
            </ol>
          </Section>
          <Section ctx={ctx} id="body" bp={{ purpose: 'Article body: question-style H2s with direct answers', intent: page.primaryQuery, lenses: ['AEO', 'GEO', 'GSEO'] }}>
            <div className="prose-wf">
              <Body />
            </div>
          </Section>
        </>
      }
      afterFaq={
        <Section as="aside" ctx={ctx} id="author" heading="About the author" bp={{ purpose: 'Author box (E-E-A-T)', intent: 'Who wrote this?', lenses: ['GEO', 'GSEO'], schema: 'Person' }}>
          <div className="card max-w-xl">
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-sm">{author.role ?? 'Role to be confirmed'} at Fiutran.</p>
            <Link href={`/team/${author.slug}/`} className="card-cta">
              More about {author.name} →
            </Link>
          </div>
        </Section>
      }
    />
  );
}
