import { ContentPage } from '@/components/ContentPage';
import { notFound } from '@/content/utility';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('/404/');

export default function NotFound() {
  return <ContentPage path="/404/" content={notFound} hideByline wrap="div" />;
}
