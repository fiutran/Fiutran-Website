import { entity } from './entity';
import type { PageContent } from './types';

// About, team hub, community, careers, at-a-glance, FAQ, insights hub.

export const about: PageContent = {
  answer:
    'Fiutran is an AI and digital-transformation partner for growing businesses. It exists because too many companies paid for AI advice and were left with a deck. Fiutran works the other way round: it goes into the business, learns how it runs, then designs, builds and runs the systems itself.',
  heroImage: 'Photo: founders at work',
  blocks: [
    {
      kind: 'prose',
      heading: 'Why does Fiutran exist?',
      paras: ['{{ph:founding story}}', 'Founded: {{ph:founding year}}.'],
      bp: { purpose: 'Origin story (E-E-A-T, entity)', intent: 'Who is Fiutran?', lenses: ['GEO', 'GSEO'] },
    },
    {
      kind: 'prose',
      heading: 'What is our mission?',
      draft: true,
      paras: ['To give every growing business the technical leadership and the team it needs to put AI and digital systems to work, without having to build a full in-house tech department first.'],
      bp: { purpose: 'Mission statement', intent: 'Fiutran mission', lenses: ['GEO'] },
    },
    {
      kind: 'table',
      heading: 'Why a partner and not a consultant?',
      caption: 'The four shifts Fiutran is built on',
      columns: ['From', 'To'],
      rows: entity.contrast.map(([a, b]) => [a, b]),
      bp: { purpose: 'Core contrast, repeated consistently for entity clarity', intent: 'Partner vs consultant', lenses: ['GEO', 'AEO'] },
    },
    {
      kind: 'cards',
      heading: 'What else does Fiutran do?',
      cols: 3,
      cards: [
        { title: 'Fiunify', text: entity.products[0].description, href: '/products/fiunify/', linkLabel: 'About Fiunify' },
        { title: entity.community.name, text: entity.community.description, href: '/community/', linkLabel: 'About the community sessions' },
        { title: 'Careers', text: 'Build and run real AI systems for growing businesses.', href: '/careers/', linkLabel: 'See careers' },
      ],
      bp: { purpose: 'Proof beyond services: product + community', intent: 'Does Fiutran build products?', lenses: ['GEO'] },
    },
  ],
  faq: [
    { q: 'Is Fiutran a consulting firm?', a: 'No. Fiutran is an AI partner that designs, builds and runs working systems.' },
    { q: 'Who founded Fiutran?', a: 'Founder details are listed on [[/fiutran-at-a-glance/|Fiutran at a glance]] once confirmed.' },
    { q: 'Where is Fiutran based?', a: 'Locations are listed on [[/fiutran-at-a-glance/|Fiutran at a glance]].' },
    { q: 'Does Fiutran have its own products?', a: 'Yes. [[/products/fiunify/|Fiunify]] is Fiutran’s own AI product for social relationships and connection.' },
  ],
};

export const teamHub: PageContent = {
  answer:
    'The Fiutran team is the people who learn how your business runs, lead the technology decisions and ship the systems. The same people stay involved from the first workshop to running the system in production, so you always know who is responsible. Each person has a page with background and writing.',
  blocks: [
    {
      kind: 'slot',
      name: 'people',
      heading: 'Who is on the team?',
      bp: { purpose: 'People index (E-E-A-T)', intent: 'Who works at Fiutran?', lenses: ['GEO', 'GSEO'], schema: 'ItemList' },
    },
  ],
  faq: [
    { q: 'Will I work with the people on this page?', a: 'Yes. The team you meet is the team that builds and runs your system.' },
    { q: 'How big is the team?', a: 'Team size will be stated here once confirmed.' },
    { q: 'Is Fiutran hiring?', a: 'See [[/careers/|careers]] for open roles.' },
    { q: 'Do you work with specialists?', a: 'Where a project needs a specialist skill, we bring them in and stay accountable.' },
  ],
};

export const community: PageContent = {
  answer:
    'Yes. Learn & Build Tech Frankfurt is a hands-on monthly AI session run by Fiutran. Instead of talks, participants bring a real problem, build with AI tools alongside others, and leave with something working. Sessions are open to founders, professionals and teams who want to use AI, not just hear about it.',
  heroImage: 'Photo: community session in progress',
  blocks: [
    {
      kind: 'facts',
      heading: 'When and where is the next session?',
      rows: [
        ['Format', 'Hands-on build session, monthly'],
        ['City', 'Frankfurt'],
        ['Next session', '{{ph:next session date}}'],
        ['Venue', '{{ph:venue name and address}}'],
        ['Sign up', '{{ph:sign-up link}}'],
      ],
      bp: { purpose: 'Event facts for people and AI engines', intent: 'AI meetup Frankfurt', lenses: ['GEO', 'GSEO'], schema: 'Event' },
    },
    {
      kind: 'steps',
      heading: 'What happens in a session?',
      steps: [
        { title: 'Bring a problem', text: 'A task from your work or a project idea.' },
        { title: 'Learn the tool', text: 'A short, practical introduction.' },
        { title: 'Build', text: 'Work on it with help from the Fiutran team.' },
        { title: 'Show', text: 'Share what you built and what you learned.' },
      ],
      bp: { purpose: 'Explain the format', intent: 'Hands-on AI workshop', lenses: ['AEO'] },
    },
  ],
  faq: [
    { q: 'Do I need to be technical?', a: 'No. Sessions are designed for people who want to use AI in their work.' },
    { q: 'Is it free?', a: 'Pricing for sessions will be confirmed on this page.' },
    { q: 'Can my team attend together?', a: 'Yes. For a private session, see [[/services/ai-adoption-and-upskilling/|AI adoption and upskilling]].' },
    { q: 'What should I bring?', a: 'A laptop and a real problem you would like to solve.' },
  ],
};

