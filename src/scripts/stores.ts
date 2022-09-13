import { atom } from 'nanostores';
import type { Locale, Theme, Translations } from './types';

export const locale = atom<Locale>('en');
export const theme = atom<Theme>('light');
export const translations = atom({} as Translations);

type Stores = { locale: Locale; theme: Theme; translations: Translations };

export const setStores = (values: Stores) => {
  locale.set(values.locale);
  theme.set(values.theme);
  translations.set(values.translations);
};
