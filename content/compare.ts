import type { FAQ, PageContent } from './types';

// Comparison pages: the table IS the content. Template: answer → table → when to choose each → FAQ.
export type Comparison = {
  slug: string;
  answer: string; // 40–60 words
  caption: string;
  columns: string[];
  rows: string[][];
  choose: { option: string; when: string[] }[];
  faq: FAQ[];
};

export const comparisons: Comparison[] = [
  {
    slug: 'ai-partner-vs-ai-consultant',
    answer:
      'An AI consultant studies your business and recommends what to do, usually delivered as a report or deck. An AI partner like Fiutran goes further: it learns how the business runs, then designs, builds and runs the working system, and stays accountable for the outcome after launch.',
    caption: 'AI partner vs AI consultant, compared on eight criteria',
    columns: ['Criterion', 'AI consultant', 'AI partner (Fiutran)'],
    rows: [
      ['Main output', 'Advice, report or slide deck', 'Working system in production'],
      ['Understanding of the business', 'Interviews and frameworks', 'Goes into the business and learns how it actually runs'],
      ['Who builds it', 'Usually someone else, after hand-off', 'The same team that designed it'],
      ['After launch', 'Engagement ends', 'Stays to run, monitor and improve it'],
      ['Accountable for', 'The quality of the recommendation', 'The outcome in production'],
      ['Typical pricing', 'Day rates or fixed-fee study', 'Phased build plus ongoing run (see engagement models)'],
      ['Best at', 'Independent assessment, board-level options', 'Turning a business problem into a working solution'],
      ['Risk you carry', 'Execution gap between plan and build', 'Choosing the right partner'],
    ],
    choose: [
      {
        option: 'Choose an AI consultant when',
        when: ['You need an independent opinion for a board or investor', 'You already have a strong in-house team to build', 'The decision is about strategy only, not delivery'],
      },
      {
        option: 'Choose an AI partner when',
        when: ['You want a working system, not a recommendation', 'You lack in-house technical leadership', 'You want one team accountable from design to operation'],
      },
    ],
    faq: [
      { q: 'Is Fiutran an AI consulting firm?', a: 'No. Fiutran is an AI partner: it designs, builds and runs working systems rather than handing over advice.' },
      { q: 'Does an AI partner also do strategy?', a: 'Yes. Strategy is the first step, but it is followed by building and running what it recommends.' },
      { q: 'Is an AI partner more expensive than a consultant?', a: 'Not necessarily. You pay for delivery instead of paying once for advice and again for a separate build team.' },
      { q: 'Can I use a consultant and a partner together?', a: 'Yes. Some clients use a consultant for an independent review and a partner to deliver.' },
    ],
  },
  {
    slug: 'cto-on-demand-vs-full-time-cto',
    answer:
      'A full-time CTO gives you a dedicated executive but costs a senior salary, takes months to hire and still needs a team. A CTO on demand gives you senior technical leadership part-time, plus a delivery team, from the first weeks. For most growing businesses without a large tech team, on demand fits better.',
    caption: 'CTO on demand vs full-time CTO, compared on nine criteria',
    columns: ['Criterion', 'Full-time CTO', 'CTO on demand (Fiutran)'],
    rows: [
      ['Cost', 'Senior executive salary plus equity: {{ph:full-time CTO salary benchmark with source}}', 'Monthly fee: {{ph:CTO on demand monthly price range}}'],
      ['Time to start', 'Months of recruiting', 'Weeks'],
      ['Comes with a team', 'No, hiring a team is extra', 'Yes, design, build and run team included'],
      ['Commitment', 'Permanent hire', 'Flexible, scales up or down'],
      ['Breadth of experience', 'One person’s background', 'A team’s combined experience across clients'],
      ['Availability', 'Full-time', 'Agreed share of time plus team capacity'],
      ['Best stage', 'Tech is the core product at scale', 'Growing businesses without in-house tech leadership'],
      ['Risk if it does not work', 'Costly mis-hire', 'Change scope or end the engagement'],
      ['Path later', 'Already in place', 'Helps you hire and onboard a full-time CTO when ready'],
    ],
    choose: [
      { option: 'Hire a full-time CTO when', when: ['Technology is your core product and you are scaling it', 'You can fund a senior hire and a team', 'You need a technical co-founder-level commitment'] },
      { option: 'Choose a CTO on demand when', when: ['You need tech leadership now, not in six months', 'You do not yet have or want an in-house team', 'You want leadership and delivery from one partner'] },
    ],
    faq: [
      { q: 'Can a CTO on demand become our full-time CTO?', a: 'Sometimes, but more often we help you hire one when the time is right and hand over cleanly.' },
      { q: 'How many hours does a CTO on demand work?', a: 'It is agreed per engagement and adjusted as needs change; see [[/engagement-models/|engagement models]].' },
      { q: 'Is a fractional CTO the same as a CTO on demand?', a: 'Similar. A fractional CTO is usually one person; Fiutran’s CTO on demand includes a team that ships.' },
      { q: 'Who owns the decisions?', a: 'You do. The CTO on demand recommends and leads delivery; the business owns the strategy.' },
    ],
  },
  {
    slug: 'fiutran-vs-agency-vs-freelancer',
    answer:
      'A freelancer is best for small, well-defined tasks. An agency is best for a defined project with a clear brief. An AI partner like Fiutran is best when you need someone to understand the business, decide what to build, build it and keep running it, with one team accountable throughout.',
    caption: 'Fiutran vs development agency vs freelancer, compared on eight criteria',
    columns: ['Criterion', 'Freelancer', 'Agency', 'AI partner (Fiutran)'],
    rows: [
      ['Starts from', 'Your task list', 'Your brief', 'How your business actually runs'],
      ['Decides what to build', 'You', 'Mostly you', 'Together, with technical leadership'],
      ['Scope', 'Single skill', 'Defined project', 'End-to-end, strategy to operation'],
      ['After launch', 'Moves to next client', 'Support contract or hand-off', 'Stays to run and improve'],
      ['Continuity risk', 'High: one person', 'Medium: team rotates', 'Low: same team, documented systems'],
      ['Technical leadership', 'No', 'Project-level', 'CTO-level, on demand'],
      ['Cost profile', 'Lowest hourly rate', 'Project fee', 'Phased build plus run'],
      ['Best for', 'Small, clear tasks', 'Clear, one-off projects', 'Ongoing transformation and AI'],
    ],
    choose: [
      { option: 'Choose a freelancer when', when: ['The task is small and fully specified', 'You can manage the work yourself'] },
      { option: 'Choose an agency when', when: ['You have a clear brief for a one-off project', 'You have someone in-house to own it after launch'] },
      { option: 'Choose Fiutran when', when: ['You need help deciding what to build', 'You want it built and run by one accountable team', 'You lack in-house technical leadership'] },
    ],
    faq: [
      { q: 'Is Fiutran an agency?', a: 'No. Agencies typically deliver a project and hand over. Fiutran designs, builds and stays to run the system.' },
      { q: 'Can Fiutran work with our existing freelancers or agency?', a: 'Yes. As CTO on demand we often coordinate existing vendors.' },
      { q: 'Is a partner always more expensive?', a: 'Hourly rates may be higher than a freelancer, but total cost often drops because work is not redone.' },
      { q: 'What if we only need a small task done?', a: 'Then a freelancer may be the better choice, and we will tell you so.' },
    ],
  },
];

