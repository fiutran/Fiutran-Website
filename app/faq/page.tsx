import { ContentPage } from '@/components/ContentPage';
import { faqPage } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

const PATH = '/faq/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={faqPage} />;
}
