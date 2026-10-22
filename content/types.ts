// Shared content types. Components render these; content files only contain data.

export type Lens = 'SEO' | 'AEO' | 'GEO' | 'GSEO';
export type Owner = 'Aarti' | 'Diksha';
export type Status = 'skeleton' | 'draft' | 'final';

export type PageType =
  | 'home'
  | 'hub'
  | 'method'
  | 'offer'
  | 'service'
  | 'industry'
  | 'case-study'
  | 'product'
  | 'comparison'
  | 'pricing'
  | 'tool'
  | 'insight'
  | 'glossary'
  | 'about'
  | 'person'
  | 'community'
  | 'careers'
  | 'entity'
  | 'faq'
  | 'contact'
  | 'thank-you'
  | 'legal'
  | 'error'
  | 'internal';

export type SchemaType =
  | 'Organization'
  | 'ProfessionalService'
  | 'WebSite'
  | 'WebPage'
  | 'BreadcrumbList'
  | 'Service'
  | 'FAQPage'
  | 'Article'
  | 'Person'
  | 'SoftwareApplication'
  | 'Event'
  | 'ItemList'
  | 'DefinedTermSet'
  | 'CollectionPage'
  | 'AboutPage'
  | 'ContactPage';

export type PageEntry = {
  path: string;
  title: string; // ≤ 60 chars, used as-is (no template suffix)
  metaDescription: string; // ≤ 155 chars
  h1: string;
  pageType: PageType;
  primaryQuery: string; // the search / AI question this page exists to answer
  lenses: Lens[];
  schemaTypes: SchemaType[]; // declared; the audit checks these are actually emitted
  parent: string | null;
  journeyTags: JourneyTag[];
  contentOwner: Owner;
  status: Status;
  placeholdersNeeded: string[]; // every [PLACEHOLDER] chip on the page; the audit checks the match
  // Optional relationships / flags
  label?: string; // short label for nav, breadcrumbs, cards
  related?: string[]; // extra internal links shown in "Related"
  navOrder?: number; // position in the header nav
  updated: string; // ISO date, feeds sitemap lastmod + "Last updated"
  noindex?: boolean;
};

export type JourneyTag = 'sme-founder' | 'unsure-about-ai' | 'ops-head' | 'ai-search';

// Blueprint annotation for one section.
export type BP = {
  purpose: string;
  intent?: string;
  lenses: Lens[];
  cta?: string;
  schema?: SchemaType;
};

export type FAQ = { q: string; a: string };
export type Link = { label: string; href: string };
export type Card = { title: string; text: string; href?: string; linkLabel?: string; meta?: string };

type Base = { id?: string; heading?: string; intro?: string; draft?: boolean; bp: BP };

export type Block =
  | (Base & { kind: 'prose'; paras: string[] })
  | (Base & { kind: 'list'; items: string[]; ordered?: boolean })
  | (Base & { kind: 'steps'; steps: { title: string; text: string; href?: string }[] })
  | (Base & { kind: 'table'; caption: string; columns: string[]; rows: string[][]; rowHeader?: boolean })
  | (Base & { kind: 'cards'; cards: Card[]; cols?: 2 | 3 | 4 })
  | (Base & { kind: 'metrics'; tiles: { value: string; label: string }[] })
  | (Base & { kind: 'image'; label: string })
  | (Base & { kind: 'quote'; quote: string; cite: string })
  | (Base & { kind: 'facts'; rows: [string, string][] })
  | (Base & { kind: 'links'; links: Link[] })
  | (Base & { kind: 'slot'; name: string });

export type CTA = { heading: string; text: string; primary: Link; secondary?: Link };

export type PageContent = {
  answer: string; // 40–60 words, direct answer to primaryQuery
  heroImage?: string; // label for the grey image slot
  blocks: Block[];
  faq: FAQ[];
  cta?: CTA;
};
