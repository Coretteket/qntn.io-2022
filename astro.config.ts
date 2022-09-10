import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/edge';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: { ssr: { external: ['svgo'] }, },
  integrations: [svelte()],
});
