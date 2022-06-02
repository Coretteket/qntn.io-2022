import adapter from '@sveltejs/adapter-vercel';
import svg from '@poppanator/sveltekit-svg';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [svg()],
      resolve: {
        alias: { $svg: path.resolve('./static/svg') },
      },
    },
  },
  preprocess: [preprocess({ postcss: true })],
};

export default config;
