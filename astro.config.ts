import { defineConfig } from 'astro/config';
import { getRawMD } from './src/scripts/remark';

import image from '@astrojs/image';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://qntn.xyz',
  integrations: [image({ serviceEntryPoint: '@astrojs/image/sharp' }), tailwind(), solid(), mdx()],
  markdown: { remarkPlugins: [getRawMD] },
});
