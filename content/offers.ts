import type { PageContent } from './types';

// How we work, CTO on demand, Fiunify, engagement models.

export const howWeWork: PageContent = {
  answer:
    'Fiutran works in five steps with one team throughout: Understand how your business actually runs, Design the solution with your people, Build working systems in short cycles, Run and improve them in production, then Scale what works across the business. Nothing is handed over to someone who was not in the room.',
  heroImage: 'Process diagram: five-step method',
  blocks: [
    {
      kind: 'prose',
      id: 'understand',
      heading: '1. Understand: how does your business actually run?',
      draft: true,
      paras: [
        'We spend time inside the business: shadowing the people who do the work, mapping processes, data and systems, and finding where time, money and customers are lost. Typical duration: {{ph:typical duration per step}}.',
        'Output: a shared map of how the business runs today and a ranked list of problems worth solving.',
      ],
      bp: { purpose: 'Explain step 1 and why it differs from consulting', intent: 'How does an AI partner start?', lenses: ['AEO', 'GEO'] },
    },
    {
      kind: 'prose',
      id: 'design',
      heading: '2. Design: what exactly should we build?',
      draft: true,
      paras: ['We design the solution with the people who will use it: scope, architecture, data, guardrails and how success will be measured. Output: a scoped first release that can start building immediately.'],
      bp: { purpose: 'Explain step 2', intent: 'Solution design', lenses: ['AEO'] },
    },
    {
      kind: 'prose',
      id: 'build',
      heading: '3. Build: how fast do we ship?',
      draft: true,
      paras: ['We build in short cycles and put working software in front of real users early. Everything runs in accounts you own, with tests and documentation from the start.'],
      bp: { purpose: 'Explain step 3', intent: 'How fast can it be built?', lenses: ['AEO'] },
    },
    {
      kind: 'prose',
      id: 'run',
      heading: '4. Run: who looks after it after launch?',
      draft: true,
      paras: ['We do. We monitor, support and improve what we built, and report on outcomes. This is the step consultants and most agencies skip, and the one that decides whether a system creates value.'],
      bp: { purpose: 'Explain step 4, the core differentiator', intent: 'What happens after launch?', lenses: ['AEO', 'GEO'] },
    },
    {
      kind: 'prose',
      id: 'scale',
      heading: '5. Scale: what happens once it works?',
      draft: true,
      paras: ['We extend what works to more teams, processes or markets, and invest in the data foundations that make each next step faster and cheaper.'],
      bp: { purpose: 'Explain step 5', intent: 'How to scale AI', lenses: ['AEO'] },
    },
    {
      kind: 'table',
      heading: 'How does this compare with a typical consulting engagement?',
      caption: 'Fiutran method vs typical consulting engagement, step by step',
      columns: ['Step', 'Typical consultant', 'Fiutran'],
      rows: [
        ['Understand', 'Interviews', 'Inside the business with the people doing the work'],
        ['Design', 'Recommendation', 'Scoped, buildable first release'],
        ['Build', 'Handed to another vendor', 'Same team builds'],
        ['Run', 'Not included', 'Included: monitor, support, improve'],
        ['Scale', 'New engagement', 'Continues with the same team'],
      ],
      bp: { purpose: 'Liftable comparison of method', intent: 'AI partner vs consultant', lenses: ['AEO', 'GEO'] },
    },
  ],
  faq: [
    { q: 'Do we have to go through all five steps?', a: 'No. Some clients start at Build with a clear brief, but we always spend some time on Understand first.' },
    { q: 'How long does the Understand step take?', a: 'It depends on the size of the business; typical durations will be published here.' },
    { q: 'Who from our side needs to be involved?', a: 'A decision-maker, plus the people who do the work in the processes we are improving.' },
    { q: 'Can we stop after any step?', a: 'Yes. Each step ends with something you own and can use.' },
    { q: 'How does this method relate to pricing?', a: 'Each step maps to an engagement model; see [[/engagement-models/|engagement models and pricing]].' },
  ],
};

