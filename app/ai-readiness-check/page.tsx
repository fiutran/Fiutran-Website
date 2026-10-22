import { ContentPage } from '@/components/ContentPage';
import { ReadinessCheck } from '@/components/ReadinessCheck';
import { readinessPage } from '@/content/readiness';
import { buildMetadata } from '@/lib/seo';

const PATH = '/ai-readiness-check/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return <ContentPage path={PATH} content={readinessPage} slots={{ check: <ReadinessCheck /> }} />;
}
