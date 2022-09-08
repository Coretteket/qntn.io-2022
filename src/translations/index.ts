import type { Locale } from '../scripts/types';

export const loaders = {
  en: () => import('./locales/en'),
  nl: () => import('./locales/nl'),
};

export const loadTranslations = async (locale: Locale) => (await loaders[locale]())['default'];

export type Translations = Awaited<ReturnType<typeof loadTranslations>>;
