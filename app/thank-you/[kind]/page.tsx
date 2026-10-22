import { ContentPage } from '@/components/ContentPage';
import { thankYou } from '@/content/utility';
import { buildMetadata } from '@/lib/seo';

// One thank-you page per conversion type, so each is tracked separately (noindex).
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(thankYou).map((kind) => ({ kind }));
}

type Props = { params: Promise<{ kind: keyof typeof thankYou }> };

export async function generateMetadata({ params }: Props) {
  const { kind } = await params;
  return buildMetadata(`/thank-you/${kind}/`);
}

export default async function Page({ params }: Props) {
  const { kind } = await params;
  return <ContentPage path={`/thank-you/${kind}/`} content={thankYou[kind]} hideByline wrap="div" />;
}
