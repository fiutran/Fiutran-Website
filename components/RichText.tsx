import Link from 'next/link';
import type { ReactNode } from 'react';
import { Ph } from './Ph';

// Minimal inline markup for content strings:
//   {{ph:label}}        → visible placeholder chip
//   [[/path/|text]]     → internal link (descriptive text required)
//   **bold**            → strong
const TOKEN = /(\{\{ph:[^}]+\}\}|\[\[[^|\]]+\|[^\]]+\]\]|\*\*[^*]+\*\*)/g;

export function rich(s: string): ReactNode[] {
  return s.split(TOKEN).map((part, i) => {
    let m: RegExpMatchArray | null;
    if ((m = part.match(/^\{\{ph:([^}]+)\}\}$/))) return <Ph key={i} label={m[1]} />;
    if ((m = part.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/)))
      return (
        <Link key={i} href={m[1]}>
          {m[2]}
        </Link>
      );
    if ((m = part.match(/^\*\*([^*]+)\*\*$/))) return <strong key={i}>{m[1]}</strong>;
    return part;
  });
}

export function RichText({ text }: { text: string }) {
  return <>{rich(text)}</>;
}
