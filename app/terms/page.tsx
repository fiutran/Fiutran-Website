import { ContentPage } from '@/components/ContentPage';
import { legal } from '@/content/utility';
import { buildMetadata } from '@/lib/seo';

const PATH = '/terms/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={legal['terms']} wrap="div" />;
}