export const careers: PageContent = {
  answer:
    'Fiutran hires people who want to build and run real AI systems for growing businesses, not write recommendations. Work is hands-on and close to clients: understanding how a business runs, then designing, building and operating what it needs. Open roles, locations and how to apply are listed on this page.',
  blocks: [
    {
      kind: 'list',
      heading: 'What is it like to work at Fiutran?',
      draft: true,
      items: ['You meet the client and the people who do the work', 'You build what you design, and you run it', 'You see the outcome, not just the launch', 'You learn across industries and problems'],
      bp: { purpose: 'Employer value proposition', intent: 'Working at Fiutran', lenses: ['SEO'] },
    },
    {
      kind: 'prose',
      heading: 'Which roles are open?',
      paras: ['{{ph:open roles list}}', 'Where we work: {{ph:work locations / remote policy}}.', 'To apply, email {{ph:careers contact email}}.'],
      bp: { purpose: 'Open roles', intent: 'Fiutran jobs', lenses: ['SEO', 'GSEO'], cta: 'Apply' },
    },
  ],
  faq: [
    { q: 'Do you hire remote?', a: 'Location policy will be listed here once confirmed.' },
    { q: 'Do you offer internships?', a: 'Any internship openings will be listed with the open roles.' },
    { q: 'What skills do you look for?', a: 'People who can understand a business problem and build a working solution for it.' },
    { q: 'Can I apply without an open role?', a: 'Yes. Send a short note about what you would build.' },
  ],
  cta: {
    heading: 'Want to build with us?',
    text: 'Tell us what you would like to build and why.',
    primary: { label: 'Get in touch', href: '/contact/' },
    secondary: { label: 'Meet the team', href: '/team/' },
  },
};

export const atAGlance: PageContent = {
  answer: `${entity.description} It is not an AI consulting firm: it designs, builds and runs working systems, often as a client's CTO on demand, and also builds its own product, Fiunify.`,
  blocks: [
    {
      kind: 'slot',
      name: 'facts',
      heading: 'Key facts',
      bp: { purpose: 'Entity fact sheet: one source of truth for AI engines', intent: 'What is Fiutran?', lenses: ['GEO', 'GSEO'], schema: 'Organization' },
    },
  ],
  faq: [
    { q: 'What is Fiutran?', a: entity.description },
    { q: 'Is Fiutran an AI consultancy?', a: entity.notA },
    { q: 'What is Fiutran’s product?', a: 'Fiunify, an AI product for social relationships and connection.' },
    { q: 'How do I contact Fiutran?', a: 'Through the [[/contact/|contact page]].' },
  ],
};

export const faqPage: PageContent = {
  answer:
    'Before working with Fiutran, know this: Fiutran is a partner, not a consultant, so it builds and runs what it recommends. Engagements start with understanding your business, pricing ranges are published, you own all code, data and accounts, and you can start with a short call or the AI readiness check.',
  blocks: [],
  faq: [
    { q: 'What does Fiutran do?', a: entity.description },
    { q: 'How is Fiutran different from an AI consultant?', a: 'A consultant advises; Fiutran designs, builds and runs the working system. See [[/compare/ai-partner-vs-ai-consultant/|the comparison]].' },
    { q: 'What is a CTO on demand?', a: 'Senior technical leadership for an agreed share of time, plus a team that ships.' },
    { q: 'How does an engagement start?', a: 'With a call, then a short discovery to understand how your business works.' },
    { q: 'How much does it cost?', a: 'Ranges are published on [[/engagement-models/|engagement models and pricing]].' },
    { q: 'Who owns the code and data?', a: 'You do, from day one, in accounts you control.' },
    { q: 'Do you work with small businesses?', a: 'Yes. The model is designed for growing businesses without a large tech team.' },
    { q: 'Which industries do you work in?', a: 'Manufacturing and trading, health and fitness, retail and D2C, and professional services.' },
  ],
};

export const insightsHub: PageContent = {
  answer:
    'Fiutran Insights gives straight, practical answers on AI and digital transformation for growing businesses: what a CTO on demand is, what an AI agent costs, how GEO differs from SEO, when to build or buy AI, and how an SME should start transforming. Each article answers one question first, then explains.',
  blocks: [
    {
      kind: 'slot',
      name: 'articles',
      heading: 'Which question do you have?',
      bp: { purpose: 'Topical cluster index (main GEO/AEO engine)', intent: 'AI questions for SMEs', lenses: ['SEO', 'GEO', 'GSEO'], schema: 'ItemList' },
    },
    {
      kind: 'links',
      heading: 'Where do the topics connect?',
      intro: 'Each article belongs to a cluster with a matching service or comparison.',
      links: [
        { label: 'CTO on demand cluster: offer, comparison and article', href: '/cto-on-demand/' },
        { label: 'GEO cluster: GEO websites service', href: '/services/geo-websites/' },
        { label: 'AI agents cluster: AI agents and automation service', href: '/services/ai-agents-and-automation/' },
        { label: 'Glossary of AI and transformation terms', href: '/insights/glossary/' },
      ],
      bp: { purpose: 'Topical cluster links (GSEO)', intent: 'Related topics', lenses: ['GSEO', 'SEO'] },
    },
  ],
  faq: [
    { q: 'How often are insights published?', a: 'The publishing cadence is an open decision and will be stated here.' },
    { q: 'Who writes Fiutran insights?', a: 'The Fiutran team. Every article shows its author and last-updated date.' },
    { q: 'Can I get new articles by email?', a: 'Yes. Subscribe with the form in the footer.' },
    { q: 'Can I suggest a topic?', a: 'Yes. [[/contact/|Get in touch]] with your question.' },
  ],
};
