import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import image from '@astrojs/image';
import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
  site: 'https://qntn.xyz',
  integrations: [
    prefetch(),
    image({ serviceEntryPoint: '@astrojs/image/sharp' }),
    purgecss(),
  ],
});
