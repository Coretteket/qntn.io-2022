import { redirect, error } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const load: Load = async ({ params: { slug } }) => {
  if (!slug) throw error(404);
  const url = env[`PUBLIC_SLUG_${slug.toUpperCase()}`];
  if (url) throw redirect(301, encodeURI(url));
  else throw error(404);
};
