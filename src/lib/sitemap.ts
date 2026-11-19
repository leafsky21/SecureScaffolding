export const sitemapLastModified = new Date().toISOString().slice(0, 10);

export const sitemapHeaders = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=0, must-revalidate'
};

export function createSitemapIndexXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>https://www.securescaffolding.com.au/sitemap-0.xml</loc>\n    <lastmod>${sitemapLastModified}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
}
