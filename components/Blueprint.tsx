'use client';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// Blueprint mode: the review tool. Every element with a `data-bp` annotation gets a visible
// strip (purpose, intent, lenses, CTA, owner, status). Answer blocks, schema-backed sections
// and internal links are outlined via CSS on `html.blueprint`.
// State lives in the URL (?blueprint=1) so a link can be shared in blueprint mode; it also
// follows you across internal navigation for the rest of the session.

const KEY = 'fiutran-blueprint';

function readInitial(): boolean {
  const q = new URLSearchParams(window.location.search).get('blueprint');
  if (q === '1') return true;
  if (q === '0') return false;
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function syncUrl(on: boolean) {
  const url = new URL(window.location.href);
  if (on) url.searchParams.set('blueprint', '1');
  else url.searchParams.delete('blueprint');
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url.href);
}

function el(tag: string, cls: string, text?: string) {
  const e = document.createElement(tag);
  e.className = cls;
  if (text) e.textContent = text;
  return e;
}

type Ann = { purpose?: string; intent?: string; lenses?: string[]; cta?: string; owner?: string; status?: string; schema?: string };

function strip(a: Ann, title?: string) {
  const s = el('div', 'bp-strip');
  s.setAttribute('aria-hidden', 'true');
  if (title) s.appendChild(el('strong', 'bp-title', title));
  if (a.purpose) s.appendChild(el('span', 'bp-item', `Purpose: ${a.purpose}`));
  if (a.intent) s.appendChild(el('span', 'bp-item', `Query / intent: ${a.intent}`));
  const lenses = el('span', 'bp-item bp-lenses');
  (a.lenses?.length ? a.lenses : ['none']).forEach((l) => lenses.appendChild(el('span', `bp-badge bp-${l.toLowerCase()}`, l)));
  s.appendChild(lenses);
  if (a.schema) s.appendChild(el('span', 'bp-item', `Schema: ${a.schema}`));
  if (a.cta) s.appendChild(el('span', 'bp-item', `CTA: ${a.cta}`));
  s.appendChild(el('span', 'bp-item', `Owner: ${a.owner ?? '?'}`));
  s.appendChild(el('span', `bp-item bp-status bp-status-${a.status}`, `Status: ${a.status ?? '?'}`));
  return s;
}

function annotate() {
  document.querySelectorAll('.bp-strip').forEach((n) => n.remove());
  const page = document.querySelector<HTMLElement>('[data-page]');
  if (page) {
    const p = JSON.parse(page.dataset.page!);
    const s = strip(
      { purpose: `${p.pageType} page`, intent: p.primaryQuery, lenses: p.lenses, owner: p.owner, status: p.status, schema: p.schemaTypes.join(', ') },
      `PAGE ${p.path}`,
    );
    s.classList.add('bp-page');
    page.prepend(s);
  }
  document.querySelectorAll<HTMLElement>('[data-bp]').forEach((n) => {
    try {
      n.prepend(strip(JSON.parse(n.dataset.bp!)));
    } catch {
      /* malformed annotation: skip */
    }
  });
}

export function Blueprint() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => setOn(readInitial()), []);

  useEffect(() => {
    document.documentElement.classList.toggle('blueprint', on);
    try {
      sessionStorage.setItem(KEY, on ? '1' : '0');
    } catch {
      /* storage unavailable */
    }
    syncUrl(on);
    if (on) {
      // let the new route's DOM settle before annotating
      const t = window.setTimeout(annotate, 30);
      return () => window.clearTimeout(t);
    }
    document.querySelectorAll('.bp-strip').forEach((n) => n.remove());
  }, [on, pathname]);

  const toggle = useCallback(() => setOn((v) => !v), []);

  return (
    <button type="button" className="bp-toggle" aria-pressed={on} onClick={toggle}>
      Blueprint: {on ? 'ON' : 'OFF'}
    </button>
  );
}
