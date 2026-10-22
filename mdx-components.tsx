import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/slug';
import { Ph } from '@/components/Ph';
import { Draft } from '@/components/Draft';

function text(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(text).join('');
  return '';
}

// Insight article bodies (MDX) render through these, so H2s get stable anchor ids
// that the table of contents (built from the same headings) can link to.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 id={slugify(text(children))} className="scroll-mt-24">
        {children}
      </h2>
    ),
    a: ({ href = '', children }) => (href.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>),
    table: ({ children }) => (
      <div className="table-wrap">
        <table className="wf-table">{children}</table>
      </div>
    ),
    Ph,
    Draft,
    ...components,
  };
}
