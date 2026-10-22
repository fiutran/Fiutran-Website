import type { PageContent } from './types';

// AI readiness check: 8 questions, each option scored 0–3. Max score 24.
// Scoring and recommendations live in lib/readiness.ts.

export type Question = { id: string; topic: string; q: string; options: { label: string; score: 0 | 1 | 2 | 3 }[] };

export const questions: Question[] = [
  {
    id: 'data',
    topic: 'Data',
    q: 'How would you describe your business data today?',
    options: [
      { label: 'Mostly in people’s heads, paper or scattered spreadsheets', score: 0 },
      { label: 'In a few tools, but not connected and not fully trusted', score: 1 },
      { label: 'In core systems we trust, partly connected', score: 2 },
      { label: 'Connected, clean and accessible in one place', score: 3 },
    ],
  },
  {
    id: 'processes',
    topic: 'Processes',
    q: 'How well documented are your key processes?',
    options: [
      { label: 'Not documented; everyone does it their own way', score: 0 },
      { label: 'Some are written down, many are not', score: 1 },
      { label: 'Most key processes are clear and repeatable', score: 2 },
      { label: 'Documented, measured and regularly improved', score: 3 },
    ],
  },
  {
    id: 'skills',
    topic: 'Team skills',
    q: 'How comfortable is your team with AI tools?',
    options: [
      { label: 'Nobody uses them', score: 0 },
      { label: 'A few individuals experiment', score: 1 },
      { label: 'Several teams use them weekly', score: 2 },
      { label: 'AI is part of everyday work with clear guidelines', score: 3 },
    ],
  },
  {
    id: 'tools',
    topic: 'Current tools',
    q: 'What does your current software set-up look like?',
    options: [
      { label: 'Mostly spreadsheets, email and messaging', score: 0 },
      { label: 'A few SaaS tools that do not talk to each other', score: 1 },
      { label: 'Core systems (CRM, ERP, etc.) with some integrations', score: 2 },
      { label: 'Integrated systems with APIs we control', score: 3 },
    ],
  },
  {
    id: 'leadership',
    topic: 'Leadership buy-in',
    q: 'How committed is leadership to AI and digital change?',
    options: [
      { label: 'Sceptical or not discussed', score: 0 },
      { label: 'Interested but no decisions yet', score: 1 },
      { label: 'Committed to a first project', score: 2 },
      { label: 'It is a stated priority with an owner', score: 3 },
    ],
  },
  {
    id: 'budget',
    topic: 'Budget',
    q: 'Is there budget for AI or digital projects this year?',
    options: [
      { label: 'No budget', score: 0 },
      { label: 'Possibly, if the case is strong', score: 1 },
      { label: 'Yes, for a pilot', score: 2 },
      { label: 'Yes, for a program over several quarters', score: 3 },
    ],
  },
  {
    id: 'urgency',
    topic: 'Urgency',
    q: 'How urgent is the problem you want to solve?',
    options: [
      { label: 'Just exploring', score: 0 },
      { label: 'Within the next year', score: 1 },
      { label: 'Within the next quarter', score: 2 },
      { label: 'It is costing us now', score: 3 },
    ],
  },
  {
    id: 'ownership',
    topic: 'Tech ownership',
    q: 'Who owns technology decisions in your business?',
    options: [
      { label: 'Nobody in particular', score: 0 },
      { label: 'The founder or owner, alongside everything else', score: 1 },
      { label: 'An IT lead or external vendor', score: 2 },
      { label: 'A CTO or technical leader', score: 3 },
    ],
  },
];

export const readinessPage: PageContent = {
  answer:
    'Your business is ready for AI when its data is reachable, its key processes are repeatable, leadership is committed, and someone owns technology decisions. This eight-question check scores those factors and places you in one of three levels: Exploring, Ready to pilot or Ready to scale, with next steps.',
  blocks: [
    {
      kind: 'slot',
      name: 'check',
      heading: 'Answer 8 questions',
      intro: 'Takes about two minutes. Nothing is sent anywhere unless you ask for the result by email.',
      bp: { purpose: 'Interactive assessment (lead magnet)', intent: 'Is my business ready for AI?', lenses: ['SEO'], cta: 'See my result' },
    },
    {
      kind: 'table',
      heading: 'What do the three readiness levels mean?',
      caption: 'AI readiness levels',
      columns: ['Level', 'Score', 'What it means', 'Typical next step'],
      rows: [
        ['Exploring', '0–9', 'Foundations first: data, processes and ownership', '[[/services/ai-strategy-and-roadmap/|AI strategy and roadmap]]'],
        ['Ready to pilot', '10–17', 'Ready for one focused, measurable AI pilot', '[[/services/ai-agents-and-automation/|AI agents and automation]]'],
        ['Ready to scale', '18–24', 'Ready to extend AI across processes and teams', '[[/services/digital-transformation-programs/|Digital-transformation program]]'],
      ],
      bp: { purpose: 'Crawlable explanation of the result levels', intent: 'AI readiness levels', lenses: ['AEO', 'GEO'] },
    },
    {
      kind: 'list',
      heading: 'What does the check measure?',
      items: questions.map((q) => `**${q.topic}**: ${q.q}`),
      bp: { purpose: 'Crawlable list of the eight factors', intent: 'AI readiness factors', lenses: ['AEO'] },
    },
  ],
  faq: [
    { q: 'Is the AI readiness check free?', a: 'Yes. It runs in your browser and nothing is stored unless you ask for the result by email.' },
    { q: 'How is the score calculated?', a: 'Each answer scores 0 to 3 across eight factors, for a maximum of 24.' },
    { q: 'What if I score low?', a: 'A low score is useful: it shows which foundations to fix first, usually data, processes or tech ownership.' },
    { q: 'Can I share my result?', a: 'Yes. The result page URL contains your answers, so you can send it to a colleague.' },
  ],
};
