'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type WorkItem = { slug: string; title: string; summary: string; industry: string; services: string[] };
type Opt = { value: string; label: string };

// Case-study filters. The full list is server-rendered (crawlable); filtering is client-side
// and mirrored to ?service=&industry= so a filtered view can be shared.
export function WorkFilters({ items, services, industries }: { items: WorkItem[]; services: Opt[]; industries: Opt[] }) {
  const [service, setService] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setService(q.get('service') ?? '');
    setIndustry(q.get('industry') ?? '');
  }, []);

  const update = (s: string, i: string) => {
    setService(s);
    setIndustry(i);
    const url = new URL(window.location.href);
    s ? url.searchParams.set('service', s) : url.searchParams.delete('service');
    i ? url.searchParams.set('industry', i) : url.searchParams.delete('industry');
    window.history.replaceState(window.history.state, '', url.href);
  };

  const shown = items.filter((c) => (!service || c.services.includes(service)) && (!industry || c.industry === industry));
  const name = (opts: Opt[], v: string) => opts.find((o) => o.value === v)?.label ?? v;

  const Group = ({ label, opts, value, onPick }: { label: string; opts: Opt[]; value: string; onPick: (v: string) => void }) => (
    <fieldset className="mb-4">
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="chip" aria-pressed={!value} onClick={() => onPick('')}>
          All
        </button>
        {opts.map((o) => (
          <button key={o.value} type="button" className="chip" aria-pressed={value === o.value} onClick={() => onPick(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div>
      <Group label="Filter by service" opts={services} value={service} onPick={(v) => update(v, industry)} />
      <Group label="Filter by industry" opts={industries} value={industry} onPick={(v) => update(service, v)} />
      <p className="mb-4 text-sm text-g-600" aria-live="polite" data-testid="work-count">
        Showing {shown.length} of {items.length} case studies
        {service && ` · service: ${name(services, service)}`}
        {industry && ` · industry: ${name(industries, industry)}`}
      </p>
      <ul className="grid gap-4 md:grid-cols-3">
        {shown.map((c) => (
          <li key={c.slug} className="card" data-work-item={c.slug}>
            <p className="card-meta">Sample · {name(industries, c.industry)}</p>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm">{c.summary}</p>
            <p className="text-xs text-g-600">{c.services.map((s) => name(services, s)).join(' · ')}</p>
            <Link href={`/work/${c.slug}/`} className="card-cta">
              Case study: {c.title} →
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && (
        <p className="card">
          No case studies match these filters yet.{' '}
          <button type="button" className="underline" onClick={() => update('', '')}>
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
