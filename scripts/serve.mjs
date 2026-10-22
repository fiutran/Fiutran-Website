// Tiny static server for the exported site (out/). Usage: node scripts/serve.mjs [port]
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { OUT } from './lib.mjs';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

export function serve(port = 4321) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    let p = decodeURIComponent(url.pathname);
    let f = path.join(OUT, p);
    if (!f.startsWith(OUT)) return res.writeHead(403).end();
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    else if (!path.extname(f) && fs.existsSync(path.join(OUT, p, 'index.html'))) {
      res.writeHead(308, { Location: `${p}/${url.search}` });
      return res.end();
    }
    if (!fs.existsSync(f)) {
      res.writeHead(404, { 'Content-Type': types['.html'] });
      return res.end(fs.readFileSync(path.join(OUT, '404.html')));
    }
    const ext = path.extname(f);
    const cache = p.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'no-cache';
    res.writeHead(200, { 'Content-Type': types[ext] ?? 'application/octet-stream', 'Cache-Control': cache });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.argv[2] ?? 4321);
  await serve(port);
  console.log(`Serving out/ on http://localhost:${port}`);
}
