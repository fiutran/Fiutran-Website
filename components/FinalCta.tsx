import Link from 'next/link';
import type { CTA } from '@/content/types';
import { Section, type Ctx } from './Section';

export const defaultCta: CTA = {
  heading: 'Talk to the team that will build it',
  text: 'Tell us what you are trying to fix. We will come back with how we would approach it, not a sales deck.',
  primary: { label: 'Book a call', href: '/contact/' },
  secondary: { label: 'Take the AI readiness check', href: '/ai-readiness-check/' },
};

export function FinalCta({ cta = defaultCta, ctx }: { cta?: CTA; ctx: Ctx }) {
  return (
    <Section
      id="cta"
      ctx={ctx}
      className="cta-band"
      bp={{ purpose: 'Convert: move the reader to the next step', intent: 'Ready to talk', lenses: ['SEO'], cta: cta.primary.label }}
    >
      <h2 className="wf-h2">{cta.heading}</h2>
      <p className="mb-4 max-w-prose">{cta.text}</p>
      <div className="flex flex-wrap gap-3">
        <Link href={cta.primary.href} className="btn btn-primary">
          {cta.primary.label}
        </Link>
        {cta.secondary && (
          <Link href={cta.secondary.href} className="btn">
            {cta.secondary.label}
          </Link>
        )}
      </div>
    </Section>
  );
}
