import type { PageEntry } from '@/content/types';
import { rich } from './RichText';
import type { Ctx } from './Section';

// The 40–60 word direct answer to the page's primaryQuery. This is what AI Overviews,
// ChatGPT and Perplexity lift; it is also the speakable selector in JSON-LD.
export function AnswerBlock({ page, text, ctx }: { page: PageEntry; text: string; ctx: Ctx }) {
  return (
    <section
      id="answer"
      className="answer-block"
      aria-label="Short answer"
      data-bp={JSON.stringify({
        purpose: 'Direct answer to the page’s primary query, liftable by AI answers and featured snippets',
        intent: page.primaryQuery,
        lenses: ['AEO', 'GEO', 'GSEO'],
        owner: ctx.owner,
        status: ctx.status,
      })}
    >
      <p className="answer-q">{page.primaryQuery}</p>
      <p className="answer-a">{rich(text)}</p>
    </section>
  );
}
