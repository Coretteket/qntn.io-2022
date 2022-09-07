import { redirect, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const csr = false;

export const load: PageServerLoad = async ({ params: { slug } }) => {
  if (!slug) throw error(404);
  const url = env[`PUBLIC_SLUG_${slug.toUpperCase()}`];
  if (url) throw redirect(307, encodeURI(url));
  else throw error(404);
};