export const ctoOnDemand: PageContent = {
  answer:
    'A CTO on demand gives a growing business senior technical leadership for an agreed share of time, plus a Fiutran team that designs, builds and runs the systems. It suits founders and owners making technology decisions without a technical leader, and costs far less than hiring a full-time CTO and an in-house team.',
  blocks: [
    {
      kind: 'list',
      heading: 'Who is CTO on demand for?',
      items: [
        'Founders and owners of growing businesses without a technical co-founder or CTO',
        'Companies with several tech vendors and nobody to coordinate them',
        'Businesses where AI and digital transformation are on the agenda but nobody owns them',
        'Teams whose product or platform has stalled',
      ],
      bp: { purpose: 'Qualify the visitor', intent: 'Is CTO on demand for me?', lenses: ['AEO', 'SEO'] },
    },
    {
      kind: 'cards',
      heading: 'What do you get?',
      cols: 2,
      cards: [
        { title: 'Technical leadership', text: 'Technology strategy, architecture, build-vs-buy and vendor decisions, security and risk, reported to the founders.' },
        { title: 'A team that ships', text: 'Designers, engineers and data people who build and run the systems the leadership decides on.' },
        { title: 'One accountable partner', text: 'No gap between the person deciding and the people delivering.' },
        { title: 'A path to in-house', text: 'When you are ready, we help you hire and hand over to a full-time CTO.' },
      ],
      bp: { purpose: 'Define the offer components', intent: 'What does a CTO on demand do?', lenses: ['AEO', 'GEO'] },
    },
    {
      kind: 'steps',
      heading: 'How does a CTO-on-demand engagement run?',
      steps: [
        { title: 'Discovery', text: 'Learn the business and review current technology.' },
        { title: 'First 90 days', text: 'Agree priorities, quick wins and the roadmap.' },
        { title: 'Lead and build', text: 'Leadership and delivery run together.' },
        { title: 'Monthly review', text: 'Report outcomes, adjust time share and team.' },
        { title: 'Hand-over (optional)', text: 'Hire and onboard your in-house CTO.' },
      ],
      bp: { purpose: 'Reduce perceived risk by showing the process', intent: 'How does it work?', lenses: ['AEO'] },
    },
    {
      kind: 'facts',
      heading: 'What does it cost?',
      rows: [
        ['Monthly fee', '{{ph:CTO on demand monthly price range}}'],
        ['Minimum engagement', '{{ph:minimum engagement length}}'],
        ['What changes the price', 'Share of senior time and size of the delivery team'],
      ],
      bp: { purpose: 'Transparent pricing (heavily cited by AI answers)', intent: 'How much does a CTO on demand cost?', lenses: ['GEO', 'AEO'] },
    },
    {
      kind: 'quote',
      heading: 'What do clients say?',
      quote: '{{ph:client quote about CTO on demand}}',
      cite: 'Client name, role, company (to be approved)',
      bp: { purpose: 'Social proof', intent: 'Does it work?', lenses: ['GEO', 'GSEO'] },
    },
    {
      kind: 'links',
      heading: 'Is it better than hiring a full-time CTO?',
      intro: 'It depends on your stage. The comparison sets out cost, speed, team and risk.',
      links: [
        { label: 'Compare CTO on demand vs a full-time CTO', href: '/compare/cto-on-demand-vs-full-time-cto/' },
        { label: 'Read: what is a CTO on demand?', href: '/insights/what-is-a-cto-on-demand/' },
        { label: 'See a sample CTO-on-demand case study', href: '/work/sample-cto-on-demand-fitness/' },
      ],
      bp: { purpose: 'Link the offer to its topical cluster', intent: 'CTO on demand vs full-time CTO', lenses: ['SEO', 'GSEO'] },
    },
  ],
  faq: [
    { q: 'How much of the CTO’s time do we get?', a: 'An agreed share, set at the start and reviewed monthly as your needs change.' },
    { q: 'Is the team included in the price?', a: 'Leadership and delivery capacity are scoped together, so you see the full cost up front.' },
    { q: 'Can the CTO on demand manage our existing developers?', a: 'Yes. Coordinating in-house staff and external vendors is part of the role.' },
    { q: 'What happens if we want to hire our own CTO?', a: 'We help you write the role, interview candidates and hand over cleanly.' },
    { q: 'Can CTO on demand cover security and data protection?', a: 'Yes. Technical risk, security and data protection are part of the CTO responsibility.' },
  ],
  cta: {
    heading: 'Get technical leadership this month, not next year',
    text: 'Tell us where your business is and what is stuck. We will tell you honestly whether CTO on demand is the right fit.',
    primary: { label: 'Book a call', href: '/contact/' },
    secondary: { label: 'See engagement models', href: '/engagement-models/' },
  },
};

