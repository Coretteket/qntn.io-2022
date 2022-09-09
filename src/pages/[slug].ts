import type { APIRoute } from "astro";

const slugs = {
  github: 'https://github.com/coretteket',
  linkedin: 'https://linkedin.com/in/qcoret/',
  twitter: 'https://twitter.com/coretteket',
  telegram: 'https://t.me/coretteket',
}

const isSlug = (slug?: any): slug is keyof typeof slugs => slug ? slug in slugs : false;

export const get: APIRoute = async ({ params }) => {
  if (isSlug(params.slug)) return Response.redirect(slugs[params.slug], 307);
  return new Response(null, { status: 404 });
}