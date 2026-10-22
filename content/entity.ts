// Single source of truth for who Fiutran is. Footer, /fiutran-at-a-glance/, JSON-LD and
// llms.txt all read from here, so the entity is described identically everywhere.
// `null` = fact not yet supplied. It renders as a visible [PLACEHOLDER] chip and is
// left out of structured data rather than invented.

export type Fact = { value: string | null; placeholder: string };

export const entity = {
  name: 'Fiutran',
  legalName: { value: null, placeholder: 'legal company name' } as Fact,
  // The one sentence. Used verbatim on Home, at-a-glance, footer, schema and llms.txt.
  description:
    'Fiutran is an AI and digital-transformation partner for growing businesses: we learn how the business actually runs, then build and run the systems that move it forward — no hand-off, same team throughout.',
  shortDescription: 'AI and digital-transformation partner; on-demand CTO for growing businesses.',
  category: 'AI and digital-transformation partner',
  notA: 'Fiutran is not an AI consulting firm: it designs, builds and runs working systems instead of handing over advice.',
  founded: { value: null, placeholder: 'founding year' } as Fact,
  founders: { value: null, placeholder: 'founder names and roles' } as Fact,
  address: { value: null, placeholder: 'registered address' } as Fact,
  locationSummary: { value: null, placeholder: 'office locations (city, country)' } as Fact,
  areaServed: { value: null, placeholder: 'markets served (India / Germany / both)' } as Fact,
  email: { value: null, placeholder: 'contact email' } as Fact,
  phone: { value: null, placeholder: 'contact phone' } as Fact,
  socials: [
    { network: 'LinkedIn', url: null as string | null, placeholder: 'LinkedIn company URL' },
    { network: 'GitHub', url: null as string | null, placeholder: 'GitHub organisation URL' },
    { network: 'YouTube', url: null as string | null, placeholder: 'YouTube channel URL' },
    { network: 'Instagram', url: null as string | null, placeholder: 'Instagram URL' },
  ],
  products: [
    {
      name: 'Fiunify',
      path: '/products/fiunify/',
      description: 'Fiutran’s own product: AI for social relationships and connection.',
      url: { value: null, placeholder: 'Fiunify website URL' } as Fact,
    },
  ],
  community: {
    name: 'Learn & Build Tech Frankfurt',
    path: '/community/',
    description: 'Hands-on monthly AI sessions in Frankfurt, run by Fiutran.',
  },
  contrast: [
    ['Consultant', 'Partner'],
    ['Advice', 'Ownership'],
    ['Deck', 'Working system'],
    ['Hand-off', 'We stay and run it'],
  ] as [string, string][],
};

// Sitewide placeholders (header, footer). Listed on /map under "Sitewide".
export const sitewidePlaceholders = [
  entity.email.placeholder,
  entity.locationSummary.placeholder,
  ...entity.socials.map((s) => s.placeholder),
];
