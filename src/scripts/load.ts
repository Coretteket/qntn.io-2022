import type { AstroGlobal } from 'astro';
import type { Locale } from './types';

import { parse } from 'cookie';
import { loadTranslations, state } from './translate';
import { parseLocale } from './utils';

const parseHeaders = (headers: Headers) => {
  const cookies = parse(headers.get('cookie') ?? '');
  const acceptLanguage = headers.get('accept-language') ?? '';
  const acceptsDutch = acceptLanguage.includes('nl');
  const headerLocale: Locale = acceptsDutch ? 'nl' : 'en';
  return { cookies, headerLocale };
};

export const load = async (Astro: Readonly<AstroGlobal>) => {
  const { cookies, headerLocale } = parseHeaders(Astro.request.headers);
  const searchLocale = Astro.url.searchParams.get('lang');

  state.locale = parseLocale(searchLocale ?? cookies.locale, headerLocale);
  state.translations = await loadTranslations(state.locale);

  return state;
};
