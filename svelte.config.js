import adapter from '@sveltejs/adapter-vercel';
import svg from '@poppanator/sveltekit-svg';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: { plugins: [svg()] },
    alias: { $svg: 'static/svg' },
  },
  preprocess: [preprocess({ postcss: true })],
};

export default config;
