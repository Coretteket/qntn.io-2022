import adapter from '@sveltejs/adapter-auto';
import svg from '@poppanator/sveltekit-svg';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
  kit: {
    adapter: adapter(),
    vite: { plugins: [svg()], resolve: { alias: { $svg: path.resolve('./static/svg') } } },
  },
  preprocess: [preprocess({ postcss: true })],
};

export default config;
