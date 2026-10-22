'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Progressive enhancement for the <details> menus: close on navigation, outside click, Escape.
export function HeaderEnhancer() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>('[data-nav-menu]').forEach((d) => (d.open = false));
  }, [pathname]);
  useEffect(() => {
    const close = (e: Event) => {
      document.querySelectorAll<HTMLDetailsElement>('[data-nav-menu][open]').forEach((d) => {
        const t = e.target as HTMLElement;
        const outside = !d.contains(t);
        const linkInside = !outside && !!t.closest('a');
        if (e instanceof KeyboardEvent ? e.key === 'Escape' : outside || linkInside) d.open = false;
      });
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, []);
  return null;
}
