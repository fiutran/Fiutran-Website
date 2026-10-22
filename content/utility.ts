import type { PageContent } from './types';

// Contact, thank-you pages, legal pages, 404.

export const contact: PageContent = {
  answer:
    'Start working with Fiutran by booking a call: tell us what you need in three short steps (the help you are after, your company and timeline, and how to reach you). We reply with how we would approach it and the next step. You can also contact the team directly by email or phone.',
  blocks: [
    {
      kind: 'slot',
      name: 'form',
      heading: 'Book a call in three steps',
      bp: { purpose: 'Primary conversion: book a call', intent: 'Contact Fiutran', lenses: ['SEO'], cta: 'Submit → /thank-you/call/' },
    },
    {
      kind: 'facts',
      heading: 'Prefer to contact us directly?',
      rows: [
        ['Email', '{{ph:contact email}}'],
        ['Phone', '{{ph:contact phone}}'],
        ['Response time', '{{ph:response time commitment}}'],
      ],
      bp: { purpose: 'Direct contact facts (entity consistency)', intent: 'Fiutran contact details', lenses: ['GEO'] },
    },
  ],
  faq: [
    { q: 'What happens after I book a call?', a: 'We review what you sent and reply with a time and the questions we would like to cover.' },
    { q: 'Is the first call a sales pitch?', a: 'No. It is about understanding your situation and telling you honestly whether we fit.' },
    { q: 'What should I prepare?', a: 'Nothing formal. A rough idea of the problem and what success would look like is enough.' },
    { q: 'Can I take the readiness check first?', a: 'Yes. The [[/ai-readiness-check/|AI readiness check]] takes about two minutes.' },
  ],
};

const next = (items: string[]) => ({
  kind: 'list' as const,
  heading: 'What happens next?',
  ordered: true,
  items,
  bp: { purpose: 'Set expectations after conversion', intent: 'What next?', lenses: [] },
});

export const thankYou: Record<'call' | 'assessment' | 'newsletter', PageContent> = {
  call: {
    answer:
      'Your call request has reached the Fiutran team. We will review what you shared, reply by email with a proposed time and the questions we would like to cover, and come prepared. Response time: {{ph:response time commitment}}. Meanwhile, you can read how we work or browse our case studies.',
    blocks: [
      next(['We review what you sent', 'We email you to agree a time', 'We meet, listen and propose a first step']),
      {
        kind: 'links',
        heading: 'What can you read while you wait?',
        links: [
          { label: 'How we work: the five-step method', href: '/how-we-work/' },
          { label: 'Case studies', href: '/work/' },
          { label: 'Engagement models and pricing', href: '/engagement-models/' },
        ],
        bp: { purpose: 'Keep the visitor engaged', intent: 'Learn more', lenses: [] },
      },
    ],
    faq: [],
    cta: { heading: 'Want a head start?', text: 'Take the AI readiness check and share the result on the call.', primary: { label: 'Take the AI readiness check', href: '/ai-readiness-check/' } },
  },
  assessment: {
    answer:
      'Your AI readiness result is on its way to your inbox. The email contains your readiness level, your three recommended next steps and the engagement model that fits. If you want to talk it through, book a call and we will go through the result together, question by question, at no obligation.',
    blocks: [
      next(['Check your inbox for your result', 'Share it with your team', 'Book a call if you want to talk it through']),
      {
        kind: 'links',
        heading: 'Where should you go next?',
        links: [
          { label: 'AI strategy and roadmap', href: '/services/ai-strategy-and-roadmap/' },
          { label: 'How much does an AI agent cost?', href: '/insights/how-much-does-an-ai-agent-cost/' },
          { label: 'Book a call to discuss your result', href: '/contact/' },
        ],
        bp: { purpose: 'Route to service or call', intent: 'Next step after assessment', lenses: [] },
      },
    ],
    faq: [],
  },
  newsletter: {
    answer:
      'You are subscribed to Fiutran insights. You will receive practical articles on AI agents, CTO on demand, GEO and digital transformation for growing businesses, plus dates for Learn & Build Tech Frankfurt sessions. Cadence: {{ph:newsletter cadence}}. You can unsubscribe from any email with one click.',
    blocks: [
      {
        kind: 'links',
        heading: 'Where should you start reading?',
        links: [
          { label: 'What is a CTO on demand?', href: '/insights/what-is-a-cto-on-demand/' },
          { label: 'GEO vs SEO', href: '/insights/geo-vs-seo/' },
          { label: 'Learn & Build Tech Frankfurt', href: '/community/' },
        ],
        bp: { purpose: 'First reads for new subscribers', intent: 'Start reading', lenses: [] },
      },
    ],
    faq: [],
  },
};

const legalBlock = (ph: string, note: string) => ({
  kind: 'prose' as const,
  heading: 'Full text',
  paras: [`{{ph:${ph}}}`, note],
  bp: { purpose: 'Legal text (requires legal review)', intent: 'Compliance', lenses: [] },
});

export const legal: Record<'privacy-policy' | 'terms' | 'imprint', PageContent> = {
  'privacy-policy': {
    answer:
      'This privacy policy will explain what personal data Fiutran collects on this website and in client work, why it is collected, the legal basis, how long it is kept, who it is shared with and how to exercise your rights. The final text requires legal review before publication and is a placeholder here.',
    blocks: [legalBlock('privacy policy text (legal review)', 'Prototype note: forms on this prototype send nothing; submissions are logged to the browser console only.')],
    faq: [],
  },
  terms: {
    answer:
      'These terms of use will set out the conditions that apply when you use the Fiutran website, including intellectual property, acceptable use, liability and governing law. Client engagements are covered by separate written agreements. The final text requires legal review before publication and is a placeholder here.',
    blocks: [legalBlock('terms of use text (legal review)', 'Client work is governed by each engagement’s own agreement.')],
    faq: [],
  },
  imprint: {
    answer:
      'This imprint (German Impressum) names the legal provider of the Fiutran website: the company, its registered address, managing directors, register details, VAT ID and contact details. Whether an imprint is required depends on the target-market decision (India, Germany or both), so it is kept here and flagged as open.',
    blocks: [
      {
        kind: 'facts',
        heading: 'Provider information',
        rows: [
          ['Company', '{{ph:legal company name}}'],
          ['Address', '{{ph:registered address}}'],
          ['Managing director(s)', '{{ph:managing director(s)}}'],
          ['Register', '{{ph:commercial register and number}}'],
          ['VAT ID', '{{ph:VAT ID}}'],
          ['Email', '{{ph:contact email}}'],
          ['Phone', '{{ph:contact phone}}'],
        ],
        bp: { purpose: 'Legal provider identification (Impressum)', intent: 'Who runs this site?', lenses: ['GEO'] },
      },
    ],
    faq: [],
  },
};

export const notFound: PageContent = {
  answer:
    'The page you were looking for does not exist or has moved. Most visitors are looking for one of four things: what Fiutran builds, how the CTO on demand works, practical insights on AI for growing businesses, or how to book a call. The links below take you straight to each of them.',
  blocks: [
    {
      kind: 'links',
      heading: 'Where do you want to go?',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Services: what we build', href: '/services/' },
        { label: 'CTO on demand', href: '/cto-on-demand/' },
        { label: 'Insights', href: '/insights/' },
        { label: 'Book a call', href: '/contact/' },
      ],
      bp: { purpose: 'Recover lost visitors', intent: 'Find the right page', lenses: [] },
    },
  ],
  faq: [],
};
