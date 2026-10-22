// JSON-LD generator. Fed by the registry (content/pages.ts), the entity (content/entity.ts)
// and the page's own content. Every page gets one @graph with:
//   Organization+ProfessionalService (sitewide) · WebSite · WebPage (or subtype) · BreadcrumbList
// plus page-type nodes: Service, FAQPage, Article, Person, SoftwareApplication, Event,
// ItemList, DefinedTermSet. Unknown facts are omitted, never invented.

import { entity } from '@/content/entity';
import type { FAQ, PageEntry, SchemaType } from '@/content/types';
import { absoluteUrl, site } from '@/site.config';
import { breadcrumbs, getPage, label } from './registry';
import { ownerPerson, type Person } from '@/content/team';

type Node = Record<string, unknown>;

export const ids = {
  org: absoluteUrl('/#organization'),
  website: absoluteUrl('/#website'),
  page: (path: string) => absoluteUrl(`${path}#webpage`),
  person: (slug: string) => absoluteUrl(`/team/${slug}/#person`),
};

const known = (v: string | null | undefined) => (v ? v : undefined);

export function organizationNode(): Node {
  const sameAs = entity.socials.map((s) => s.url).filter(Boolean);
  return clean({
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ids.org,
    name: entity.name,
    legalName: known(entity.legalName.value),
    url: absoluteUrl('/'),
    description: entity.description,
    slogan: 'Consultant → Partner. Advice → Ownership. Deck → Working system.',
    foundingDate: known(entity.founded.value),
    email: known(entity.email.value),
    telephone: known(entity.phone.value),
    address: known(entity.address.value),
    areaServed: known(entity.areaServed.value),
    knowsAbout: [
      'Artificial intelligence',
      'AI agents',
      'Digital transformation',
      'Fractional CTO services',
      'Custom software development',
      'Data engineering',
      'Generative engine optimisation',
    ],
    // sameAs: official profiles. Filled from content/entity.ts socials once URLs exist.
    sameAs,
    owns: entity.products.map((p) => ({ '@id': absoluteUrl(`${p.path}#product`) })),
  });
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: absoluteUrl('/'),
    name: entity.name,
    description: entity.description,
    inLanguage: site.lang,
    publisher: { '@id': ids.org },
  };
}

export function personRef(person: Person): Node {
  return { '@type': 'Person', '@id': ids.person(person.slug), name: person.name, url: absoluteUrl(`/team/${person.slug}/`) };
}

function webPageType(p: PageEntry): string {
  for (const t of ['CollectionPage', 'AboutPage', 'ContactPage'] as const) if (p.schemaTypes.includes(t)) return t;
  return 'WebPage';
}

export type SchemaExtras = {
  faq?: FAQ[];
  service?: { name: string; description: string; serviceType: string };
  article?: { headline: string; description: string; articleSection?: string };
  person?: Person;
  software?: { name: string; description: string; url?: string };
  event?: { name: string; description: string; startDate?: string; location: string };
  itemList?: PageEntry[];
  definedTerms?: { term: string; definition: string; id: string }[];
};

export function pageGraph(path: string, x: SchemaExtras = {}): Node {
  const p = getPage(path);
  const url = absoluteUrl(p.path);
  const author = ownerPerson(p.contentOwner);
  const graph: Node[] = [organizationNode(), websiteNode()];

  graph.push({
    '@type': webPageType(p),
    '@id': ids.page(p.path),
    url,
    name: p.title,
    headline: p.h1,
    description: p.metaDescription,
    inLanguage: site.lang,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.org },
    dateModified: p.updated,
    author: personRef(author),
    breadcrumb: { '@id': `${url}#breadcrumb` },
    // Speakable: the answer block is what voice assistants and AI answers should lift.
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#answer'] },
  });

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs(p.path).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label(b),
      item: absoluteUrl(b.path),
    })),
  });

  if (x.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: x.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: stripMarkup(f.a) },
      })),
    });
  }

  if (x.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: x.service.name,
      serviceType: x.service.serviceType,
      description: stripMarkup(x.service.description),
      provider: { '@id': ids.org },
      url,
    });
  }

  if (x.article) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: x.article.headline,
      description: x.article.description,
      articleSection: x.article.articleSection,
      author: personRef(author),
      publisher: { '@id': ids.org },
      dateModified: p.updated,
      mainEntityOfPage: { '@id': ids.page(p.path) },
      inLanguage: site.lang,
    });
  }

  if (x.person) {
    graph.push(
      clean({
        '@type': 'Person',
        '@id': ids.person(x.person.slug),
        name: x.person.name,
        url,
        jobTitle: known(x.person.role),
        worksFor: { '@id': ids.org },
        knowsAbout: x.person.expertise,
        sameAs: x.person.profiles.filter(Boolean),
      }),
    );
  }

  if (x.software) {
    graph.push(
      clean({
        '@type': 'SoftwareApplication',
        '@id': `${url}#product`,
        name: x.software.name,
        description: x.software.description,
        applicationCategory: 'SocialNetworkingApplication',
        url: known(x.software.url),
        publisher: { '@id': ids.org },
        creator: { '@id': ids.org },
      }),
    );
  }

  if (x.event) {
    graph.push(
      clean({
        '@type': 'Event',
        '@id': `${url}#event`,
        name: x.event.name,
        description: x.event.description,
        startDate: known(x.event.startDate), // added once the next session date is confirmed
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventSchedule: { '@type': 'Schedule', repeatFrequency: 'P1M' },
        location: { '@type': 'Place', name: x.event.location, address: x.event.location },
        organizer: { '@id': ids.org },
      }),
    );
  }

  if (x.itemList?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#list`,
      itemListElement: x.itemList.map((q, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: label(q),
        url: absoluteUrl(q.path),
      })),
    });
  }

  if (x.definedTerms?.length) {
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': `${url}#terms`,
      name: p.h1,
      hasDefinedTerm: x.definedTerms.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${url}#${t.id}`,
        name: t.term,
        description: stripMarkup(t.definition),
        url: `${url}#${t.id}`,
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// Types actually emitted in a graph (used by the audit via data attributes, and in Blueprint).
export function emittedTypes(graph: Node): SchemaType[] {
  const out = new Set<string>();
  for (const n of graph['@graph'] as Node[]) {
    const t = n['@type'];
    (Array.isArray(t) ? t : [t]).forEach((x) => out.add(String(x)));
  }
  return [...out] as SchemaType[];
}

// Remove rich-text markup used in content strings ({{ph:...}}, [[/path|text]], **bold**).
export function stripMarkup(s: string): string {
  return s
    .replace(/\{\{ph:([^}]+)\}\}/g, '[to be confirmed]')
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

function clean(n: Node): Node {
  return Object.fromEntries(
    Object.entries(n).filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)),
  );
}
