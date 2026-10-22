import type { FAQ } from './types';

// Case studies. The three entries below are SAMPLE templates: every client fact is a
// placeholder until a case study is approved for publication (see open decisions on /map).

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  industry: string; // industry slug
  services: string[]; // service slugs
  answer: string; // 40–60 words
  glance: { clientType: string; timeline: string; stack: string };
  challenge: string[];
  whatWeDid: { title: string; text: string }[];
  whatWeBuilt: string[];
  results: { value: string; label: string }[];
  quote: { text: string; cite: string };
  faq: FAQ[];
};

const sampleFaq = (what: string): FAQ[] => [
  { q: 'Is this a real client?', a: 'Not yet. This is a sample entry showing the case-study structure. It will be replaced by an approved, named or anonymised case study.' },
  { q: `How long does a project like ${what} take?`, a: 'Timelines depend on scope. The at-a-glance box will show the real timeline once the case study is approved.' },
  { q: 'Can I talk to a client about their experience?', a: 'Reference calls can be arranged once case studies are approved. Ask during your first call.' },
  { q: 'Could you build something similar for us?', a: 'Very likely. [[/contact/|Book a call]] and describe what you need.' },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sample-ai-sales-agent-trading',
    title: 'WhatsApp sales agent for a trading business',
    summary: 'Sample template: an AI agent that answers enquiries, qualifies leads and drafts quotes on WhatsApp.',
    industry: 'manufacturing-and-trading',
    services: ['ai-agents-and-automation', 'data-foundations'],
    answer:
      'This sample case study shows the structure for a WhatsApp AI sales agent built for a trading business: answering product enquiries, qualifying leads and drafting quotes from live price and stock data, with a person approving every quote. Result: {{ph:client result metric}}. Real figures appear once a case study is approved.',
    glance: { clientType: '{{ph:client type and size}}', timeline: '{{ph:project timeline}}', stack: '{{ph:technology stack}}' },
    challenge: ['{{ph:client challenge in their words}}', 'Draft framing: enquiries arrive on WhatsApp faster than the sales team can answer them, especially outside working hours.'],
    whatWeDid: [
      { title: 'Understand', text: 'Shadowed the sales team and mapped the enquiry-to-quote process.' },
      { title: 'Design', text: 'Defined what the agent may answer, when it hands off, and how quotes are approved.' },
      { title: 'Build', text: 'Connected the agent to the price list and stock data and tested it on past conversations.' },
      { title: 'Run', text: 'Monitored conversations and outcomes and improved answers each month.' },
    ],
    whatWeBuilt: ['WhatsApp sales agent', 'Quote drafting from price list and stock', 'Hand-off to sales team with full context', 'Monitoring dashboard'],
    results: [
      { value: '{{ph:client result metric}}', label: 'Response time' },
      { value: '{{ph:client result metric}}', label: 'Qualified leads per month' },
      { value: '{{ph:client result metric}}', label: 'Hours saved per week' },
    ],
    quote: { text: '{{ph:client quote}}', cite: '{{ph:client name, role, company (approved)}}' },
    faq: sampleFaq('a WhatsApp sales agent'),
  },
  {
    slug: 'sample-cto-on-demand-fitness',
    title: 'CTO on demand for a fitness business',
    summary: 'Sample template: technical leadership and a delivery team for a growing fitness brand.',
    industry: 'health-and-fitness',
    services: ['custom-software-and-platforms', 'ai-adoption-and-upskilling'],
    answer:
      'This sample case study shows the structure for a CTO-on-demand engagement with a growing fitness business: technical leadership, a technology roadmap, a member platform built and run by a Fiutran team, and staff trained to use it. Result: {{ph:client result metric}}. Real figures appear once a case study is approved.',
    glance: { clientType: '{{ph:client type and size}}', timeline: '{{ph:project timeline}}', stack: '{{ph:technology stack}}' },
    challenge: ['{{ph:client challenge in their words}}', 'Draft framing: the business was growing faster than its tools, with no one accountable for technology decisions.'],
    whatWeDid: [
      { title: 'Understand', text: 'Mapped members’ journey and the team’s daily tools.' },
      { title: 'Design', text: 'Set a technology roadmap and vendor decisions with the founders.' },
      { title: 'Build', text: 'Shipped the member platform in increments.' },
      { title: 'Run', text: 'Took ownership of operations, vendors and security.' },
    ],
    whatWeBuilt: ['Technology roadmap and vendor plan', 'Member platform', 'Staff training and playbooks', 'Monthly technology reporting to founders'],
    results: [
      { value: '{{ph:client result metric}}', label: 'Member retention' },
      { value: '{{ph:client result metric}}', label: 'Time to launch' },
      { value: '{{ph:client result metric}}', label: 'Cost vs in-house team' },
    ],
    quote: { text: '{{ph:client quote}}', cite: '{{ph:client name, role, company (approved)}}' },
    faq: sampleFaq('CTO on demand'),
  },
  {
    slug: 'sample-data-foundations-retail',
    title: 'Data foundations for a retail brand',
    summary: 'Sample template: connected sales and stock data, dashboards and a transformation roadmap for a retail brand.',
    industry: 'retail-and-d2c',
    services: ['data-foundations', 'digital-transformation-programs', 'ai-strategy-and-roadmap'],
    answer:
      'This sample case study shows the structure for a data-foundations and transformation program with a retail brand: connecting sales, stock and marketing data, building the dashboards leaders use, and sequencing AI initiatives on top. Result: {{ph:client result metric}}. Real figures appear once a case study is approved.',
    glance: { clientType: '{{ph:client type and size}}', timeline: '{{ph:project timeline}}', stack: '{{ph:technology stack}}' },
    challenge: ['{{ph:client challenge in their words}}', 'Draft framing: every report took days to assemble and nobody trusted the numbers.'],
    whatWeDid: [
      { title: 'Understand', text: 'Audited every data source and how reports were built.' },
      { title: 'Design', text: 'Agreed a single data model and the decisions it must support.' },
      { title: 'Build', text: 'Connected systems and shipped leadership dashboards.' },
      { title: 'Scale', text: 'Sequenced AI use cases on the new foundation.' },
    ],
    whatWeBuilt: ['Data pipelines across core systems', 'Central data warehouse', 'Leadership dashboards', 'AI roadmap on top of the data'],
    results: [
      { value: '{{ph:client result metric}}', label: 'Reporting time' },
      { value: '{{ph:client result metric}}', label: 'Stock accuracy' },
      { value: '{{ph:client result metric}}', label: 'Initiatives launched' },
    ],
    quote: { text: '{{ph:client quote}}', cite: '{{ph:client name, role, company (approved)}}' },
    faq: sampleFaq('a data-foundations program'),
  },
];

export function getCaseStudy(slug: string): CaseStudy {
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown case study ${slug}`);
  return c;
}
