import { ContentPage } from '@/components/ContentPage';
import { about } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

const PATH = '/about/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={about} />;
}
