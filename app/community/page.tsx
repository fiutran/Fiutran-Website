import { ContentPage } from '@/components/ContentPage';
import { community } from '@/content/company';
import { entity } from '@/content/entity';
import { buildMetadata } from '@/lib/seo';

const PATH = '/community/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return (
    <ContentPage
      path={PATH}
      content={community}
      schema={{ event: { name: entity.community.name, description: entity.community.description, location: 'Frankfurt, Germany' } }}
    />
  );
}
