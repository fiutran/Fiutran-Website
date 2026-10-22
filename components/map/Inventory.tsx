'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export type Row = { path: string; primaryQuery: string; lenses: string; schemaTypes: string; owner: string; status: string; pageType: string };
type Counts = Record<string, { in: number; out: number }>;
type Key = keyof Row | 'in' | 'out';

// Sortable page inventory. Inbound/outbound link counts come from /link-graph.json, which
// `npm run build` generates by crawling the exported HTML (scripts/link-graph.mjs).
export function Inventory({ rows }: { rows: Row[] }) {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: 'path', dir: 1 });
  const [counts, setCounts] = useState<Counts | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch('/link-graph.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setCounts(j.pages))
      .catch(() => setMissing(true));
  }, []);

  const sorted = useMemo(() => {
    const val = (r: Row, k: Key): string | number => (k === 'in' || k === 'out' ? counts?.[r.path]?.[k] ?? -1 : r[k]);
    return [...rows].sort((a, b) => {
      const x = val(a, sort.key);
      const y = val(b, sort.key);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [rows, sort, counts]);

  const cols: [Key, string][] = [
    ['path', 'Path'],
    ['primaryQuery', 'Primary query'],
    ['lenses', 'Lenses'],
    ['schemaTypes', 'Schema types'],
    ['owner', 'Owner'],
    ['status', 'Status'],
    ['in', 'Inbound'],
    ['out', 'Outbound'],
  ];

  return (
    <div>
      {missing && <p className="mb-2 text-sm text-g-600">Link counts appear after `npm run build` (they are computed from the exported HTML).</p>}
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Page inventory">
        <table className="wf-table" data-testid="inventory">
          <caption>Page inventory: {rows.length} pages. Click a column heading to sort.</caption>
          <thead>
            <tr>
              {cols.map(([k, l]) => (
                <th key={k} scope="col" aria-sort={sort.key === k ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
                  <button type="button" className="font-semibold underline" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? ((s.dir * -1) as 1 | -1) : 1 }))}>
                    {l}
                    {sort.key === k ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.path}>
                <th scope="row">
                  {r.path === '/404/' ? <a href="/404/">{r.path}</a> : <Link href={r.path}>{r.path}</Link>}
                </th>
                <td>{r.primaryQuery}</td>
                <td>{r.lenses || '–'}</td>
                <td>{r.schemaTypes}</td>
                <td>{r.owner}</td>
                <td>
                  <span className={`bp-badge bp-status-${r.status}`}>{r.status}</span>
                </td>
                <td>{counts ? counts[r.path]?.in ?? '–' : '…'}</td>
                <td>{counts ? counts[r.path]?.out ?? '–' : '…'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
