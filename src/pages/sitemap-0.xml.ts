import { projects } from '../data/projects';

export const prerender = true;

const siteUrl = 'https://www.securescaffolding.com.au';
const lastModified = '2026-10-24';
const staticPaths = [
  '/',
  '/about/',
  '/services/',
  '/services/scaffolding-hire-sydney/',
  '/services/commercial-scaffolding-sydney/',
  '/services/public-access-stairs-sydney/',
  '/services/bridge-access-scaffolding-sydney/',
  '/services/temporary-edge-protection-sydney/',
  '/service-areas/',
  '/projects/',
  '/clients/',
  '/contact/'
];

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  })[character] as string);
}

function absolute(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function renderUrl(pathname: string, images: string[] = []) {
  const imageEntries = images.map(image => `\n    <image:image><image:loc>${escapeXml(absolute(image))}</image:loc></image:image>`).join('');
  return `  <url>\n    <loc>${escapeXml(absolute(pathname))}</loc>\n    <lastmod>${lastModified}</lastmod>${imageEntries}\n  </url>`;
}

export function GET() {
  const staticEntries = staticPaths.map(pathname => renderUrl(pathname));
  const projectEntries = projects.map(project => renderUrl(
    `/projects/${project.slug}/`,
    project.images ?? [project.image]
  ));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[...staticEntries, ...projectEntries].join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
