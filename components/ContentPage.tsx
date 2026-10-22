import type { ReactNode } from 'react';
import type { PageContent } from '@/content/types';
import { getPage } from '@/lib/registry';
import { pageGraph, type SchemaExtras } from '@/lib/schema';
import { AnswerBlock } from './AnswerBlock';
import { Blocks } from './Blocks';
import { Breadcrumbs } from './Breadcrumbs';
import { Byline } from './Byline';
import { FaqBlock } from './FaqBlock';
import { FinalCta } from './FinalCta';
import { ImageSlot } from './ImageSlot';
import { JsonLd } from './JsonLd';
import { RelatedLinks } from './RelatedLinks';

// The one page template. Every content page renders in this order:
// breadcrumb → H1 → answer block → body blocks → FAQ → related → byline → final CTA.
export function ContentPage({
  path,
  content,
  slots,
  schema,
  before,
  after,
  afterFaq,
  wrap = 'article',
  hideByline,
}: {
  path: string;
  content: PageContent;
  slots?: Record<string, ReactNode>;
  schema?: SchemaExtras;
  before?: ReactNode; // rendered between the answer block and body blocks
  after?: ReactNode; // rendered after body blocks, before FAQ
  afterFaq?: ReactNode; // rendered right after the FAQ (e.g. author box)
  wrap?: 'article' | 'div';
  hideByline?: boolean;
}) {
  const page = getPage(path);
  const ctx = { owner: page.contentOwner, status: page.status };
  const Wrap = wrap;
  return (
    <>
      <JsonLd data={pageGraph(path, { faq: content.faq, ...schema })} />
      <Wrap
        className="page"
        data-page={JSON.stringify({
          path: page.path,
          pageType: page.pageType,
          primaryQuery: page.primaryQuery,
          lenses: page.lenses,
          schemaTypes: page.schemaTypes,
          owner: page.contentOwner,
          status: page.status,
        })}
      >
        <Breadcrumbs path={path} ctx={ctx} />
        <header className="page-head">
          <h1>{page.h1}</h1>
        </header>
        <AnswerBlock page={page} text={content.answer} ctx={ctx} />
        {content.heroImage && (
          <div className="my-6">
            <ImageSlot label={content.heroImage} />
          </div>
        )}
        {before}
        <Blocks blocks={content.blocks} ctx={ctx} slots={slots} />
        {after}
        <FaqBlock faq={content.faq} ctx={ctx} />
        {afterFaq}
        <RelatedLinks path={path} ctx={ctx} />
        {!hideByline && <Byline page={page} ctx={ctx} />}
        <FinalCta cta={content.cta} ctx={ctx} />
      </Wrap>
    </>
  );
}
