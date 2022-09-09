import type { AstroGlobal } from 'astro';
import type { Locale } from './types';

import { parse } from 'cookie';
import { loadTranslations } from './translate';
import { setStores } from './stores';
import { parseLocale, parseTheme } from './types';

const parseHeaders = (headers: Headers) => {
  const cookies = parse(headers.get('cookie') ?? '');
  const acceptLanguage = headers.get('accept-language') ?? '';
  const acceptsDutch = acceptLanguage.includes('nl');
  const headerLocale: Locale = acceptsDutch ? 'nl' : 'en';
  return { cookies, headerLocale };
};

export const load = async (Astro: Readonly<AstroGlobal>) => {
  const { cookies, headerLocale } = parseHeaders(Astro.request.headers);

  const locale = parseLocale(cookies.locale, headerLocale);
  const theme = parseTheme(cookies.theme, 'auto');
  const translations = await loadTranslations(locale);

  setStores({ locale, theme, translations });
};
