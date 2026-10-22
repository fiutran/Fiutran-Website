import type { MetadataRoute } from 'next';
import { indexable } from '@/lib/registry';
import { absoluteUrl, hreflangAlternates } from '@/site.config';

// sitemap.xml from the registry: every indexable page, lastmod = registry `updated`.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable().map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: p.updated,
    changeFrequency: p.pageType === 'insight' || p.pageType === 'hub' ? 'weekly' : 'monthly',
    priority: p.path === '/' ? 1 : p.parent === '/' ? 0.8 : 0.6,
    ...(hreflangAlternates(p.path) ? { alternates: { languages: hreflangAlternates(p.path) } } : {}),
  }));
}
