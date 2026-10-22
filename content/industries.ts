import type { FAQ, PageContent } from './types';

export type Industry = {
  slug: string;
  name: string;
  short: string;
  answer: string; // 40–60 words
  challenges: string[];
  useCases: { title: string; text: string; service: string }[];
  faq: FAQ[];
};

export const industries: Industry[] = [
  {
    slug: 'manufacturing-and-trading',
    name: 'Manufacturing and trading',
    short: 'Quoting, order handling, inventory visibility and sales agents for B2B manufacturers and traders.',
    answer:
      'AI helps manufacturing and trading businesses answer enquiries faster, prepare quotes from price lists and stock, keep inventory visible across locations and cut manual order entry. Fiutran builds these as working systems connected to your ERP, spreadsheets and WhatsApp, and runs them with your sales and operations teams.',
    challenges: [
      'Enquiries arrive on WhatsApp, email and phone and replies are slow',
      'Quotes depend on a few people who know the price list',
      'Stock and order status live in spreadsheets',
      'Repeat orders are re-typed into the system by hand',
    ],
    useCases: [
      { title: 'WhatsApp sales agent', text: 'Answers product questions, qualifies leads and drafts quotes.', service: '/services/ai-agents-and-automation/' },
      { title: 'Inventory and order visibility', text: 'One live view of stock, orders and dispatch.', service: '/services/data-foundations/' },
      { title: 'Customer and dealer portal', text: 'Self-service ordering, documents and order tracking.', service: '/services/custom-software-and-platforms/' },
    ],
    faq: [
      { q: 'Can AI work with our existing ERP?', a: 'Usually yes. We connect to what you have, and use spreadsheets or exports where no API exists.' },
      { q: 'Will an AI agent give wrong prices?', a: 'Not if it is designed properly: prices come from your data, and anything unusual is routed to a person.' },
      { q: 'Where should a trading business start with AI?', a: 'Most start with enquiry handling, because the payback is visible in weeks. The [[/ai-readiness-check/|AI readiness check]] helps decide.' },
      { q: 'Do you work with small manufacturers?', a: 'Yes. Our model is built for growing businesses without a large in-house tech team.' },
    ],
  },
  {
    slug: 'health-and-fitness',
    name: 'Health and fitness',
    short: 'Member apps, booking and retention automation and data foundations for gyms, studios, clinics and fitness brands.',
    answer:
      'AI helps health and fitness businesses keep members longer, fill classes and appointments, answer questions instantly and understand which programmes work. Fiutran builds member apps, booking and retention automation and the data foundations behind them, and can act as your CTO on demand while you grow.',
    challenges: [
      'Members churn quietly and nobody notices in time',
      'Booking, payments and communication live in separate tools',
      'Front-desk staff answer the same questions all day',
      'No clear view of which programmes and coaches perform',
    ],
    useCases: [
      { title: 'Retention signals and nudges', text: 'Spot drop-off early and follow up automatically.', service: '/services/ai-agents-and-automation/' },
      { title: 'Member app or platform', text: 'Booking, programmes and progress in one place.', service: '/services/custom-software-and-platforms/' },
      { title: 'Technical leadership', text: 'A CTO on demand for a growing fitness brand.', service: '/cto-on-demand/' },
    ],
    faq: [
      { q: 'Is member health data safe?', a: 'Systems are designed with data protection in mind from the start, and sensitive data stays in accounts you control.' },
      { q: 'Can you integrate with our booking software?', a: 'In most cases. We connect to existing tools before suggesting replacements.' },
      { q: 'Do we need our own app?', a: 'Not always. Sometimes better automation on existing tools gives more return than a new app.' },
      { q: 'Can Fiutran be our tech team?', a: 'Yes. Many growing businesses use our [[/cto-on-demand/|CTO on demand]] model for exactly that.' },
    ],
  },
  {
    slug: 'retail-and-d2c',
    name: 'Retail and D2C',
    short: 'Customer agents, demand and inventory data, personalisation and GEO-ready storefront content.',
    answer:
      'AI helps retail and D2C brands answer customers instantly, forecast demand, keep stock where it sells, personalise offers and get products recommended by AI shopping assistants. Fiutran builds the data foundations first, then the agents and content on top, and runs them with your team.',
    challenges: [
      'Customer questions pile up across channels',
      'Stock-outs and overstock from guesswork forecasts',
      'Sales, marketing and inventory data that never meet',
      'Product pages invisible to AI shopping answers',
    ],
    useCases: [
      { title: 'Customer service agent', text: 'Order status, returns and product questions answered 24/7.', service: '/services/ai-agents-and-automation/' },
      { title: 'Demand and inventory data', text: 'One view of sales and stock to plan buying.', service: '/services/data-foundations/' },
      { title: 'GEO-ready storefront', text: 'Product content structured to be cited by AI search.', service: '/services/geo-websites/' },
    ],
    faq: [
      { q: 'Can AI help with demand forecasting for a small brand?', a: 'Yes, once sales and stock data are clean and connected. That is usually the first step.' },
      { q: 'Will a customer agent replace our support team?', a: 'It handles repetitive questions so your team can focus on the conversations that need a person.' },
      { q: 'What is a GEO-ready storefront?', a: 'Product and category content structured so AI assistants can understand and recommend it. See [[/insights/geo-vs-seo/|GEO vs SEO]].' },
      { q: 'Which platforms do you work with?', a: 'Common e-commerce platforms and marketplaces; we confirm fit during the first call.' },
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional services',
    short: 'Knowledge assistants, document automation and client portals for consulting, legal, accounting and agency firms.',
    answer:
      'Professional-services firms use AI safely by keeping client data in their own controlled environment, starting with internal tasks such as drafting, research and document handling, and keeping a person accountable for every client-facing output. Fiutran builds these assistants and portals and trains teams to use them.',
    challenges: [
      'Senior time lost to drafting and document admin',
      'Firm knowledge scattered across files and inboxes',
      'Uncertainty about client confidentiality and AI tools',
      'Clients expecting faster, more digital service',
    ],
    useCases: [
      { title: 'Internal knowledge assistant', text: 'Answers grounded in your own documents and precedents.', service: '/services/ai-agents-and-automation/' },
      { title: 'Team AI adoption', text: 'Role-based training and safe-use policies.', service: '/services/ai-adoption-and-upskilling/' },
      { title: 'Client portal', text: 'Documents, status and requests in one secure place.', service: '/services/custom-software-and-platforms/' },
    ],
    faq: [
      { q: 'Is it safe to use AI with client documents?', a: 'It can be, with the right set-up: controlled environments, access rules and no training on your data.' },
      { q: 'Where should a firm start?', a: 'Internal drafting and knowledge search, where a professional still reviews every output.' },
      { q: 'Will AI replace junior staff?', a: 'It changes their work: less admin, more review and client time. Training is part of the rollout.' },
      { q: 'Do you build client-facing tools too?', a: 'Yes, typically after internal use has proven the approach.' },
    ],
  },
];

export function getIndustry(slug: string): Industry {
  const i = industries.find((x) => x.slug === slug);
  if (!i) throw new Error(`Unknown industry ${slug}`);
  return i;
}

export const industriesHub: PageContent = {
  answer:
    'Fiutran works with growing businesses in four industries: manufacturing and trading, health and fitness, retail and D2C, and professional services. The method is the same everywhere: learn how the business actually runs, then design, build and run the systems that move it forward, using patterns proven in that industry.',
  blocks: [
    {
      kind: 'slot',
      name: 'grid',
      heading: 'Which industry are you in?',
      bp: { purpose: 'Route visitors to their industry page', intent: 'AI for my industry', lenses: ['SEO', 'GSEO'], schema: 'ItemList' },
    },
    {
      kind: 'prose',
      heading: 'What if my industry is not listed?',
      draft: true,
      paras: [
        'The method does not depend on the industry. If your business has processes, data and customers, we can usually help. [[/contact/|Book a call]] and we will tell you honestly whether we are a fit.',
      ],
      bp: { purpose: 'Catch visitors from unlisted industries', intent: 'Do you work with my industry?', lenses: ['AEO'], cta: 'Book a call' },
    },
  ],
  faq: [
    { q: 'Why these four industries?', a: 'They share a pattern Fiutran knows well: growing businesses with real operations and little in-house tech leadership.' },
    { q: 'Do you need industry experience to help?', a: 'It helps with speed, but understanding your specific business matters more, which is why we always start there.' },
    { q: 'Can I see work in my industry?', a: 'See [[/work/|our work]] and filter by industry.' },
    { q: 'Do industry pages change the price?', a: 'No. Pricing depends on scope, explained on [[/engagement-models/|engagement models]].' },
  ],
};
