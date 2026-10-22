import { ContactFlow } from '@/components/ContactFlow';
import { ContentPage } from '@/components/ContentPage';
import { industries } from '@/content/industries';
import { services } from '@/content/services';
import { contact } from '@/content/utility';
import { buildMetadata } from '@/lib/seo';

const PATH = '/contact/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return (
    <ContentPage
      path={PATH}
      content={{ ...contact, cta: { heading: 'Not ready to talk yet?', text: 'Take the AI readiness check and see where you stand first.', primary: { label: 'Take the AI readiness check', href: '/ai-readiness-check/' }, secondary: { label: 'Read the FAQ', href: '/faq/' } } }}
      slots={{
        form: <ContactFlow services={services.map((s) => ({ value: s.slug, label: s.name }))} industries={industries.map((i) => ({ value: i.slug, label: i.name }))} />,
      }}
    />
  );
}
