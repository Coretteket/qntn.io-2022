import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import unocss from 'unocss/vite';

const config: UserConfig = {
  plugins: [sveltekit(), unocss()],
};

export default config;
