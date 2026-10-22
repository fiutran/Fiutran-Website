import { ContentPage } from '@/components/ContentPage';
import { fiunify } from '@/content/offers';
import { entity } from '@/content/entity';
import { buildMetadata } from '@/lib/seo';

const PATH = '/products/fiunify/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const product = entity.products[0];
  return (
    <ContentPage
      path={PATH}
      content={fiunify}
      schema={{ software: { name: product.name, description: product.description, url: product.url.value ?? undefined } }}
    />
  );
}
