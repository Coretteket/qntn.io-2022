import { parse, serialize } from "cookie";
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

const cache = { 'cache-control': 'public, immutable, max-age=604800' }; // one week
const cookies = (url: URL) => ({ 'set-cookie': serialize('locale', url.pathname.slice(1, 3), { sameSite: 'lax', path: '/' }) })

/** Intercepts requests and rewrites them to the correct locale and applies cache headers. */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (isPublic(url)) return next({ headers: cache });
  if (isLocalized(url)) return next({ headers: cookies(url) });
  const locale = parseHeaders(request);
  url.pathname = locale + url.pathname;
  return rewrite(url);
}