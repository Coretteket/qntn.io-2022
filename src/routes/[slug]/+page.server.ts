import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const prerender = true;

export const load: PageServerLoad = async ({ params: { slug } }) => {
  if (!slug) throw error(404);
  const url = env[`PUBLIC_SLUG_${slug.toUpperCase()}`];
  if (url) throw redirect(307, encodeURI(url));
  else throw error(404);
};
