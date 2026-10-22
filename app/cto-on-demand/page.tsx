import { ContentPage } from '@/components/ContentPage';
import { ctoOnDemand } from '@/content/offers';
import { buildMetadata } from '@/lib/seo';

const PATH = '/cto-on-demand/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return (
    <ContentPage
      path={PATH}
      content={ctoOnDemand}
      schema={{ service: { name: 'CTO on demand', serviceType: 'Fractional / on-demand CTO services', description: ctoOnDemand.answer } }}
    />
  );
}
