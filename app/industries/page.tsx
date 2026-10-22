import { ContentPage } from '@/components/ContentPage';
import { PageCards } from '@/components/PageCards';
import { industries, industriesHub } from '@/content/industries';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/industries/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const items = children(PATH);
  const short = (path: string) => industries.find((s) => `/industries/${s.slug}/` === path)?.short ?? '';
  return (
    <ContentPage
      path={PATH}
      content={industriesHub}
      schema={{ itemList: items }}
      slots={{ grid: <PageCards pages={items} text={(p) => short(p.path)} cols={2} /> }}
    />
  );
}
