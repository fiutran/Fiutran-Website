import Link from 'next/link';
import { children, label, navItems } from '@/lib/registry';
import { HeaderEnhancer } from './HeaderEnhancer';

// Header nav is generated from the registry (`navOrder`). Services ▾ lists the children of
// /services/. Menus use <details>, so they work without JavaScript; HeaderEnhancer only
// closes them on navigation / outside click.
export function Header() {
  const items = navItems();
  const services = children('/services/');
  const NavList = ({ mobile }: { mobile?: boolean }) => (
    <ul className={mobile ? 'flex flex-col gap-1' : 'flex items-center gap-1'}>
      {items.map((p) =>
        p.path === '/services/' ? (
          <li key={p.path} className="relative">
            <details className="nav-dd" data-nav-menu>
              <summary className="nav-link">Services ▾</summary>
              <ul className={mobile ? 'pl-4' : 'dd-panel'}>
                <li>
                  <Link href="/services/" className="nav-link">
                    All services
                  </Link>
                </li>
                {services.map((s) => (
                  <li key={s.path}>
                    <Link href={s.path} className="nav-link">
                      {label(s)}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ) : (
          <li key={p.path}>
            <Link href={p.path} className="nav-link">
              {label(p)}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-wf flex items-center justify-between gap-4 py-3">
        <Link href="/" className="logo" aria-label="Fiutran home">
          Fiutran
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <NavList />
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact/" className="btn btn-primary hidden sm:inline-flex">
            Book a call
          </Link>
          <details className="lg:hidden mobile-menu" data-nav-menu>
            <summary className="btn" aria-label="Open menu">
              Menu
            </summary>
            <nav aria-label="Mobile" className="mobile-panel">
              <NavList mobile />
              <Link href="/contact/" className="btn btn-primary mt-3 w-full justify-center">
                Book a call
              </Link>
            </nav>
          </details>
        </div>
      </div>
      <HeaderEnhancer />
    </header>
  );
}