export function getComparison(slug: string): Comparison {
  const c = comparisons.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown comparison ${slug}`);
  return c;
}

export const compareHub: PageContent = {
  answer:
    'Choosing who builds your AI and technology is the decision that matters most. These comparisons set the options side by side: AI partner versus AI consultant, CTO on demand versus a full-time CTO, and an AI partner versus an agency or freelancer, with clear guidance on when each one is the right choice.',
  blocks: [
    {
      kind: 'slot',
      name: 'grid',
      heading: 'Which comparison do you need?',
      bp: { purpose: 'Index of comparison pages', intent: 'X vs Y queries', lenses: ['SEO', 'GEO', 'GSEO'], schema: 'ItemList' },
    },
    {
      kind: 'table',
      heading: 'What is the short version?',
      caption: 'Summary: who does what',
      columns: ['Option', 'Gives you', 'Best when'],
      rows: [
        ['AI consultant', 'Advice and a plan', 'You need an independent view and can build yourself'],
        ['Full-time CTO', 'A dedicated executive', 'Tech is your core product at scale'],
        ['Agency', 'A defined project', 'You have a clear brief and an owner'],
        ['Freelancer', 'A skilled pair of hands', 'The task is small and clear'],
        ['AI partner (Fiutran)', 'Leadership plus a team that builds and runs', 'You want one team accountable from idea to operation'],
      ],
      bp: { purpose: 'Liftable summary table across all comparisons', intent: 'Who should I hire for AI?', lenses: ['AEO', 'GEO'] },
    },
  ],
  faq: [
    { q: 'Why does Fiutran publish comparisons?', a: 'Because the choice is genuinely hard, and an honest comparison helps buyers decide, including when we are not the right fit.' },
    { q: 'Are these comparisons neutral?', a: 'They are written by Fiutran, so read them as our view, but each one says when the other option is better.' },
    { q: 'Which option is cheapest?', a: 'A freelancer usually has the lowest rate; total cost depends on how much rework and coordination you take on.' },
    { q: 'How do I decide quickly?', a: 'If you need a working system and lack tech leadership, start with [[/cto-on-demand/|CTO on demand]].' },
  ],
};
