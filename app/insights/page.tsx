import { ContentPage } from '@/components/ContentPage';
import { PageCards } from '@/components/PageCards';
import { insightsHub } from '@/content/company';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/insights/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const items = children(PATH);
  return (
    <ContentPage
      path={PATH}
      content={insightsHub}
      schema={{ itemList: items }}
      slots={{ articles: <PageCards pages={items} text={(p) => p.metaDescription} cta={(p) => `Read: ${p.h1}`} /> }}
    />
  );
}
