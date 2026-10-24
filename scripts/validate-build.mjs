import fs from 'node:fs/promises';
import path from 'node:path';

const distDirectory = path.resolve('dist');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return files.flat();
}

const files = await walk(distDirectory);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const errors = [];
const canonicals = [];
const titles = [];
const descriptions = [];

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  if (html.includes('static.wixstatic.com')) errors.push(`${file}: external Wix asset remains`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical) errors.push(`${file}: missing canonical URL`);
  else if (canonical !== 'https://www.securescaffolding.com.au/' && !canonical.endsWith('/')) {
    errors.push(`${file}: canonical URL does not end with a slash`);
  }
  if (canonical) canonicals.push(canonical);

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/gi)].length;
  if (!title) errors.push(`${file}: missing title`); else titles.push(title);
  if (!description) errors.push(`${file}: missing meta description`); else descriptions.push(description);
  if (h1Count !== 1) errors.push(`${file}: expected one H1, found ${h1Count}`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); }
    catch (error) { errors.push(`${file}: invalid JSON-LD (${error.message})`); }
  }

  if (!html.includes('https://www.securescaffolding.com.au/#business') || !html.includes('"@type":"LocalBusiness"')) {
    errors.push(`${file}: missing the canonical LocalBusiness entity`);
  }

  const localImagePaths = new Set();
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const imageTag = match[0];
    if (!/\balt="[^"]*"/i.test(imageTag)) errors.push(`${file}: image is missing alt text`);
    if (!/\bwidth="\d+"/i.test(imageTag) || !/\bheight="\d+"/i.test(imageTag)) {
      errors.push(`${file}: image is missing intrinsic width or height`);
    }
    const src = imageTag.match(/\bsrc="(\/[^"?#]+)"/i)?.[1];
    if (src) localImagePaths.add(src);
    const srcset = imageTag.match(/\bsrcset="([^"]+)"/i)?.[1];
    if (srcset) {
      for (const candidate of srcset.split(',')) {
        const candidatePath = candidate.trim().split(/\s+/)[0];
        if (candidatePath.startsWith('/')) localImagePaths.add(candidatePath);
      }
    }
  }
  for (const imagePath of localImagePaths) {
    const target = path.join(distDirectory, decodeURIComponent(imagePath).replace(/^\/+/, ''));
    try { await fs.access(target); }
    catch { errors.push(`${file}: missing image asset ${imagePath}`); }
  }

  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1];
    if (/\.[a-z0-9]+$/i.test(href)) continue;
    if (href !== '/' && !href.endsWith('/')) errors.push(`${file}: non-canonical internal link ${href}`);
    const target = href === '/' ? path.join(distDirectory, 'index.html') : path.join(distDirectory, href, 'index.html');
    try { await fs.access(target); }
    catch { errors.push(`${file}: broken internal link ${href}`); }
  }
}

for (const [label, values] of [['canonical URL', canonicals], ['title', titles], ['meta description', descriptions]]) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) errors.push(`Duplicate ${label}: ${[...new Set(duplicates)].join(', ')}`);
}

const sitemap = await fs.readFile(path.join(distDirectory, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
for (const canonical of canonicals) {
  if (!sitemapUrls.includes(canonical)) errors.push(`Canonical missing from sitemap: ${canonical}`);
}
for (const sitemapUrl of sitemapUrls) {
  if (!canonicals.includes(sitemapUrl)) errors.push(`Sitemap URL has no generated page: ${sitemapUrl}`);
}

const redirects = await fs.readFile(path.join(distDirectory, '_redirects'), 'utf8');
if (/^\/projects\/:|^\/services\/:/m.test(redirects)) {
  errors.push('Broad project or service redirects can capture static assets; use exact page redirects.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} pages: canonical URLs, internal links, image assets and JSON-LD are consistent.`);
