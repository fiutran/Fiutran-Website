import fs from 'node:fs';
import path from 'node:path';
import { slugify } from './slug';

// Table of contents for an insight article, built from the same `## ` headings the MDX
// renders, with the same slugify, so anchors always match.
export function toc(slug: string): { id: string; text: string }[] {
  const src = fs.readFileSync(path.join(process.cwd(), 'content/insights', `${slug}.mdx`), 'utf8');
  return src
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => l.slice(3).replace(/<[^>]+>/g, '').trim())
    .map((text) => ({ id: slugify(text), text }));
}
