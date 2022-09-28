import { parse } from "cookie";
import { locales } from "./src/scripts/types";
import { isLocale } from "./src/scripts/utils";
import { next, rewrite } from '@vercel/edge';

/** Returns true if path is localized route or a public file. */
export const matches = ({ pathname }: URL) =>
  (new RegExp(`(^\\/(${locales.join('|')})(\\W|$)|\\.\\w+$)`)).test(pathname);

/** Parses language from request headers, based on `accept-language` or cookies. */
const parseHeaders = ({ headers }: Request) => {
  const cookies = parse(headers.get('cookie') ?? '');
  if (isLocale(cookies.locale)) return cookies.locale;
  const acceptLanguage = headers.get('accept-language') ?? '';
  return acceptLanguage.includes('nl') ? 'nl' : 'en';
};

const headers = { headers: { 'cache-control': 'public, max-age=3600' } };

/** Intercepts requests and rewrites them to the correct locale and applies cache headers. */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (matches(url)) return next(headers);
  const locale = parseHeaders(request);
  url.pathname = locale + url.pathname;
  return rewrite(url, headers);
}