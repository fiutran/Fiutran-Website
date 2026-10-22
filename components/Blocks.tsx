import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Block } from '@/content/types';
import { ImageSlot } from './ImageSlot';
import { rich } from './RichText';
import { Section, type Ctx } from './Section';
import { slugify } from '@/lib/slug';

const colsClass = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' } as const;

export function Blocks({ blocks, ctx, slots = {} }: { blocks: Block[]; ctx: Ctx; slots?: Record<string, ReactNode> }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={b.id ?? `${b.kind}-${i}`} b={b} ctx={ctx} slots={slots} />
      ))}
    </>
  );
}

function BlockView({ b, ctx, slots }: { b: Block; ctx: Ctx; slots: Record<string, ReactNode> }) {
  const id = b.id ?? (b.heading ? slugify(b.heading) : undefined);
  const common = { bp: b.bp, ctx, id, heading: b.heading, intro: b.intro ? rich(b.intro) : undefined, draft: b.draft };
  switch (b.kind) {
    case 'prose':
      return (
        <Section {...common}>
          <div className="prose-wf">
            {b.paras.map((p, i) => (
              <p key={i}>{rich(p)}</p>
            ))}
          </div>
        </Section>
      );
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul';
      return (
        <Section {...common}>
          <L className={b.ordered ? 'list-ol' : 'list-ul'}>
            {b.items.map((it, i) => (
              <li key={i}>{rich(it)}</li>
            ))}
          </L>
        </Section>
      );
    }
    case 'steps':
      return (
        <Section {...common}>
          <ol className="steps">
            {b.steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="font-semibold">{s.href ? <Link href={s.href}>{s.title}</Link> : s.title}</h3>
                <p className="text-sm">{rich(s.text)}</p>
              </li>
            ))}
          </ol>
        </Section>
      );
    case 'table':
      return (
        <Section {...common}>
          <div className="table-wrap" tabIndex={0} role="region" aria-label={b.caption}>
            <table className="wf-table">
              <caption>{b.caption}</caption>
              <thead>
                <tr>
                  {b.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((cell, j) =>
                      j === 0 && b.rowHeader !== false ? (
                        <th key={j} scope="row">
                          {rich(cell)}
                        </th>
                      ) : (
                        <td key={j}>{rich(cell)}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      );
    case 'cards':
      return (
        <Section {...common}>
          <ul className={`grid gap-4 ${colsClass[b.cols ?? 3]}`}>
            {b.cards.map((c) => (
              <li key={c.title} className="card">
                {c.meta && <p className="card-meta">{rich(c.meta)}</p>}
                <h3 className="font-semibold">{rich(c.title)}</h3>
                <p className="text-sm">{rich(c.text)}</p>
                {c.href && (
                  <Link href={c.href} className="card-cta">
                    {c.linkLabel ?? c.title} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Section>
      );
    case 'metrics':
      return (
        <Section {...common}>
          <ul className="grid gap-4 sm:grid-cols-3">
            {b.tiles.map((t) => (
              <li key={t.label} className="metric">
                <span className="metric-v">{rich(t.value)}</span>
                <span className="metric-l">{rich(t.label)}</span>
              </li>
            ))}
          </ul>
        </Section>
      );
    case 'image':
      return (
        <Section {...common}>
          <ImageSlot label={b.label} />
        </Section>
      );
    case 'quote':
      return (
        <Section {...common}>
          <figure className="quote">
            <blockquote>{rich(b.quote)}</blockquote>
            <figcaption>{rich(b.cite)}</figcaption>
          </figure>
        </Section>
      );
    case 'facts':
      return (
        <Section {...common}>
          <dl className="facts">
            {b.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{rich(v)}</dd>
              </div>
            ))}
          </dl>
        </Section>
      );
    case 'links':
      return (
        <Section {...common}>
          <ul className="list-ul">
            {b.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </Section>
      );
    case 'slot':
      return <Section {...common}>{slots[b.name]}</Section>;
  }
}
