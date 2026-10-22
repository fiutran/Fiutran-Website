import type { FAQ } from '../types';

// Structured parts of each insight article. The body lives in <slug>.mdx next to this file.
// Template: answer block → table of contents → body (H2 questions) → key takeaways → FAQ → author box.
export type Insight = { slug: string; answer: string; takeaways: string[]; faq: FAQ[]; section: string };

export const insights: Insight[] = [
  {
    slug: 'what-is-a-cto-on-demand',
    section: 'CTO on demand',
    answer:
      'A CTO on demand is a senior technology leader who works with your business for an agreed share of time instead of as a full-time hire. With Fiutran, that leadership comes with a team that designs, builds and runs systems, so growing businesses get strategy and delivery without the cost of a full-time CTO.',
    takeaways: [
      'A CTO on demand provides senior technical leadership part-time',
      'Fiutran’s model adds a delivery team, so decisions get built',
      'It suits growing businesses without in-house tech leadership',
      'Cost scales with time share and team size, not a fixed salary',
    ],
    faq: [
      { q: 'Is a CTO on demand the same as a fractional CTO?', a: 'Close. A fractional CTO is usually one person; a CTO on demand from Fiutran includes a team that ships.' },
      { q: 'How long do CTO-on-demand engagements last?', a: 'Typically months to years, adjusted as the business grows.' },
      { q: 'Can a CTO on demand help hire a full-time CTO?', a: 'Yes. Helping you hire and hand over when the time is right is part of the role.' },
      { q: 'Does a CTO on demand handle security?', a: 'It should. Security, confidentiality and data protection are part of any CTO’s responsibility.' },
    ],
  },
  {
    slug: 'how-to-start-digital-transformation-in-an-sme',
    section: 'Digital transformation',
    answer:
      'Start digital transformation in an SME by mapping how the business really runs, picking one process where the pain is visible and success is measurable within a quarter, building the smallest working solution, and then repeating the method. Start with the business, not the tools, and prove value before scaling.',
    takeaways: [
      'Start from how work happens today, not from a tool',
      'Pick one winnable, measurable first process',
      'Ship a working version within weeks, then improve',
      'Scale the method, and invest in data foundations',
    ],
    faq: [
      { q: 'How long does digital transformation take for an SME?', a: 'The first measurable win should land within about a quarter; full transformation is ongoing.' },
      { q: 'Do we need an IT department?', a: 'No. A partner or CTO on demand can provide the leadership and team.' },
      { q: 'What is the biggest mistake?', a: 'Buying software before understanding the process it should improve.' },
      { q: 'Should AI be part of it from the start?', a: 'Only where it solves a real problem in the first process; otherwise add it once data is ready.' },
    ],
  },
  {
    slug: 'how-much-does-an-ai-agent-cost',
    section: 'AI agents',
    answer:
      'An AI agent’s cost has two parts: a one-off build cost driven by scope, integrations, guardrails and channels, and a monthly running cost driven by usage, messaging fees, hosting and improvement work. A narrow pilot on one channel costs far less than a multi-system agent; Fiutran publishes current ranges on this page.',
    takeaways: [
      'Cost = build + monthly running',
      'Scope and integrations drive build cost',
      'Usage and channels drive running cost',
      'Start with a narrow pilot that has measurable value',
    ],
    faq: [
      { q: 'Is a WhatsApp AI agent more expensive?', a: 'It adds messaging fees and approval requirements, but often has the clearest payback.' },
      { q: 'Can costs be capped?', a: 'Yes. Usage limits and monitoring keep running costs predictable.' },
      { q: 'Who pays for the AI model usage?', a: 'Usually the client, through accounts they own, so costs are transparent.' },
      { q: 'How fast does an AI agent pay back?', a: 'It depends on the task; a good pilot is chosen so payback can be measured within months.' },
    ],
  },
  {
    slug: 'geo-vs-seo',
    section: 'GEO',
    answer:
      'SEO makes your pages rank in search results; GEO, generative engine optimisation, makes your content easy for AI systems such as ChatGPT, Claude, Perplexity and Google AI Overviews to find, trust and cite inside their answers. GEO builds on SEO: direct answers, consistent facts, structured data and crawlable HTML.',
    takeaways: [
      'SEO earns rankings; GEO earns citations in AI answers',
      'GEO builds on SEO rather than replacing it',
      'Direct answers, consistent facts and structure matter most',
      'Allow AI crawlers and publish llms.txt',
    ],
    faq: [
      { q: 'Is GEO replacing SEO?', a: 'No. Most AI answers draw on content that is also crawlable and well ranked.' },
      { q: 'How do I know if AI engines cite my site?', a: 'Track referral traffic from AI tools and test the questions your buyers ask.' },
      { q: 'Does llms.txt guarantee citations?', a: 'No. It helps AI systems understand your site, but content quality decides.' },
      { q: 'What is the fastest GEO win?', a: 'A factual company page and direct answers to the top questions your buyers ask.' },
    ],
  },
  {
    slug: 'build-vs-buy-ai',
    section: 'AI strategy',
    answer:
      'Buy AI when an existing tool already fits your process and needs only generic data. Build when the AI must use your own data, systems and rules, or when the process is your advantage. Most businesses do best with both: buy the models and platforms, and build the layer that connects them.',
    takeaways: [
      'Buy for generic tasks that fit an existing tool',
      'Build when your data, systems or process are the point',
      'Combining both is often best',
      'Count ownership and maintenance, not just launch cost',
    ],
    faq: [
      { q: 'Is building AI only for large companies?', a: 'No. Building on top of bought models makes custom AI affordable for SMEs.' },
      { q: 'What is lock-in risk?', a: 'The cost of leaving a tool once your data and processes depend on it.' },
      { q: 'Who maintains custom AI?', a: 'Someone must. Fiutran runs what it builds so maintenance is not an afterthought.' },
      { q: 'Can we start with buying and build later?', a: 'Yes, and that is often a sensible way to learn what you really need.' },
    ],
  },
];

export function getInsight(slug: string): Insight {
  const i = insights.find((x) => x.slug === slug);
  if (!i) throw new Error(`Unknown insight ${slug}`);
  return i;
}
