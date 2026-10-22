import { ContentPage } from '@/components/ContentPage';
import { PageCards } from '@/components/PageCards';
import { compareHub } from '@/content/compare';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/compare/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const items = children(PATH);
  return <ContentPage path={PATH} content={compareHub} schema={{ itemList: items }} slots={{ grid: <PageCards pages={items} text={(p) => p.metaDescription} /> }} />;
}
