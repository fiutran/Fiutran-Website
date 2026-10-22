import { ContentPage } from '@/components/ContentPage';
import { PageCards } from '@/components/PageCards';
import { servicesHub, services } from '@/content/services';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/services/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const items = children(PATH);
  const short = (path: string) => services.find((s) => `/services/${s.slug}/` === path)?.short ?? '';
  return (
    <ContentPage
      path={PATH}
      content={servicesHub}
      schema={{ itemList: items }}
      slots={{ grid: <PageCards pages={items} text={(p) => short(p.path)} cols={3} /> }}
    />
  );
}
