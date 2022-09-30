import { parse } from "cookie";
import { locales } from "./src/scripts/types";
import { isLocale } from "./src/scripts/utils";
import { geolocation, next, rewrite } from '@vercel/edge';

/** Returns true if path is localized route or a public file. */
export const matches = ({ pathname }: URL) =>
  (new RegExp(`(^\\/(${locales.join('|')})(\\W|$)|\\.\\w+$)`)).test(pathname);

/** Parses language from request headers, based on stored cookies, the presence
 * of Dutch in the `accept-language` header, and geolocation. */
const parseHeaders = (request: Request) => {
  const cookies = parse(request.headers.get('cookie') ?? '');
  if (isLocale(cookies.locale)) return cookies.locale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const country = geolocation(request).country;
  return (acceptLanguage.includes('nl') || country === 'NL') ? 'nl' : 'en';
};

const headers = { 'cache-control': 'public, max-age=86400' };

/** Intercepts requests and rewrites them to the correct locale and applies cache headers. */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (matches(url)) return next({ headers });
  const locale = parseHeaders(request);
  url.pathname = locale + url.pathname;
  return rewrite(url, { headers });
}