import Link from 'next/link';
import { home } from '@/content/home';
import { entity } from '@/content/entity';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { caseStudies } from '@/content/work';
import { team } from '@/content/team';
import { insights } from '@/content/insights';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Blocks } from '@/components/Blocks';
import { FaqBlock } from '@/components/FaqBlock';
import { FinalCta } from '@/components/FinalCta';
import { ImageSlot } from '@/components/ImageSlot';
import { JsonLd } from '@/components/JsonLd';
import { Ph } from '@/components/Ph';
import { Draft } from '@/components/Draft';
import { Section } from '@/components/Section';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/schema';
import { rich } from '@/components/RichText';

const PATH = '/';
export const metadata = buildMetadata(PATH);

export default function Home() {
  const page = getPage(PATH);
  const ctx = { owner: page.contentOwner, status: page.status };
  const slots = {
    services: (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <li key={s.slug} className="card">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm">{s.short}</p>
            <Link href={`/services/${s.slug}/`} className="card-cta">
              {s.name} →
            </Link>
          </li>
        ))}
        <li className="card bg-g-50">
          <h3 className="font-semibold">All services</h3>
          <p className="text-sm">How the seven services fit together.</p>
          <Link href="/services/" className="card-cta">
            See all services →
          </Link>
        </li>
      </ul>
    ),
    proof: (
      <>
        <ul className="grid gap-4 md:grid-cols-3">
          {caseStudies.map((c) => (
            <li key={c.slug} className="card">
              <p className="card-meta">Sample case study</p>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm">
                Result: <Ph label="client result metric" />
              </p>
              <Link href={`/work/${c.slug}/`} className="card-cta">
                Case study: {c.title} →
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {home.metrics.map((m) => (
            <li key={m.label} className="metric">
              <span className="metric-v">{rich(m.value)}</span>
              <span className="metric-l">{m.label}</span>
            </li>
          ))}
        </ul>
        <div className="proof-product mt-6">
          <p className="card-meta">
            {home.fiunify.eyebrow}
            <Draft />
          </p>
          <h3 className="text-xl font-bold">{home.fiunify.heading}</h3>
          <p className="mt-2 max-w-prose">{home.fiunify.text}</p>
          <Link href={home.fiunify.href} className="card-cta">
            {home.fiunify.linkLabel} →
          </Link>
        </div>
        <p className="mt-4">
          <Link href="/work/">See all our work</Link>
        </p>
      </>
    ),
    industries: (
      <ul className="flex flex-wrap gap-3">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link href={`/industries/${i.slug}/`} className="btn">
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    ),
    team: (
      <ul className="grid gap-4 md:grid-cols-3">
        {team.map((t) => (
          <li key={t.slug} className="card">
            <ImageSlot label={`Portrait: ${t.name}`} ratio="aspect-square" />
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-sm">{t.role ?? <Ph label="team member role" />}</p>
            <Link href={`/team/${t.slug}/`} className="card-cta">
              About {t.name} →
            </Link>
          </li>
        ))}
      </ul>
    ),
    insights: (
      <ul className="grid gap-4 md:grid-cols-3">
        {insights.slice(0, 3).map((a) => {
          const p = getPage(`/insights/${a.slug}/`);
          return (
            <li key={a.slug} className="card">
              <p className="card-meta">{a.section}</p>
              <h3 className="font-semibold">{p.h1}</h3>
              <p className="text-sm">{p.metaDescription}</p>
              <Link href={p.path} className="card-cta">
                Read: {p.h1} →
              </Link>
            </li>
          );
        })}
      </ul>
    ),
  };

  return (
    <>
      <JsonLd data={pageGraph(PATH, { faq: home.faq })} />
      <div
        className="page"
        data-page={JSON.stringify({ path: PATH, pageType: page.pageType, primaryQuery: page.primaryQuery, lenses: page.lenses, schemaTypes: page.schemaTypes, owner: page.contentOwner, status: page.status })}
      >
        <Breadcrumbs path={PATH} ctx={ctx} />
        <Section
          as="div"
          ctx={ctx}
          className="!mt-4 !border-t-0 !pt-0"
          bp={{ purpose: 'Hero: positioning, two primary CTAs and the entity sentence', intent: page.primaryQuery, lenses: ['SEO', 'GEO'], cta: 'Book a call / AI readiness check' }}
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <h1>{page.h1}</h1>
              <p className="mt-4 text-xl">{home.positioning}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={home.ctas[0].href} className="btn btn-primary">
                  {home.ctas[0].label}
                </Link>
                <Link href={home.ctas[1].href} className="btn">
                  {home.ctas[1].label}
                </Link>
              </div>
              {/* Entity sentence, plain text: identical to content/entity.ts description */}
              <p className="mt-6 text-sm text-g-600">{entity.description}</p>
            </div>
            <div
              id="consultant-vs-partner"
              className="col-span-12 lg:col-span-5"
              data-bp={JSON.stringify({ purpose: 'The brand idea in the first 5 seconds: consultant vs partner', intent: 'AI partner vs AI consultant', lenses: ['AEO', 'GEO'], cta: 'Compare in depth', owner: ctx.owner, status: ctx.status })}
            >
              <table className="contrast">
                <caption>{home.contrast.caption}</caption>
                <thead>
                  <tr>
                    {home.contrast.columns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {home.contrast.rows.map(([them, us]) => (
                    <tr key={them}>
                      <td className="contrast-them">{them}</td>
                      <td className="contrast-us">{us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-sm">
                <Link href="/compare/ai-partner-vs-ai-consultant/">AI partner vs AI consultant: the full comparison</Link>
              </p>
            </div>
          </div>
        </Section>
        <AnswerBlock page={page} text={home.answer} ctx={ctx} />
        <Blocks blocks={home.blocks} ctx={ctx} slots={slots} />
        <FaqBlock faq={home.faq} ctx={ctx} />
        <FinalCta ctx={ctx} />
      </div>
    </>
  );
}
