import { parse } from "cookie";
import { isLocale } from "./src/scripts/types";
import { geolocation, next, rewrite } from '@vercel/edge';

/** Returns true if path is a localized route. */
export const isLocalized = ({ pathname }: URL) => /^\/(en|nl)(\W|$)/.test(pathname);

/** Returns true if path is a public file. */
export const isPublic = ({ pathname }: URL) => /\.\w+$/.test(pathname);

/** Parses language from request headers, based on stored cookies, the presence
 * of Dutch in the `accept-language` header, and geolocation. */
const parseHeaders = (request: Request) => {
  const cookies = parse(request.headers.get('cookie') ?? '');
  if (isLocale(cookies.locale)) return cookies.locale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const country = geolocation(request).country;
  return (acceptLanguage.includes('nl') || country === 'NL') ? 'nl' : 'en';
};

const pageHeaders = { 'cache-control': 'public, max-age=14400' }; // four hours
const publicHeaders = { 'cache-control': 'public, immutable, max-age=604800' }; // one week

/** Intercepts requests and rewrites them to the correct locale and applies cache headers. */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (isPublic(url)) return next({ headers: publicHeaders });
  if (isLocalized(url)) return next({ headers: pageHeaders });
  const locale = parseHeaders(request);
  url.pathname = locale + url.pathname;
  return rewrite(url, { headers: pageHeaders });
}