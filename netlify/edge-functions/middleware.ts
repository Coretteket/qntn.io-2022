import type { Context } from "https://edge.netlify.com";

import { isLocalized, isPublic } from "../../src/scripts/utils.ts";
import { isLocale } from "../../src/scripts/types.ts";

const redirects = {
  '/github': 'https://github.com/coretteket',
  '/linkedin': 'https://www.linkedin.com/in/qcoret/',
  '/twitter': 'https://twitter.com/coretteket',
  '/telegram': 'https://t.me/coretteket',
}

const isRedirect = (url: string): url is keyof typeof redirects => Object.keys(redirects).includes(url);

const handleRedirect = (request: Request) => {
  const path = new URL(request.url).pathname;
  return isRedirect(path) ? Response.redirect(redirects[path]) : undefined;
};

const modify = async (next: Context['next'], name: string, value: string) => {
  const res = await next();
  res.headers.set(name, value);
  return res;
};

const handlePublic = (request: Request, context: Context) => isPublic(request.url) ?
  modify(context.next, 'cache-control', 'public, immutable, max-age=604800') : undefined;

const handleLocalized = (request: Request, context: Context) => isLocalized(request.url) ?
  modify(context.next, 'set-cookie', `locale=${new URL(request.url).pathname.slice(1, 3)}; SameSite=Lax; Path=/`) : undefined;

const parseHeaders = (request: Request, context: Context) => {
  const cookieLocale = context.cookies.get('locale');
  if (isLocale(cookieLocale)) return cookieLocale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const isDutch = acceptLanguage.includes('nl') || context.geo.country?.code === 'NL';
  return isDutch ? 'nl' : 'en';
};

const handleDynamic = (request: Request, context: Context) => {
  const locale = parseHeaders(request, context);
  const path = new URL(request.url).pathname;
  return context.rewrite(`/${locale}${path}`);
};

export default (request: Request, context: Context): Promise<Response> | Response =>
  handleRedirect(request) ??
  handlePublic(request, context) ??
  handleLocalized(request, context) ??
  handleDynamic(request, context);
