import type { Context } from 'https://edge.netlify.com';
import type { Cookie } from 'https://deno.land/std@0.114.0/http/cookie.ts';

import { isLocalized, isPublic } from '../scripts/matchers.ts';
import { matchLocale } from '../scripts/types.ts';

/** Simply slices locale from localized URL path. */
const getLocaleFromPath = (url: string) => new URL(url).pathname.slice(1, 3);

/** Returns locale cookie object to use in Netlify's `context.cookies.set()`. */
const getLocaleCookie = (url: string) => ({ name: 'locale', value: getLocaleFromPath(url), path: '/', sameSite: 'Lax' } as Cookie);

/** Parses locale from cookie and accept-language headers, or detected geolocation.
 * Prefers Dutch if user accepts any kind of Dutch, or if they are in the Netherlands. */
const parseHeaders = (request: Request, context: Context) => {
  const cookieLocale = context.cookies.get('locale');
  if (matchLocale(cookieLocale)) return cookieLocale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const isDutch = acceptLanguage.includes('nl') || context.geo.country?.code === 'NL';
  return isDutch ? 'nl' : 'en';
};

/** Sets locale cookie on already-localized routes, and rewrites non-localized routes to the user's preferred locale. */
export default function localize(request: Request, context: Context) {
  if (isPublic(request.url)) return;
  if (isLocalized(request.url)) {
    const cookie = getLocaleCookie(request.url);
    context.cookies.set(cookie);
  } else {
    const locale = parseHeaders(request, context);
    const path = new URL(request.url).pathname.replace(/\/$/, '');
    return context.rewrite(`/${locale}${path}/`);
  }
}
