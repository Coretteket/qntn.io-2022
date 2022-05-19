import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';

const config = {
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $stores: path.resolve('./src/stores'),
          $svg: path.resolve('./src/svg'),
        },
      },
    },
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
