import { geolocation, next, rewrite } from '@vercel/edge';
import { parse } from "cookie";

import { isPublic, isLocalized } from "./src/scripts/utils";
import { isLocale, isTheme, parseTheme } from "./src/scripts/types";

/** Parses language from request headers, based on stored cookies, the presence
 * of Dutch in the `accept-language` header, and geolocation. */
const parseHeaders = (request: Request) => {
  const cookies = parse(request.headers.get('cookie') ?? '');
  if (isLocale(cookies.locale)) return cookies.locale;
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const country = geolocation(request).country?.toLocaleLowerCase();
  return (acceptLanguage.includes('nl') || country === 'nl') ? 'nl' : 'en';
};

const cache = { 'cache-control': 'public, immutable, max-age=604800' }; // one week
const cookies = (url: URL) => ({ 'set-cookie': `locale=${url.pathname.slice(1, 3)}; SameSite=Lax; Path=/` });

/** Intercepts requests and rewrites them to the correct locale and applies cache headers. */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (isPublic(url)) return next({ headers: cache });
  if (isLocalized(url)) return next({ headers: cookies(url) });
  url.pathname = parseHeaders(request) + url.pathname;
  return rewrite(url);
}