import type { ReactNode } from 'react';
import type { BP, Owner, Status } from '@/content/types';
import { Draft } from './Draft';

export type Ctx = { owner: Owner; status: Status };

// Every page section goes through this wrapper. It carries the Blueprint annotation as a
// data attribute (not visible content, so crawlers never index it); the Blueprint toggle
// turns it into a visible strip.
export function Section({
  bp,
  ctx,
  id,
  heading,
  intro,
  draft,
  children,
  className = '',
  as: Tag = 'section',
  headingLevel = 2,
}: {
  bp: BP;
  ctx: Ctx;
  id?: string;
  heading?: string;
  intro?: ReactNode;
  draft?: boolean;
  children?: ReactNode;
  className?: string;
  as?: 'section' | 'aside' | 'div' | 'nav';
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Tag
      id={id}
      className={`wf-section ${className}`}
      data-bp={JSON.stringify({ ...bp, owner: ctx.owner, status: ctx.status })}
      data-schema={bp.schema}
    >
      {heading && (
        <H className="wf-h2">
          {heading}
          {draft && <Draft />}
        </H>
      )}
      {!heading && draft && <Draft />}
      {intro && <p className="wf-intro">{intro}</p>}
      {children}
    </Tag>
  );
}
