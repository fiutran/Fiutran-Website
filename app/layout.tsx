import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Blueprint } from '@/components/Blueprint';
import { GridOverlay } from '@/components/GridOverlay';
import { entity } from '@/content/entity';
import { site } from '@/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: entity.name,
  authors: [{ name: entity.name, url: site.url }],
  alternates: { types: { 'text/plain': `${site.url}/llms.txt` } },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.lang}>
      <body>
        <GridOverlay />
        <Header />
        <main id="main" className="container-wf">
          {children}
        </main>
        <Footer />
        <Blueprint />
      </body>
    </html>
  );
}
