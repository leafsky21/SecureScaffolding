export const prerender = true;

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>https://www.securescaffolding.com.au/sitemap-0.xml</loc>\n    <lastmod>2026-10-24</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
