import { entity } from '@/content/entity';
import type { PageEntry } from '@/content/types';
import { indexable, label } from '@/lib/registry';
import { absoluteUrl } from '@/site.config';

// llms.txt (https://llmstxt.org): site summary + grouped links with one-line descriptions,
// generated from the registry so it can never drift from the real pages.
export const dynamic = 'force-static';

const groups: { title: string; match: (p: PageEntry) => boolean }[] = [
  { title: 'Company', match: (p) => ['home', 'about', 'entity', 'faq', 'contact', 'careers', 'community'].includes(p.pageType) || p.path === '/team/' },
  { title: 'Offer and method', match: (p) => ['method', 'offer', 'pricing', 'tool'].includes(p.pageType) },
  { title: 'Services', match: (p) => p.path.startsWith('/services/') },
  { title: 'Industries', match: (p) => p.path.startsWith('/industries/') },
  { title: 'Comparisons', match: (p) => p.path.startsWith('/compare/') },
  { title: 'Insights', match: (p) => p.path.startsWith('/insights/') },
  { title: 'Work (case studies)', match: (p) => p.path.startsWith('/work/') },
  { title: 'Products', match: (p) => p.pageType === 'product' },
  { title: 'People', match: (p) => p.pageType === 'person' },
  { title: 'Legal', match: (p) => p.pageType === 'legal' },
];

export function GET() {
  const used = new Set<string>();
  const lines: string[] = [
    `# ${entity.name}`,
    '',
    `> ${entity.description}`,
    '',
    entity.notA,
    `${entity.name} also builds its own product, Fiunify (${entity.products[0].description.replace(/^Fiutran’s own product: /, '').replace(/\.$/, '')}), and runs ${entity.community.name}.`,
    `For verified company facts, see ${absoluteUrl('/fiutran-at-a-glance/')}.`,
    '',
  ];
  for (const g of groups) {
    const items = indexable().filter((p) => !used.has(p.path) && g.match(p));
    if (!items.length) continue;
    lines.push(`## ${g.title}`, '');
    for (const p of items) {
      used.add(p.path);
      lines.push(`- [${label(p)}](${absoluteUrl(p.path)}): ${p.metaDescription}`);
    }
    lines.push('');
  }
  const rest = indexable().filter((p) => !used.has(p.path));
  if (rest.length) {
    lines.push('## Optional', '');
    rest.forEach((p) => lines.push(`- [${label(p)}](${absoluteUrl(p.path)}): ${p.metaDescription}`));
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