export const fiunify: PageContent = {
  answer:
    'Fiunify is Fiutran’s own product: an AI application for social relationships and connection. Fiutran designs, builds and runs it in-house, which is direct proof that Fiutran builds and operates real products, not just services, and brings that product experience into every client engagement it takes on.',
  heroImage: 'Product visual: Fiunify app screens',
  blocks: [
    {
      kind: 'prose',
      heading: 'What does Fiunify do?',
      paras: ['{{ph:Fiunify product description (what it does, for whom)}}'],
      bp: { purpose: 'Define the product for people and AI engines', intent: 'What is Fiunify?', lenses: ['GEO', 'GSEO'], schema: 'SoftwareApplication' },
    },
    {
      kind: 'facts',
      heading: 'Fiunify at a glance',
      rows: [
        ['Made by', 'Fiutran'],
        ['Category', 'AI for social relationships and connection'],
        ['Platforms', '{{ph:Fiunify platforms (web, iOS, Android)}}'],
        ['Status', '{{ph:Fiunify launch status}}'],
        ['Website', '{{ph:Fiunify website URL}}'],
      ],
      bp: { purpose: 'Structured product facts', intent: 'Fiunify facts', lenses: ['GEO'], schema: 'SoftwareApplication' },
    },
    {
      kind: 'prose',
      heading: 'Why does an AI partner build its own product?',
      draft: true,
      paras: [
        'Building and running Fiunify means Fiutran lives with the same decisions its clients face: what to build, which models to use, what it costs to run and how to keep users. That experience goes straight into [[/services/custom-software-and-platforms/|client platforms]] and [[/services/ai-agents-and-automation/|AI agents]].',
      ],
      bp: { purpose: 'Connect product to positioning (builder, not adviser)', intent: 'Does Fiutran build products?', lenses: ['GEO'] },
    },
  ],
  faq: [
    { q: 'Who makes Fiunify?', a: 'Fiunify is built and run by Fiutran.' },
    { q: 'Is Fiunify a client project?', a: 'No. It is Fiutran’s own product.' },
    { q: 'Will Fiunify have its own website?', a: 'That is an open decision; for now this page is its home on the Fiutran website.' },
    { q: 'Can Fiutran build a product like Fiunify for us?', a: 'Yes. See [[/services/custom-software-and-platforms/|custom software and platforms]].' },
  ],
};

export const engagementModels: PageContent = {
  answer:
    'Clients work with Fiutran in four ways: a fixed-scope discovery sprint to understand the business and plan, a build project to ship a defined system, CTO on demand for ongoing leadership plus a team, and a run-and-scale retainer to operate and improve what is live. Price ranges for each are published below.',
  blocks: [
    {
      kind: 'table',
      heading: 'Which engagement model fits?',
      caption: 'Fiutran engagement models with price ranges',
      columns: ['Model', 'What it is', 'Best for', 'Typical length', 'Price range'],
      rows: [
        ['Discovery sprint', 'Understand + Design: map the business and scope the first build', 'Starting out, unclear priorities', 'Weeks', '{{ph:discovery sprint price range}}'],
        ['Build project', 'Design + Build a defined system', 'A clear problem to solve', 'Weeks to months', '{{ph:build project price range}}'],
        ['CTO on demand', 'Leadership plus a team, ongoing', 'No in-house tech leadership', 'Months to years', '{{ph:CTO on demand monthly price range}}'],
        ['Run and scale retainer', 'Run + Scale: operate, support, improve', 'Systems already live', 'Ongoing', '{{ph:run and scale retainer price range}}'],
      ],
      bp: { purpose: 'Transparent pricing table (the content AI answers quote)', intent: 'How much does an AI partner cost?', lenses: ['AEO', 'GEO', 'GSEO'] },
    },
    {
      kind: 'list',
      heading: 'What changes the price?',
      items: ['Scope and number of processes involved', 'Integrations with existing systems', 'Size of the delivery team', 'Share of senior leadership time', 'Running costs such as AI model usage and hosting, paid through accounts you own'],
      bp: { purpose: 'Explain price drivers', intent: 'What affects AI project cost?', lenses: ['AEO'] },
    },
    {
      kind: 'prose',
      heading: 'Why publish price ranges?',
      draft: true,
      paras: ['Because you should know whether we fit your budget before the first call. Ranges are indicative; every proposal is fixed in writing before work starts.'],
      bp: { purpose: 'Trust signal; open decision on publishing prices', intent: 'Is pricing transparent?', lenses: ['GEO'] },
    },
  ],
  faq: [
    { q: 'Do you work on fixed price or time and materials?', a: 'Discovery sprints and build projects are usually fixed-scope; CTO on demand and run retainers are monthly.' },
    { q: 'Can we switch models?', a: 'Yes. Most clients move from discovery to build to run as systems go live.' },
    { q: 'Are AI model and hosting costs included?', a: 'They are billed through accounts you own, so you see them directly.' },
    { q: 'Is there a minimum engagement?', a: 'Each model has its own minimum, stated in the proposal.' },
    { q: 'What happens on the first call?', a: 'We listen to your situation and tell you honestly whether one of these models fits.' },
  ],
};
