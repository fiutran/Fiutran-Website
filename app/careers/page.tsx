import { ContentPage } from '@/components/ContentPage';
import { careers } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

const PATH = '/careers/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={careers} />;
}
