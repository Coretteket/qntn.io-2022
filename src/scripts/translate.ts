import type { AstroGlobal } from 'astro';
import { Locale, locales, Translations } from './types';

/** Object of translations for defined locales. */
export const loaders = {
  en: () => import('../locales/en'),
  nl: () => import('../locales/nl'),
};

/** Loads the translations for a given locale. */
export const loadTranslations = async (Astro: Readonly<AstroGlobal>) => {
  state.locale = Astro.params.locale as Locale;
  state.t = (await loaders[state.locale]())['default'];
  return state;
};

/** Makes a page available in all supported locales. */
export const getStaticPaths = () => locales.map(locale => ({ params: { locale } }));

/** Global server-side localization state. */
export const state = { locale: 'en', t: {} } as { locale: Locale; t: Translations };