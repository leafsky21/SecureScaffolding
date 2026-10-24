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
const responsiveWidths = [480, 960, 1440];

async function needsRefresh(source, output) {
  try {
    const [sourceStat, outputStat] = await Promise.all([fs.stat(source), fs.stat(output)]);
    return outputStat.mtimeMs < sourceStat.mtimeMs;
  } catch {
    return true;
  }
}

for (const source of sourceImages) {
  const output = source.replace(/\.(jpe?g)$/i, '.webp');
  const isLogo = path.basename(source).toLowerCase().includes('logo');
  if (await needsRefresh(source, output)) {
    await sharp(source)
      .rotate()
      .resize({ width: isLogo ? 480 : 1920, withoutEnlargement: true })
      .webp({ quality: isLogo ? 90 : 82, effort: 6 })
      .toFile(output);
    const { size } = await fs.stat(output);
    console.log(`${path.relative(publicDirectory, output)}\t${Math.round(size / 1024)} KB`);
  }

  if (isLogo || !output.includes(`${path.sep}projects${path.sep}`)) continue;

  const { width: sourceWidth } = await sharp(output).metadata();
  for (const responsiveWidth of responsiveWidths.filter(width => width < sourceWidth)) {
    const responsiveOutput = output.replace(/\.webp$/i, `-${responsiveWidth}.webp`);
    if (!(await needsRefresh(source, responsiveOutput))) continue;
    await sharp(source)
      .rotate()
      .resize({ width: responsiveWidth, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(responsiveOutput);
    const { size } = await fs.stat(responsiveOutput);
    console.log(`${path.relative(publicDirectory, responsiveOutput)}\t${Math.round(size / 1024)} KB`);
  }
}
