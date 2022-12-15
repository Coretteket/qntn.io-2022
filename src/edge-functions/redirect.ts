/** Sneaky way of handling short-links: check if there exists a `SLUG_*` env variable and redirect. */
export default function redirect(request: Request) {
  const pathname = new URL(request.url).pathname.replace('/', '');
  const redirect = Deno.env.get(`SLUG_${pathname.toUpperCase()}`);
  if (redirect) return Response.redirect(redirect);
}
