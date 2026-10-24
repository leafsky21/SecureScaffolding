import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDirectory = path.resolve('public');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return files.flat();
}

const sourceImages = (await walk(publicDirectory)).filter(file => /\.(jpe?g)$/i.test(file));

for (const source of sourceImages) {
  const output = source.replace(/\.(jpe?g)$/i, '.webp');
  try {
    await fs.access(output);
    continue;
  } catch {
    // Generate a WebP when an optimized sibling does not exist yet.
  }
  const isLogo = path.basename(source).toLowerCase().includes('logo');
  await sharp(source)
    .rotate()
    .resize({ width: isLogo ? 480 : 1920, withoutEnlargement: true })
    .webp({ quality: isLogo ? 90 : 82, effort: 6 })
    .toFile(output);
  const { size } = await fs.stat(output);
  console.log(`${path.relative(publicDirectory, output)}\t${Math.round(size / 1024)} KB`);
}
