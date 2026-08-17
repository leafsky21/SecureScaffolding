import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.securescaffolding.com.au',
  adapter: cloudflare({ mode: 'static' }),
  output: 'static',
  trailingSlash: 'never'
});
