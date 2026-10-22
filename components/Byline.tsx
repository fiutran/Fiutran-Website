import Link from 'next/link';
import type { PageEntry } from '@/content/types';
import { ownerPerson } from '@/content/team';
import type { Ctx } from './Section';

export function Byline({ page, ctx }: { page: PageEntry; ctx: Ctx }) {
  const person = ownerPerson(page.contentOwner);
  const date = new Date(page.updated + 'T00:00:00Z');
  return (
    <aside
      className="byline"
      aria-label="Author and last updated"
      data-schema="Person"
      data-bp={JSON.stringify({
        purpose: 'Authorship and freshness (E-E-A-T)',
        intent: 'Who wrote this, and is it current?',
        lenses: ['GEO', 'GSEO'],
        schema: 'Person',
        owner: ctx.owner,
        status: ctx.status,
      })}
    >
      <span>
        Written by <Link href={`/team/${person.slug}/`}>{person.name}</Link>
      </span>
      <span aria-hidden="true"> · </span>
      <span>
        Last updated{' '}
        <time dateTime={page.updated}>
          {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
        </time>
      </span>
    </aside>
  );
}
