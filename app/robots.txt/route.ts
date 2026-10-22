import { absoluteUrl } from '@/site.config';

// robots.txt: allow classic search crawlers AND AI crawlers. Generated as text (not via
// robots.ts) so it can carry comments.
export const dynamic = 'force-static';

// NOTE: AI crawler user-agent names change. Re-check every name below against each
// vendor's current documentation (OpenAI, Anthropic, Perplexity, Google) before launch
// and at least quarterly.
const bots = [
  ['Googlebot', 'Google Search'],
  ['Bingbot', 'Bing Search (also feeds Copilot)'],
  ['GPTBot', 'OpenAI training crawler'],
  ['OAI-SearchBot', 'OpenAI ChatGPT search index'],
  ['ChatGPT-User', 'ChatGPT fetching a page for a user'],
  ['ClaudeBot', 'Anthropic crawler'],
  ['PerplexityBot', 'Perplexity search index'],
  ['Google-Extended', 'Google Gemini / AI use control token'],
];

export function GET() {
  const body = [
    '# robots.txt for Fiutran',
    '# Search engines and AI crawlers are explicitly allowed: being cited by AI answers is a goal.',
    '# Internal / conversion pages are kept out of the index with <meta name="robots" content="noindex">, not here,',
    '# so crawlers can still read the noindex.',
    '# IMPORTANT: bot names change. Re-check each user-agent below against the vendor docs.',
    '',
    ...bots.flatMap(([ua, note]) => [`# ${note}`, `User-agent: ${ua}`, 'Allow: /', '']),
    '# Everyone else',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
    `# AI-readable site summary: ${absoluteUrl('/llms.txt')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
