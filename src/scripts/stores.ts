import { writable } from 'svelte/store';
import type { Dict, Locale, Theme } from './types';
import { invalidate } from '$app/navigation';
import { disableTransitionUntil } from './util';

export const theme = writable<Theme>('auto');
export const locale = writable<Locale>('en');
export const dict = writable<Dict | undefined>();

export const toggleLocale = () => {
  locale.update((l) => {
    l = l === 'en' ? 'nl' : 'en';
    document.cookie = `locale=${l}`;
    return l;
  });
  invalidate(); // force reload of translation .ts files
};

export const toggleTheme = () => {
  disableTransitionUntil(() =>
    theme.update((t) => {
      t = t === 'light' ? 'dark' : 'light';
      document.cookie = `theme=${t}`;
      return t;
    })
  );
};
