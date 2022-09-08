import type { AstroGlobal } from 'astro';
import type { Locale, Theme } from './types';
import type { Translations } from '../translations';

import { parse } from 'cookie';
import { loadTranslations } from '../translations';
import { locale, theme, translations } from './stores';
import { parseLocale, parseTheme } from './types';

type Stores = { locale: Locale; theme: Theme; translations: Translations };

const parseHeaders = (headers: Headers) => ({
  cookies: parse(headers.get('cookie') ?? ''),
  acceptLanguage: headers.get('accept-language') ?? '',
});

const setStores = (stores: Stores) => {
  locale.set(stores.locale);
  theme.set(stores.theme);
  translations.set(stores.translations);
};

export const load = async (Astro: Readonly<AstroGlobal>) => {
  const { cookies, acceptLanguage } = parseHeaders(Astro.request.headers);
  const headerLocale = acceptLanguage.includes('nl') ? 'nl' : 'en';

  const locale = parseLocale(cookies.locale, headerLocale);
  const theme = parseTheme(cookies.theme, 'auto');
  const translations = await loadTranslations(locale);

  setStores({ locale, theme, translations });
};
