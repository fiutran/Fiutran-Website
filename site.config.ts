// Site-wide configuration. Anything that is an open decision is flagged here.

export const site = {
  // OPEN DECISION: final domain. Canonicals, sitemap, llms.txt and JSON-LD all derive from this.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fiutran.com').replace(/\/$/, ''),
  lang: 'en',
  // OPEN DECISION: target markets (India / Germany / both).
  // When enabled, every page emits <link rel="alternate" hreflang> tags and the sitemap
  // emits xhtml:link alternates. Locale-prefixed routes do not exist yet; turning this on
  // is only correct once they do.
  hreflang: {
    enabled: false,
    locales: [
      { code: 'en-IN', prefix: '/en-in' },
      { code: 'en-DE', prefix: '/en-de' },
    ],
  },
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}

export function hreflangAlternates(path: string): Record<string, string> | undefined {
  if (!site.hreflang.enabled) return undefined;
  const out: Record<string, string> = { 'x-default': absoluteUrl(path) };
  for (const l of site.hreflang.locales) out[l.code] = absoluteUrl(`${l.prefix}${path}`);
  return out;
}
