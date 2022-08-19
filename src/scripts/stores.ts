import { writable } from 'svelte/store';
import type { Dict, Locale, Theme } from './types';
import { invalidate } from '$app/navigation';

export const theme = writable<Theme>('auto');
export const locale = writable<Locale>('en');
export const dict = writable<Dict | {}>({});

export const toggleLocale = () => {
  locale.update((l) => (l === 'en' ? 'nl' : 'en'));
  invalidate(); // force reload of translation .jsons
};

export const toggleTheme = () => {
  theme.update((t) => (t === 'light' ? 'dark' : 'light'));
};
