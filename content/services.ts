import type { FAQ, PageContent } from './types';

// Service pages share one typed shape. The service template (app/services/[slug]) renders:
// answer → who it's for → problems it solves → deliverables → how the engagement runs →
// timeline + price range → related case study → FAQ → CTA.

export type Service = {
  slug: string;
  name: string;
  serviceType: string;
  short: string; // card text on hubs / home
  answer: string; // 40–60 words
  whoFor: string[];
  problems: string[];
  deliverables: string[];
  steps: { title: string; text: string }[];
  caseStudy: string; // path of the closest (sample) case study
  faq: FAQ[];
};

const timeline = '{{ph:typical timeline}}';
const price = '{{ph:price range}}';
export const servicePlaceholders = { timeline, price, caseStudy: '{{ph:related case study}}' };

const ownership: FAQ = {
  q: 'Who owns the code, data and accounts?',
  a: 'You do. Everything we build runs in accounts you own, and the code and documentation are yours from day one.',
};

export const services: Service[] = [
  {
    slug: 'ai-strategy-and-roadmap',
    name: 'AI strategy and roadmap',
    serviceType: 'AI strategy consulting and roadmap',
    short: 'Where AI will actually pay off in your business, in what order, and what it will cost. Ends with a first pilot, not a deck.',
    answer:
      'An AI strategy and roadmap tells you where AI will pay off in your business, in what order, and at what cost. Fiutran builds it by learning how your business actually runs, then prioritises use cases by value and effort and finishes with a first pilot we can build with you.',
    whoFor: [
      'Founders and owners who know AI matters but not where to start',
      'Leadership teams with a list of AI ideas and no way to rank them',
      'Businesses that already bought AI tools that nobody uses',
      'Companies preparing a budget for AI and digital transformation',
    ],
    problems: [
      'Too many AI ideas, no way to tell which ones are worth money',
      'Previous strategy work ended as a deck that never got built',
      'No clear view of what data and systems you already have',
      'Fear of picking the wrong tools, vendors or models',
    ],
    deliverables: [
      'Process map of how the business actually runs today',
      'Prioritised AI use-case backlog scored by value, effort and risk',
      'Data and systems readiness assessment',
      'Cost and timeline estimate for the first three initiatives',
      'Scoped first pilot, ready to build',
    ],
    steps: [
      { title: 'Understand', text: 'Workshops and shadowing with the people who do the work.' },
      { title: 'Map', text: 'Processes, data and systems mapped and pain points ranked.' },
      { title: 'Prioritise', text: 'Use cases scored on value, effort and risk, then sequenced.' },
      { title: 'Plan the pilot', text: 'The first build scoped so it can start the following week.' },
    ],
    caseStudy: '/work/sample-data-foundations-retail/',
    faq: [
      { q: 'How is this different from an AI consultant’s strategy?', a: 'A consultant’s strategy ends with a recommendation. Ours ends with a scoped pilot that the same team then builds and runs.' },
      { q: 'Do we need clean data before starting?', a: 'No. Assessing your data is part of the roadmap; it tells you what to fix first.' },
      { q: 'Can we stop after the roadmap?', a: 'Yes. The roadmap is yours to keep and use with any team, although most clients continue into the pilot.' },
      ownership,
    ],
  },
  {
    slug: 'ai-agents-and-automation',
    name: 'AI agents and automation',
    serviceType: 'AI agent development and workflow automation',
    short: 'AI agents that do real work: WhatsApp sales agents, internal assistants and automated workflows that run every day.',
    answer:
      'Yes. An AI agent can qualify leads, answer customers on WhatsApp, prepare quotes or help staff find answers in internal documents. Fiutran designs the agent around your real process, connects it to your systems, adds guardrails and human hand-off, then runs and improves it after launch.',
    whoFor: [
      'Sales teams answering the same WhatsApp or email questions all day',
      'Operations teams copying data between systems by hand',
      'Businesses whose staff lose time searching for internal information',
      'Owners who want 24/7 response without hiring a night shift',
    ],
    problems: [
      'Slow replies lose leads, especially outside working hours',
      'Repetitive admin work blocks skilled people',
      'Knowledge sits in a few people’s heads and inboxes',
      'Off-the-shelf chatbots that cannot see your products, prices or stock',
    ],
    deliverables: [
      'Agent design: tasks, tone, guardrails and human hand-off rules',
      'Integrations with your CRM, catalogue, inventory or documents',
      'WhatsApp, web or internal chat channel set-up',
      'Monitoring dashboard: conversations, outcomes and cost',
      'Run-and-improve plan with monthly reviews',
    ],
    steps: [
      { title: 'Shadow the process', text: 'We watch how the work is done today and where it breaks.' },
      { title: 'Design the agent', text: 'Tasks, data access, guardrails and escalation rules agreed.' },
      { title: 'Build and test', text: 'Built against real conversations and edge cases before launch.' },
      { title: 'Run and improve', text: 'We monitor outcomes and cost and keep improving it.' },
    ],
    caseStudy: '/work/sample-ai-sales-agent-trading/',
    faq: [
      { q: 'What can an AI agent safely do on its own?', a: 'Answer, qualify, collect information and draft. Anything with financial or legal weight is routed to a person by design.' },
      { q: 'Does it work on WhatsApp?', a: 'Yes, through the official WhatsApp Business Platform, alongside web chat or internal tools.' },
      { q: 'How much does an AI agent cost?', a: 'It depends on scope, integrations and usage. See [[/insights/how-much-does-an-ai-agent-cost/|how much an AI agent costs]] for the cost drivers.' },
      ownership,
    ],
  },
  {
    slug: 'custom-software-and-platforms',
    name: 'Custom software and platforms',
    serviceType: 'Custom software development',
    short: 'Portals, internal tools and platforms built around how your business runs, with AI where it helps.',
    answer:
      'Build custom software when off-the-shelf tools force your business to work around them, or when the software itself is your advantage. Fiutran designs and builds portals, internal tools and platforms around how you actually operate, adds AI where it helps, and stays to run and evolve them.',
    whoFor: [
      'Businesses running core work on spreadsheets and email',
      'Companies outgrowing a patchwork of SaaS tools',
      'Founders building a digital product or customer platform',
      'Teams whose current software vendor has gone quiet',
    ],
    problems: [
      'Processes bent to fit tools instead of the other way round',
      'Data scattered across disconnected systems',
      'Agencies that build, hand over and disappear',
      'No in-house team to maintain what was built',
    ],
    deliverables: [
      'Product and technical design based on real workflows',
      'Working software released in short increments',
      'Cloud infrastructure in accounts you own',
      'Documentation, tests and handover-ready code',
      'Ongoing run, support and roadmap',
    ],
    steps: [
      { title: 'Understand', text: 'Map the workflow and the people who use it.' },
      { title: 'Design', text: 'Agree scope, architecture and a first release.' },
      { title: 'Build', text: 'Ship in short increments you can use and test.' },
      { title: 'Run', text: 'Operate, support and evolve it with you.' },
    ],
    caseStudy: '/work/sample-cto-on-demand-fitness/',
    faq: [
      { q: 'Should we build or buy?', a: 'Buy when a tool fits your process; build when it does not, or when the software is your edge. See [[/insights/build-vs-buy-ai/|build vs buy AI]].' },
      { q: 'What technology do you use?', a: 'Proven, mainstream stacks chosen for your team’s ability to own them, not for novelty.' },
      { q: 'Do you only build, or also run it?', a: 'Both. Running what we build is the point of being a partner rather than an agency.' },
      ownership,
    ],
  },
  {
    slug: 'data-foundations',
    name: 'Data foundations',
    serviceType: 'Data engineering and analytics',
    short: 'Clean, connected, owned data so AI, reporting and decisions actually work.',
    answer:
      'Before AI can help, a business needs data that is collected consistently, stored in one place it owns, connected across systems and trusted by the people using it. Fiutran audits what you have, builds the pipelines, warehouse and dashboards, and runs them so AI and reporting work reliably.',
    whoFor: [
      'Businesses whose reports take days to assemble by hand',
      'Companies planning AI but unsure their data can support it',
      'Teams that do not trust the numbers in their own systems',
      'Owners who want one view of sales, stock and customers',
    ],
    problems: [
      'The same number differs between systems',
      'Data locked inside tools you cannot query',
      'Reporting depends on one person’s spreadsheet',
      'AI pilots fail because inputs are incomplete',
    ],
    deliverables: [
      'Data audit: sources, quality, gaps and ownership',
      'Pipelines connecting your core systems',
      'Central warehouse in accounts you own',
      'Dashboards for the decisions that matter',
      'Data quality monitoring and documentation',
    ],
    steps: [
      { title: 'Audit', text: 'List every source and test its quality.' },
      { title: 'Design', text: 'Agree the model, the warehouse and the first dashboards.' },
      { title: 'Build', text: 'Connect sources and ship dashboards people use.' },
      { title: 'Run', text: 'Monitor quality and extend as needs grow.' },
    ],
    caseStudy: '/work/sample-data-foundations-retail/',
    faq: [
      { q: 'Do we need a data warehouse?', a: 'Not always. For many SMEs a well-structured database and a few pipelines are enough to start.' },
      { q: 'How long before we see dashboards?', a: 'We aim to ship the first useful dashboard early in the engagement, then extend.' },
      { q: 'Can you work with our existing tools?', a: 'Yes. We connect what you already use before suggesting anything new.' },
      ownership,
    ],
  },
  {
    slug: 'digital-transformation-programs',
    name: 'Digital-transformation programs',
    serviceType: 'Digital transformation program delivery',
    short: 'Multi-quarter programs we design, build and run with your team, from process mapping to systems in production.',
    answer:
      'A digital-transformation program delivers when the same team that designs it also builds and runs it, in short cycles with measurable outcomes. Fiutran maps how your business works, sequences the changes, ships working systems quarter by quarter and stays to run them alongside your people.',
    whoFor: [
      'Innovation and operations heads at larger or growing companies',
      'Leadership teams with a transformation mandate and limited delivery capacity',
      'Businesses after a merger, expansion or new market entry',
      'Companies whose previous transformation stalled after the strategy phase',
    ],
    problems: [
      'Transformation plans that never leave the slide deck',
      'Many vendors, nobody accountable for the outcome',
      'Change fatigue because nothing visible ships',
      'Internal teams too busy running the business to change it',
    ],
    deliverables: [
      'Current-state process and systems map',
      'Program roadmap with quarterly outcomes',
      'Working systems shipped each cycle',
      'Change and adoption plan for the teams affected',
      'Program governance: reporting, risks and decisions',
    ],
    steps: [
      { title: 'Understand', text: 'Map processes, systems and people across the business.' },
      { title: 'Design the program', text: 'Sequence initiatives into quarterly outcomes.' },
      { title: 'Build in cycles', text: 'Ship, adopt and measure each cycle.' },
      { title: 'Run and scale', text: 'Operate what works and extend it.' },
    ],
    caseStudy: '/work/sample-data-foundations-retail/',
    faq: [
      { q: 'How is this different from a consulting-led transformation?', a: 'We are accountable for working systems in production, not for a recommendation. See [[/compare/ai-partner-vs-ai-consultant/|AI partner vs AI consultant]].' },
      { q: 'How do you report progress?', a: 'Each cycle ends with shipped outcomes measured against the goals agreed at the start.' },
      { q: 'Do you work with our IT team?', a: 'Yes. We work alongside internal IT and vendors and leave them stronger, not dependent.' },
      ownership,
    ],
  },
  {
    slug: 'ai-adoption-and-upskilling',
    name: 'AI adoption and upskilling',
    serviceType: 'AI training and adoption',
    short: 'Teams that actually use AI, not just have it: role-based training, playbooks and adoption tracking.',
    answer:
      'Teams adopt AI when training is tied to their real daily tasks, when there are clear rules on what is allowed, and when someone measures and follows up on usage. Fiutran runs role-based, hands-on sessions, writes playbooks for your workflows and tracks adoption until it sticks.',
    whoFor: [
      'Companies that bought AI licences that sit unused',
      'Managers who want their team productive with AI safely',
      'Businesses rolling out a new AI system to staff',
      'Leadership teams needing a shared understanding of AI',
    ],
    problems: [
      'Generic AI training that nobody applies the next day',
      'Unclear rules on what data can go into AI tools',
      'A few enthusiasts, the rest of the team untouched',
      'No measurement of whether AI saves any time',
    ],
    deliverables: [
      'Role-based, hands-on training sessions',
      'Workflow playbooks and prompt libraries for your tasks',
      'AI usage policy and guardrails',
      'Adoption tracking and follow-up sessions',
      'Internal champions programme',
    ],
    steps: [
      { title: 'Assess', text: 'Find the tasks where AI saves the most time per role.' },
      { title: 'Train', text: 'Hands-on sessions on real work, not demos.' },
      { title: 'Embed', text: 'Playbooks, policies and champions in each team.' },
      { title: 'Measure', text: 'Track usage and outcomes and follow up.' },
    ],
    caseStudy: '/work/sample-cto-on-demand-fitness/',
    faq: [
      { q: 'Is this a one-day workshop?', a: 'No. Training is the start; playbooks, champions and follow-up are what make adoption stick.' },
      { q: 'Which AI tools do you train on?', a: 'The ones your business already uses or has chosen, plus safe practices that apply to any tool.' },
      { q: 'Can sessions be in person?', a: 'Yes. We also run the open [[/community/|Learn & Build Tech Frankfurt]] sessions.' },
      { q: 'How do you measure adoption?', a: 'Usage data where tools provide it, plus time saved on the specific tasks we trained.' },
    ],
  },
  {
    slug: 'geo-websites',
    name: 'GEO websites',
    serviceType: 'Generative engine optimisation (GEO) web development',
    short: 'Websites built to be found by Google and cited by ChatGPT, Claude, Perplexity and AI Overviews.',
    answer:
      'To get cited by ChatGPT, Claude, Perplexity and Google AI Overviews, a website needs direct answers to real questions, consistent facts about who you are, structured data, crawlable HTML and open access for AI crawlers. Fiutran builds websites engineered for this, like the one you are reading, and keeps measuring citations.',
    whoFor: [
      'Businesses whose customers now ask AI assistants instead of searching',
      'Companies with a website that ranks but never gets cited',
      'Founders launching a new brand or category',
      'Marketing teams that need content AI engines can lift',
    ],
    problems: [
      'Websites built for looks, invisible to AI answers',
      'Inconsistent company facts across the web',
      'Content rendered by JavaScript that AI crawlers never see',
      'No way to know whether AI engines mention you',
    ],
    deliverables: [
      'Question-led site architecture and page registry',
      'Answer blocks, FAQs, comparison and fact pages',
      'Structured data (JSON-LD) for every page type',
      'llms.txt, robots.txt and sitemap set up for AI crawlers',
      'Citation and ranking monitoring',
    ],
    steps: [
      { title: 'Research', text: 'Find the questions your buyers ask search and AI.' },
      { title: 'Architect', text: 'One page per question, mapped in a registry.' },
      { title: 'Build', text: 'Static, fast, structured pages with answer blocks.' },
      { title: 'Measure', text: 'Track rankings and AI citations and iterate.' },
    ],
    caseStudy: '/work/sample-data-foundations-retail/',
    faq: [
      { q: 'What is GEO?', a: 'Generative engine optimisation: making content easy for AI engines to find, trust and cite. See [[/insights/geo-vs-seo/|GEO vs SEO]].' },
      { q: 'Does GEO replace SEO?', a: 'No. GEO builds on SEO; a page that cannot be crawled or ranked is rarely cited.' },
      { q: 'What is llms.txt?', a: 'A plain-text file that summarises your site and links its key pages for AI systems.' },
      ownership,
    ],
  },
];

