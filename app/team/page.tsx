import Link from 'next/link';
import { ContentPage } from '@/components/ContentPage';
import { ImageSlot } from '@/components/ImageSlot';
import { Ph } from '@/components/Ph';
import { teamHub } from '@/content/company';
import { team } from '@/content/team';
import { children } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

const PATH = '/team/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  return (
    <ContentPage
      path={PATH}
      content={teamHub}
      schema={{ itemList: children(PATH) }}
      slots={{
        people: (
          <ul className="grid gap-4 md:grid-cols-3">
            {team.map((t) => (
              <li key={t.slug} className="card">
                <ImageSlot label={`Portrait: ${t.name}`} ratio="aspect-square" />
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm">{t.role ?? <Ph label={t.rolePlaceholder} />}</p>
                <Link href={`/team/${t.slug}/`} className="card-cta">
                  About {t.name} →
                </Link>
              </li>
            ))}
          </ul>
        ),
      }}
    />
  );
}
