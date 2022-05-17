import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'$stores': path.resolve('./src/stores'),
					'$svg': path.resolve('./src/svg'),
				}
			}
		}
	}
};

export default config;
