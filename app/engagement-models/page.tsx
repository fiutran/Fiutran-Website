import { ContentPage } from '@/components/ContentPage';
import { engagementModels } from '@/content/offers';
import { buildMetadata } from '@/lib/seo';

const PATH = '/engagement-models/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={engagementModels} />;
}