export function getService(slug: string): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}

export const servicesHub: PageContent = {
  answer:
    'Fiutran offers seven services that work together: AI strategy and roadmaps, AI agents and automation, custom software and platforms, data foundations, digital-transformation programs, AI adoption and upskilling, and GEO websites. Every service is designed, built and run by the same team, so nothing gets lost in a hand-off.',
  blocks: [
    {
      kind: 'slot',
      name: 'grid',
      heading: 'Which service do you need?',
      bp: { purpose: 'Route visitors to the right service page', intent: 'Service discovery', lenses: ['SEO', 'GSEO'], cta: 'Open a service page', schema: 'ItemList' },
    },
    {
      kind: 'prose',
      heading: 'Why one partner for all seven?',
      draft: true,
      paras: [
        'Most businesses do not need seven vendors. They need one team that understands how the business runs and can move from strategy to working software to everyday operation without starting over each time.',
        'That is why every service follows the same method: [[/how-we-work/|Understand → Design → Build → Run → Scale]].',
      ],
      bp: { purpose: 'Reinforce partner-not-consultant positioning', intent: 'Why Fiutran', lenses: ['GEO'] },
    },
    {
      kind: 'cards',
      heading: 'Not sure where to start?',
      cols: 3,
      cards: [
        { title: 'Take the AI readiness check', text: 'Eight questions, an instant readiness level and a recommended next step.', href: '/ai-readiness-check/', linkLabel: 'Start the readiness check' },
        { title: 'CTO on demand', text: 'Technical leadership plus a team that ships, across all seven services.', href: '/cto-on-demand/', linkLabel: 'See CTO on demand' },
        { title: 'Engagement models', text: 'How engagements are structured and what they cost.', href: '/engagement-models/', linkLabel: 'See engagement models and pricing' },
      ],
      bp: { purpose: 'Catch undecided visitors', intent: 'Where do I start?', lenses: ['SEO'], cta: 'AI readiness check' },
    },
  ],
  faq: [
    { q: 'Can I hire Fiutran for just one service?', a: 'Yes. Many clients start with one service, often a roadmap or a single AI agent, and expand once it works.' },
    { q: 'Which service should I start with?', a: 'If you are unsure, start with the [[/ai-readiness-check/|AI readiness check]] or an AI strategy and roadmap.' },
    { q: 'Do you work outside these seven services?', a: 'Rarely. If a need falls outside them, we will say so and recommend someone better placed.' },
    { q: 'Is pricing the same for every service?', a: 'No. Each service page shows a typical range, and [[/engagement-models/|engagement models]] explains how pricing works.' },
  ],
};
