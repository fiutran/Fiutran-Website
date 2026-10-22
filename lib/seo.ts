import type { Metadata } from 'next';
import { getPage } from './registry';
import { absoluteUrl, hreflangAlternates, site } from '@/site.config';
import { entity } from '@/content/entity';

// Next.js metadata for a registry page: title, description, canonical, robots, OG, Twitter.
export function buildMetadata(path: string): Metadata {
  const p = getPage(path);
  const canonicalPath = p.pageType === 'error' ? '/404/' : p.path;
  const url = absoluteUrl(canonicalPath);
  const isArticle = p.pageType === 'insight' || p.pageType === 'case-study' || p.pageType === 'comparison';
  return {
    metadataBase: new URL(site.url),
    title: { absolute: p.title },
    description: p.metaDescription,
    alternates: { canonical: url, languages: hreflangAlternates(p.path) },
    robots: p.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: isArticle ? 'article' : 'website',
      url,
      title: p.title,
      description: p.metaDescription,
      siteName: entity.name,
      locale: 'en',
      ...(isArticle ? { modifiedTime: p.updated } : {}),
    },
    twitter: { card: 'summary', title: p.title, description: p.metaDescription },
    other: { 'last-modified': p.updated },
  };
}
