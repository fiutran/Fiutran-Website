import type { FAQ } from '@/content/types';
import { rich } from './RichText';
import { Section, type Ctx } from './Section';

export function FaqBlock({ faq, ctx, heading = 'Frequently asked questions' }: { faq: FAQ[]; ctx: Ctx; heading?: string }) {
  if (!faq.length) return null;
  return (
    <Section
      id="faq"
      ctx={ctx}
      heading={heading}
      draft
      bp={{
        purpose: 'Answer the follow-up questions people and AI assistants ask next',
        intent: 'Long-tail questions; People Also Ask; FAQ rich result',
        lenses: ['AEO', 'GEO', 'GSEO'],
        schema: 'FAQPage',
      }}
    >
      <div className="faq">
        {faq.map((f) => (
          <div key={f.q} className="faq-item">
            <h3>{f.q}</h3>
            <p>{rich(f.a)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
