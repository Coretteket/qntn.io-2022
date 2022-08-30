import { redirect, error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';

export const prerender = true;
export const router = false;
export const hydrate = false;

export const load: PageLoad = async ({ params: { slug } }) => {
  if (!slug) throw error(404);
  const url = env[`PUBLIC_SLUG_${slug.toUpperCase()}`];
  if (url) throw redirect(307, encodeURI(url));
  else throw error(404);
};
