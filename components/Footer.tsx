import Link from 'next/link';
import { entity } from '@/content/entity';
import { children, getPage, label } from '@/lib/registry';
import { NewsletterForm } from './NewsletterForm';
import { Ph } from './Ph';

const hubs = ['/services/', '/industries/', '/compare/', '/insights/'];
const company = ['/how-we-work/', '/cto-on-demand/', '/work/', '/engagement-models/', '/about/', '/team/', '/community/', '/careers/', '/faq/', '/fiutran-at-a-glance/', '/products/fiunify/', '/ai-readiness-check/', '/contact/'];
const legal = ['/privacy-policy/', '/terms/', '/imprint/'];

export function Footer() {
  return (
    <footer className="site-footer" data-scope="global">
      <div className="container-wf grid grid-cols-12 gap-6 py-10">
        <section className="col-span-12 lg:col-span-4" aria-labelledby="f-entity">
          <h2 id="f-entity" className="text-lg font-bold">
            {entity.name}
          </h2>
          {/* Entity sentence: identical on Home, at-a-glance, JSON-LD and llms.txt */}
          <p className="mt-2 text-sm">{entity.description}</p>
          <p className="mt-2 text-sm">
            Location: {entity.locationSummary.value ?? <Ph label={entity.locationSummary.placeholder} />}
          </p>
          <p className="mt-1 text-sm">Email: {entity.email.value ?? <Ph label={entity.email.placeholder} />}</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm" aria-label="Official profiles">
            {entity.socials.map((s) => (
              <li key={s.network}>
                {s.url ? (
                  <a href={s.url} rel="me">
                    {s.network}
                  </a>
                ) : (
                  <Ph label={s.placeholder} />
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </section>
        {hubs.map((h) => (
          <nav key={h} className="col-span-6 md:col-span-3 lg:col-span-2" aria-label={label(getPage(h))}>
            <h2 className="footer-h">
              <Link href={h}>{label(getPage(h))}</Link>
            </h2>
            <ul className="space-y-1 text-sm">
              {children(h).map((c) => (
                <li key={c.path}>
                  <Link href={c.path}>{label(c)}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-wf border-t border-g-300 py-6">
        <nav aria-label="Company">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {company.map((c) => (
              <li key={c}>
                <Link href={c}>{label(getPage(c))}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal" className="mt-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-g-600">
            {legal.map((c) => (
              <li key={c}>
                <Link href={c}>{label(getPage(c))}</Link>
              </li>
            ))}
            <li>
              <a href="/sitemap.xml">sitemap.xml</a>
            </li>
            <li>
              <a href="/llms.txt">llms.txt</a>
            </li>
            <li>
              <Link href="/map/">Site map &amp; blueprint (internal)</Link>
            </li>
          </ul>
        </nav>
        <p className="mt-4 text-xs text-g-600">Wireframe prototype. Structure and flow only, not the final design.</p>
      </div>
    </footer>
  );
}
