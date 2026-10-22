import type { PageContent } from './types';

// One anchor per term: /insights/glossary/#<id>. Emitted as a DefinedTermSet in JSON-LD.
export type Term = { id: string; term: string; definition: string };

export const terms: Term[] = [
  { id: 'aeo', term: 'AEO (answer engine optimisation)', definition: 'Structuring content so answer engines, featured snippets and voice assistants can lift a direct answer. See [[/insights/geo-vs-seo/|GEO vs SEO]].' },
  { id: 'ai-agent', term: 'AI agent', definition: 'Software that uses an AI model to carry out tasks, such as answering, deciding or acting in other systems, within defined rules and guardrails.' },
  { id: 'ai-partner', term: 'AI partner', definition: 'A firm that designs, builds and runs AI systems for a business and stays accountable for the outcome, as opposed to an AI consultant who advises. See [[/compare/ai-partner-vs-ai-consultant/|AI partner vs AI consultant]].' },
  { id: 'answer-block', term: 'Answer block', definition: 'A 40–60 word direct answer placed right under a page heading, written to be quoted by search and AI engines.' },
  { id: 'cto-on-demand', term: 'CTO on demand', definition: 'Senior technical leadership provided for an agreed share of time, at Fiutran combined with a delivery team. See [[/insights/what-is-a-cto-on-demand/|what is a CTO on demand]].' },
  { id: 'data-foundation', term: 'Data foundation', definition: 'The collected, cleaned, connected and owned data a business needs before analytics and AI can work reliably.' },
  { id: 'digital-transformation', term: 'Digital transformation', definition: 'Changing how a business operates by redesigning processes around digital systems, not just buying new software.' },
  { id: 'e-e-a-t', term: 'E-E-A-T', definition: 'Experience, expertise, authoritativeness and trust: the signals Google uses to judge content quality, supported by author pages and sources.' },
  { id: 'fractional-cto', term: 'Fractional CTO', definition: 'An experienced CTO who works part-time for one or more companies, usually as an individual rather than with a team.' },
  { id: 'geo', term: 'GEO (generative engine optimisation)', definition: 'Making content easy for generative AI systems, such as ChatGPT, Claude and Perplexity, to find, trust and cite in their answers.' },
  { id: 'gseo', term: 'GSEO', definition: 'Fiutran’s term for optimising for Google’s generative surfaces (AI Overviews, AI Mode, Gemini) through structured data, freshness and E-E-A-T.' },
  { id: 'guardrails', term: 'Guardrails', definition: 'Rules and checks that limit what an AI system may say or do, including when it must hand over to a person.' },
  { id: 'hallucination', term: 'Hallucination', definition: 'When an AI model states something false with confidence. Grounding answers in your own data reduces it.' },
  { id: 'json-ld', term: 'JSON-LD', definition: 'A format for embedding structured data in a web page so search and AI engines can read facts about it.' },
  { id: 'llm', term: 'LLM (large language model)', definition: 'An AI model trained on large amounts of text that can understand and generate language; the engine inside most AI assistants.' },
  { id: 'llms-txt', term: 'llms.txt', definition: 'A plain-text file at the root of a website that summarises the site and links its key pages for AI systems.' },
  { id: 'rag', term: 'RAG (retrieval-augmented generation)', definition: 'A technique where an AI model first retrieves relevant documents from your own data and then answers based on them.' },
  { id: 'structured-data', term: 'Structured data', definition: 'Machine-readable facts about a page, usually in schema.org vocabulary, that help engines understand and display it.' },
];

export const glossaryPage: PageContent = {
  answer:
    'This glossary explains the AI and digital-transformation terms Fiutran uses with clients, in plain English: from AI agents, LLMs and RAG to GEO, AEO and GSEO, and from data foundations to CTO on demand. Each term has its own anchor, so you can link directly to a single definition.',
  blocks: [
    {
      kind: 'slot',
      name: 'terms',
      heading: 'Terms A–Z',
      bp: { purpose: 'One anchored definition per term', intent: 'What does X mean?', lenses: ['AEO', 'GEO', 'GSEO'], schema: 'DefinedTermSet' },
    },
  ],
  faq: [
    { q: 'Can I link to a single term?', a: 'Yes. Every term has an anchor, for example [[/insights/glossary/#geo|the GEO definition]].' },
    { q: 'How often is the glossary updated?', a: 'Whenever a new term becomes common in client work; the date at the bottom shows the last update.' },
    { q: 'Is GSEO an industry-standard term?', a: 'Not yet. It is Fiutran’s name for optimising for Google’s generative surfaces.' },
    { q: 'Can I suggest a term?', a: 'Yes. [[/contact/|Get in touch]] and tell us which term you would like explained.' },
  ],
};
