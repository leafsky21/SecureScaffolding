import { createSitemapIndexXml, sitemapHeaders } from '../lib/sitemap';

export const prerender = true;

export function GET() {
  return new Response(createSitemapIndexXml(), { headers: sitemapHeaders });
}
