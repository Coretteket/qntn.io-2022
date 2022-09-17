import type { Locale, Translations } from './types';

/** Object of translations for defined locales. */
export const loaders = {
  en: () => import('../locales/en'),
  nl: () => import('../locales/nl'),
};

/** Loads the translations for a given locale. */
export const loadTranslations = async (locale: Locale) => (await loaders[locale]())['default'];

export type State = { locale: Locale; translations: Translations }
export const state = { locale: 'en', translations: {} } as State;