import { atom } from 'nanostores';
import { loadTranslations } from '../translations';
import type { Locale, Theme } from './types';

export const locale = atom<Locale>('en');
export const theme = atom<Theme>('light');
export const translations = atom(await loadTranslations('en'));
