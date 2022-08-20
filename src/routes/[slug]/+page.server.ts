import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '../../scripts/prisma';

export const load: PageServerLoad = async ({ params: { slug } }) => {
  console.log(slug);
  const response = await prisma.slug.findFirst({ where: { slug } });
  console.log(response);
  if (response?.url) throw redirect(307, encodeURI(response.url));
  else throw error(404, 'Not found');
  // throw redirect(302, encodeURI('/' + slug));
};
