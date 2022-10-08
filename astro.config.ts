import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
  site: 'https://qntn.xyz',
  integrations: [
    image({ serviceEntryPoint: '@astrojs/image/sharp' }),
    purgecss(),
  ]
});