# Fiutran website: skeleton prototype

A clickable **structure-and-flow prototype** of the Fiutran website. Grey wireframe styling, no
brand colours, no imagery. Every page exists, every link and button works, and the search-visibility
infrastructure (SEO, AEO, GEO, GSEO) is real and working, so the visual design phase is a reskin:
nothing structural changes.

```bash
npm install
npm run dev        # http://localhost:3000, zero setup
npm run build      # static export to out/ (+ out/link-graph.json)
npm run audit      # quality gate: fails on any SEO/AEO/GEO/structure violation
npm run e2e        # Chromium click-through: every page, journey, flow, breakpoint, no-JS
npm run lighthouse # Lighthouse mobile + desktop on Home and a service page
npm start          # serve out/ locally (gzip/brotli, like a real static host)
```

Requires Node 22.18 or later (the scripts import the TypeScript registry directly).

## How it is built

| Piece | Where | What it does |
|---|---|---|
| Page registry | `content/pages.ts` | Single source of truth for every page: path, title (≤60), meta (≤155), H1, page type, primary query, lenses, schema types, parent, journeys, owner, status, placeholders. Generates nav, breadcrumbs, `sitemap.xml`, `llms.txt`, JSON-LD, `/map` and the audit. |
| Entity | `content/entity.ts` | Name, the one-sentence description, founders, address, contact, socials. Footer, `/fiutran-at-a-glance/`, JSON-LD and `llms.txt` all read it. Unknown facts are `null` and render as placeholders. |
| Copy | `content/*.ts`, `content/insights/*.mdx` | Typed content per page/section; insight bodies in MDX. Edit copy without touching components. |
| Template | `components/ContentPage.tsx` | Breadcrumb → H1 → answer block → body → FAQ → related → byline → CTA, for every page. |
| JSON-LD | `lib/schema.ts` | Organization + ProfessionalService, WebSite, WebPage (speakable answer block), BreadcrumbList, Service, FAQPage, Article, Person, SoftwareApplication, Event, ItemList, DefinedTermSet. |
| Metadata | `lib/seo.ts` | Title, description, canonical, robots, Open Graph, Twitter. |
| Forms | `lib/submit.ts` | Stub: logs the payload, returns the thank-you URL. Swap in a real endpoint here. |
| Config | `site.config.ts` | Site URL (`NEXT_PUBLIC_SITE_URL`) and the hreflang flag (en-IN / en-DE, **off**). |

All pages are statically generated and render as plain HTML without JavaScript. Client JS is only
used for the Book-a-call flow, the readiness check, work filters, the newsletter form and Blueprint mode.

## Rules for content editors

* **Never invent facts.** Use `{{ph:what is needed}}` in content strings (or `<Ph label="…" />` in
  MDX). It renders as `[PLACEHOLDER: …]`. Add the same label to the page's `placeholdersNeeded` in
  `content/pages.ts`; the audit fails if the two disagree. `/map` turns the list into a checklist per owner.
* Internal links in content strings: `[[/path/|descriptive text]]`.
* Each page needs a 40–60 word answer to its `primaryQuery` and 4–8 FAQs (the audit checks both).
* When a page's copy is approved, set its `status` to `final` and update `updated` (feeds sitemap
  `lastmod` and the "Last updated" byline).

## Review tools

* **Blueprint mode**: floating toggle on every page, or add `?blueprint=1` to any URL. Shows the purpose,
  query/intent, lenses, CTA, owner and status of every section, and outlines the answer block,
  schema-backed sections and internal links.
* **`/map/`** (noindex): sitemap tree by status, the four user journeys (clickable), sortable page
  inventory with live link counts, content needed by owner, open decisions.

## Open decisions (also on /map)

Target markets (hreflang + imprint), publishing price ranges, which case studies may be named,
domain, insights cadence, whether Fiunify gets its own site.
