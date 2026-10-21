import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), react()],
  site: 'https://essencebyaditi.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'mr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
