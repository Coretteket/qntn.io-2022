import { atom } from 'nanostores';
import type { Locale, Theme, Translations } from './types';

export const locale = atom<Locale>('en');
export const translations = atom({} as Translations);

type Stores = { locale: Locale; translations: Translations };

export const setStores = (values: Stores) => {
  locale.set(values.locale);
  translations.set(values.translations);
};
