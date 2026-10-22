import { ContentPage } from '@/components/ContentPage';
import { ReadinessResult } from '@/components/ReadinessResult';
import type { PageContent } from '@/content/types';
import { buildMetadata } from '@/lib/seo';

const PATH = '/ai-readiness-check/result/';
export const metadata = buildMetadata(PATH);

const content: PageContent = {
  answer:
    'Your next step depends on your readiness level. Exploring means fixing foundations first with a discovery sprint. Ready to pilot means one focused, measurable AI pilot. Ready to scale means a program across processes and teams. Your level, three recommended next steps and the engagement model that fits are shown below.',
  blocks: [{ kind: 'slot', name: 'result', heading: 'Your result', bp: { purpose: 'Personalised result from URL answers', intent: 'What should I do next?', lenses: ['AEO'], cta: 'Email me this / Book a call' } }],
  faq: [],
  cta: {
    heading: 'Talk your result through with us',
    text: 'Bring this result to a call and we will turn it into a concrete first step.',
    primary: { label: 'Book a call', href: '/contact/' },
    secondary: { label: 'Retake the check', href: '/ai-readiness-check/' },
  },
};

export default function Page() {
  return <ContentPage path={PATH} content={content} slots={{ result: <ReadinessResult /> }} />;
}
