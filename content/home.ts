import { entity } from './entity';
import type { Block, FAQ } from './types';

export const home = {
  positioning: 'We go into your business, learn how it actually runs, then design, build and run the systems that move it forward.',
  heroImage: 'Hero visual: team at client workshop',
  answer:
    'Fiutran designs, builds and runs AI systems and digital-transformation programs for growing businesses. Unlike a consultant that hands over a deck, Fiutran learns how your business works, ships working systems and stays to run them, often acting as your CTO on demand: technical leadership plus a team that ships.',
  ctas: [
    { label: 'Book a call', href: '/contact/' },
    { label: 'Take the AI readiness check', href: '/ai-readiness-check/' },
  ],
  blocks: [
    {
      kind: 'table',
      id: 'consultant-vs-partner',
      heading: 'What is the difference between a consultant and a partner?',
      intro: 'The idea the whole of Fiutran is built on. [[/compare/ai-partner-vs-ai-consultant/|Compare an AI partner and an AI consultant in depth]].',
      caption: 'Consultant vs partner, the core contrast',
      columns: ['Aspect', 'Consultant', 'Partner (Fiutran)'],
      rows: [
        ['Role', entity.contrast[0][0], entity.contrast[0][1]],
        ['What you get', entity.contrast[1][0], entity.contrast[1][1]],
        ['Deliverable', entity.contrast[2][0], entity.contrast[2][1]],
        ['After launch', entity.contrast[3][0], entity.contrast[3][1]],
        ['Understanding', 'Interviews and frameworks', 'We go into the business and learn how it actually runs'],
      ],
      bp: { purpose: 'State the core positioning in a liftable table', intent: 'AI partner vs AI consultant', lenses: ['AEO', 'GEO'], cta: 'Compare in depth' },
    },
    {
      kind: 'steps',
      id: 'how-we-work',
      heading: 'How do we work?',
      intro: 'Five steps, the same team throughout. [[/how-we-work/|See the full method]].',
      steps: [
        { title: 'Understand', text: 'We learn how your business actually runs.', href: '/how-we-work/#understand' },
        { title: 'Design', text: 'We design the solution with your people.', href: '/how-we-work/#design' },
        { title: 'Build', text: 'We build working systems in short cycles.', href: '/how-we-work/#build' },
        { title: 'Run', text: 'We run and improve what we built.', href: '/how-we-work/#run' },
        { title: 'Scale', text: 'We extend what works across the business.', href: '/how-we-work/#scale' },
      ],
      bp: { purpose: 'Explain the method at a glance', intent: 'How does an AI partner work?', lenses: ['AEO', 'GSEO'], cta: 'How we work' },
    },
    {
      kind: 'slot',
      name: 'services',
      id: 'what-we-build',
      heading: 'What do we build?',
      bp: { purpose: 'Route to the 7 service pages', intent: 'AI services for SMEs', lenses: ['SEO', 'GSEO'], cta: 'Open a service' },
    },
    {
      kind: 'cards',
      id: 'cto-on-demand',
      heading: 'Need technical leadership, not another vendor?',
      intro:
        'For many clients Fiutran acts as their **CTO on demand**: technical leadership plus a team that ships, without the cost of a full-time CTO and in-house team.',
      cols: 3,
      cards: [
        { title: 'Who it is for', text: 'Founders and owners making technology decisions without a technical leader.' },
        { title: 'What you get', text: 'Strategy, architecture, vendor decisions and a team that builds and runs it.' },
        { title: 'How it runs', text: 'An agreed share of senior time plus delivery capacity, adjusted monthly.', href: '/cto-on-demand/', linkLabel: 'See CTO on demand' },
      ],
      bp: { purpose: 'Present the flagship offer', intent: 'What is a CTO on demand?', lenses: ['SEO', 'GEO'], cta: 'CTO on demand' },
    },
    {
      kind: 'slot',
      name: 'proof',
      id: 'proof',
      heading: 'What have we built?',
      bp: { purpose: 'Proof: case studies and headline metrics', intent: 'Does Fiutran deliver?', lenses: ['GEO', 'GSEO'], cta: 'See our work' },
    },
    {
      kind: 'slot',
      name: 'industries',
      id: 'industries',
      heading: 'Which industries do we work in?',
      bp: { purpose: 'Industry relevance signal', intent: 'AI for my industry', lenses: ['SEO'], cta: 'Industry page' },
    },
    {
      kind: 'cards',
      id: 'readiness',
      heading: 'Is your business ready for AI?',
      cols: 2,
      cards: [
        {
          title: 'Take the 8-question AI readiness check',
          text: 'Data, processes, team skills, tools, leadership, budget, urgency and tech ownership. Get your readiness level, three next steps and the engagement model that fits.',
          href: '/ai-readiness-check/',
          linkLabel: 'Start the AI readiness check',
        },
        { title: 'Prefer to talk it through?', text: 'Book a call and we will go through the same questions together.', href: '/contact/', linkLabel: 'Book a call' },
      ],
      bp: { purpose: 'Low-commitment conversion for undecided visitors', intent: 'Is my business ready for AI?', lenses: ['SEO'], cta: 'AI readiness check' },
    },
    {
      kind: 'slot',
      name: 'team',
      id: 'team',
      heading: 'Who will you work with?',
      bp: { purpose: 'E-E-A-T: real people behind the work', intent: 'Who is Fiutran?', lenses: ['GEO', 'GSEO'], cta: 'Meet the team' },
    },
    {
      kind: 'slot',
      name: 'insights',
      id: 'latest-insights',
      heading: 'Latest insights',
      bp: { purpose: 'Freshness and topical authority; entry to the insights cluster', intent: 'Learn about AI for SMEs', lenses: ['SEO', 'GEO', 'GSEO'], cta: 'Read an insight' },
    },
  ] as Block[],
  faq: [
    { q: 'What does Fiutran do?', a: 'Fiutran designs, builds and runs AI systems and digital-transformation programs for growing businesses, often as their CTO on demand.' },
    { q: 'Is Fiutran an AI consulting firm?', a: 'No. Consultants advise and hand over a deck; Fiutran builds and runs the working system. See [[/compare/ai-partner-vs-ai-consultant/|AI partner vs AI consultant]].' },
    { q: 'What is a CTO on demand?', a: 'Senior technical leadership for an agreed share of time, plus a team that ships. See [[/cto-on-demand/|CTO on demand]].' },
    { q: 'What kinds of systems does Fiutran build?', a: 'AI agents such as WhatsApp sales agents, internal assistants, custom platforms, data foundations and GEO websites.' },
    { q: 'Which businesses does Fiutran work with?', a: 'Growing businesses in manufacturing and trading, health and fitness, retail and D2C, and professional services.' },
    { q: 'How much does it cost to work with Fiutran?', a: 'It depends on the engagement model. Ranges are published on [[/engagement-models/|engagement models and pricing]].' },
    { q: 'Who owns what Fiutran builds?', a: 'You do: code, data and accounts are yours from day one.' },
    { q: 'How do I start?', a: 'Book a call, or take the [[/ai-readiness-check/|AI readiness check]] first to see where you stand.' },
  ] as FAQ[],
  metrics: [
    { value: '{{ph:projects delivered}}', label: 'Systems designed, built and running' },
    { value: '{{ph:average time to first working system}}', label: 'From first call to first working system' },
    { value: '{{ph:client retention / repeat engagement rate}}', label: 'Clients who stay for the Run phase' },
  ],
};
