import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://skygitig.github.io',
  base: '/resume-biodata-builder/',
  integrations: [react()],
  output: 'static',
});
