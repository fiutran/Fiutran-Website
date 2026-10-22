// /map page data: user journeys and open decisions.

export type JourneyStep = { label: string; href: string; note?: string };
export type Journey = { tag: string; persona: string; goal: string; steps: JourneyStep[] };

export const journeys: Journey[] = [
  {
    tag: 'sme-founder',
    persona: 'SME founder who needs tech leadership',
    goal: 'Find senior technical leadership without hiring a full-time CTO',
    steps: [
      { label: 'Google / AI answer', href: '/insights/what-is-a-cto-on-demand/#answer', note: 'Answer block lifted by Google or an AI assistant' },
      { label: 'Insight: what is a CTO on demand?', href: '/insights/what-is-a-cto-on-demand/' },
      { label: 'CTO on demand', href: '/cto-on-demand/' },
      { label: 'Case study', href: '/work/sample-cto-on-demand-fitness/' },
      { label: 'Book a call', href: '/contact/' },
    ],
  },
  {
    tag: 'unsure-about-ai',
    persona: 'Business owner unsure where to start with AI',
    goal: 'Find out whether and where AI fits',
    steps: [
      { label: 'Home', href: '/' },
      { label: 'AI readiness check', href: '/ai-readiness-check/' },
      { label: 'Result', href: '/ai-readiness-check/result/?a=12112121', note: 'Sample answers: Ready to pilot' },
      { label: 'Recommended service', href: '/services/ai-agents-and-automation/' },
      { label: 'Book a call', href: '/contact/' },
    ],
  },
  {
    tag: 'ops-head',
    persona: 'Innovation / ops head at a larger company',
    goal: 'Find a partner to deliver a transformation program',
    steps: [
      { label: 'Digital-transformation programs', href: '/services/digital-transformation-programs/' },
      { label: 'Case study', href: '/work/sample-data-foundations-retail/' },
      { label: 'Engagement models', href: '/engagement-models/' },
      { label: 'Book a call', href: '/contact/' },
    ],
  },
  {
    tag: 'ai-search',
    persona: 'AI-search visitor',
    goal: 'Asks ChatGPT “AI partner vs AI consultant” and follows the citation',
    steps: [
      { label: 'ChatGPT answer cites Fiutran', href: '/compare/ai-partner-vs-ai-consultant/#answer', note: 'Answer block + comparison table are the cited passages' },
      { label: 'Compare: AI partner vs AI consultant', href: '/compare/ai-partner-vs-ai-consultant/' },
      { label: 'About', href: '/about/' },
      { label: 'Book a call', href: '/contact/' },
    ],
  },
];

export const openDecisions: { topic: string; question: string; affects: string[] }[] = [
  { topic: 'Target markets', question: 'India, Germany or both? Decides hreflang (en-IN / en-DE, off by default in site.config.ts) and whether the imprint is legally required.', affects: ['/imprint/', '/fiutran-at-a-glance/'] },
  { topic: 'Price ranges', question: 'Publish price ranges publicly? Transparent pricing is heavily cited by AI answers, but it is a commercial decision.', affects: ['/engagement-models/', '/cto-on-demand/', '/insights/how-much-does-an-ai-agent-cost/'] },
  { topic: 'Case studies', question: 'Which case studies are approved to name the client, and which must be anonymised?', affects: ['/work/'] },
  { topic: 'Domain', question: 'Final domain. Canonicals, sitemap, llms.txt and JSON-LD all derive from NEXT_PUBLIC_SITE_URL.', affects: ['/'] },
  { topic: 'Blog cadence', question: 'How often will insights be published, and who reviews them?', affects: ['/insights/'] },
  { topic: 'Fiunify site', question: 'Does Fiunify get its own website, or stay as a page on the Fiutran website?', affects: ['/products/fiunify/'] },
];
