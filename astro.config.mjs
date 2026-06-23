import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://skygitig.github.io',
  base: '/resume-biodata-builder',
  integrations: [react(), tailwind()],
  output: 'static',
});
