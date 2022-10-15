import type { Context } from "https://edge.netlify.com";
import { Cookie } from "https://deno.land/std@0.114.0/http/cookie.ts";

import { isLocalized, isPublic } from "../../src/scripts/utils.ts";
import { isLocale } from "../../src/scripts/types.ts";

const getLocaleCookie: (url: string) => Cookie = (url: string) =>
  ({ name: 'locale', value: new URL(url).pathname.slice(1, 3), path: '/', sameSite: 'Lax' });

const parseHeaders = (request: Request, context: Context) => {
  const cookieLocale = context.cookies.get('locale');
  if (isLocale(cookieLocale)) return cookieLocale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const isDutch = acceptLanguage.includes('nl') || context.geo.country?.code === 'NL';
  return isDutch ? 'nl' : 'en';
};

export default function middleware(request: Request, context: Context) {
  if (isPublic(request.url)) return;
  if (isLocalized(request.url)) {
    context.cookies.set(getLocaleCookie(request.url));
  } else {
    const locale = parseHeaders(request, context);
    const path = new URL(request.url).pathname;
    return context.rewrite(`/${locale}${path}`);
  }
}