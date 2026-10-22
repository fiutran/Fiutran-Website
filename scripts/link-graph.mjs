// Post-build: crawl the exported HTML and write out/link-graph.json with inbound/outbound
// internal link counts per registry page. /map reads it for the inventory table; the audit
// uses the same computation for the orphan and ≥3-outbound checks.
import fs from 'node:fs';
import path from 'node:path';
import { OUT, internalLinks, load, loadRegistry } from './lib.mjs';

export async function linkGraph() {
  const { pages } = await loadRegistry();
  const known = new Set(pages.map((p) => p.path));
  const graph = Object.fromEntries(pages.map((p) => [p.path, { out: 0, in: 0, inAll: 0, outTargets: [], from: [] }]));
  for (const p of pages) {
    const doc = load(p.path);
    if (!doc) continue;
    const main = doc.querySelector('main');
    const mainTargets = new Set(internalLinks(main).filter((l) => l.path && l.path !== p.path && !l.form).map((l) => l.path));
    graph[p.path].out = mainTargets.size;
    graph[p.path].outTargets = [...mainTargets];
    if (p.path === '/map/') continue; // the map links to everything; it does not count as inbound
    const mainOrForm = new Set(internalLinks(main).filter((l) => l.path && l.path !== p.path).map((l) => l.path));
    const all = new Set(internalLinks(doc).filter((l) => l.path && l.path !== p.path).map((l) => l.path));
    for (const t of all) {
      if (!known.has(t)) continue;
      graph[t].inAll++;
      if (mainOrForm.has(t)) {
        graph[t].in++;
        graph[t].from.push(p.path);
      }
    }
  }
  return graph;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const graph = await linkGraph();
  fs.writeFileSync(path.join(OUT, 'link-graph.json'), JSON.stringify({ generated: new Date().toISOString(), pages: graph }, null, 1));
  console.log(`link-graph.json: ${Object.keys(graph).length} pages`);
}
