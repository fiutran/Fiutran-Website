import { ContentPage } from '@/components/ContentPage';
import { howWeWork } from '@/content/offers';
import { buildMetadata } from '@/lib/seo';
import type { PageEntry } from '@/content/types';
import { getPage } from '@/lib/registry';

const PATH = '/how-we-work/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  // ItemList of the five steps, as anchors on this page
  const steps = ['understand', 'design', 'build', 'run', 'scale'].map(
    (s) => ({ ...getPage(PATH), path: `${PATH}#${s}`, label: s[0].toUpperCase() + s.slice(1) }) as PageEntry,
  );
  return <ContentPage path={PATH} content={howWeWork} schema={{ itemList: steps }} />;
}
