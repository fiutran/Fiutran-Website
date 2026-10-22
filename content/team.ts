import type { FAQ, Owner } from './types';

// Person pages (E-E-A-T). Roles, bios and profile URLs are not supplied yet, so they are
// placeholders. Nothing here is invented.
export type Person = {
  slug: string;
  name: string;
  owner?: Owner;
  role: string | null;
  rolePlaceholder: string;
  bio: string; // rich text; may contain placeholders
  expertise: string[];
  profiles: (string | null)[];
  faq: FAQ[];
};

export const team: Person[] = [
  {
    slug: 'diksha-sharma',
    name: 'Diksha Sharma',
    owner: 'Diksha',
    role: null,
    rolePlaceholder: 'Diksha Sharma role / title',
    bio: '{{ph:Diksha Sharma bio (background, experience, responsibilities at Fiutran)}}',
    expertise: [],
    profiles: [null],
    faq: [
      { q: 'What does Diksha Sharma do at Fiutran?', a: 'Diksha Sharma is part of the Fiutran team. Diksha’s exact role and responsibilities will be confirmed on this page.' },
      { q: 'What does Diksha write about?', a: 'Diksha writes about CTO on demand, AI agent costs and build-versus-buy decisions in the Fiutran insights hub.' },
      { q: 'How can I contact Diksha?', a: 'Book a call through the contact page and mention Diksha. The team will route your request.' },
      { q: 'Where can I find Diksha’s professional profiles?', a: 'Official profile links will be listed on this page once confirmed.' },
    ],
  },
  {
    slug: 'aarti-gupta',
    name: 'Aarti Gupta',
    owner: 'Aarti',
    role: null,
    rolePlaceholder: 'Aarti Gupta role / title',
    bio: '{{ph:Aarti Gupta bio (background, experience, responsibilities at Fiutran)}}',
    expertise: [],
    profiles: [null],
    faq: [
      { q: 'What does Aarti Gupta do at Fiutran?', a: 'Aarti Gupta is part of the Fiutran team. Aarti’s exact role and responsibilities will be confirmed on this page.' },
      { q: 'What does Aarti write about?', a: 'Aarti writes about GEO versus SEO, starting digital transformation and the AI glossary in the Fiutran insights hub.' },
      { q: 'How can I contact Aarti?', a: 'Book a call through the contact page and mention Aarti. The team will route your request.' },
      { q: 'Where can I find Aarti’s professional profiles?', a: 'Official profile links will be listed on this page once confirmed.' },
    ],
  },
  {
    slug: 'team-member',
    name: 'Team member (placeholder)',
    role: null,
    rolePlaceholder: 'third team member name and role',
    bio: '{{ph:third team member bio}}',
    expertise: [],
    profiles: [null],
    faq: [
      { q: 'Who is this team member?', a: 'This is a placeholder page for a third member of the Fiutran team. Name and role will be added once confirmed.' },
      { q: 'What will this page contain?', a: 'A short bio, areas of expertise, experience, articles written and links to official profiles.' },
      { q: 'Why does Fiutran publish person pages?', a: 'Person pages show who is behind the work and the writing, which helps people and search engines trust the content.' },
      { q: 'How can I contact the team?', a: 'Book a call through the contact page and the team will route your request.' },
    ],
  },
];

export function ownerPerson(owner: Owner): Person {
  return team.find((t) => t.owner === owner)!;
}

export function getPerson(slug: string): Person {
  const p = team.find((t) => t.slug === slug);
  if (!p) throw new Error(`Unknown person ${slug}`);
  return p;
}
