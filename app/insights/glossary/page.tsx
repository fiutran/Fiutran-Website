import { ContentPage } from '@/components/ContentPage';
import { rich } from '@/components/RichText';
import { glossaryPage, terms } from '@/content/glossary';
import { buildMetadata } from '@/lib/seo';

const PATH = '/insights/glossary/';
export const metadata = buildMetadata(PATH);

export default function Page() {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <ContentPage
      path={PATH}
      content={glossaryPage}
      schema={{ definedTerms: sorted }}
      slots={{
        terms: (
          <>
            <nav aria-label="Glossary index" className="mb-6">
              <ul className="flex flex-wrap gap-2 text-sm">
                {sorted.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.term}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <dl className="grid max-w-3xl gap-3">
              {sorted.map((t) => (
                <div key={t.id} id={t.id} className="scroll-mt-24 border border-g-300 p-4">
                  <dt className="font-semibold">
                    <a href={`#${t.id}`} className="no-underline">
                      {t.term}
                    </a>
                  </dt>
                  <dd className="mt-1">{rich(t.definition)}</dd>
                </div>
              ))}
            </dl>
          </>
        ),
      }}
    />
  );
}
