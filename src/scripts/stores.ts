import { get, writable } from 'svelte/store';
import type { Dict, Locale, Theme } from './types';
import { invalidate } from '$app/navigation';
import { disableTransitionUntil } from './util/disable-transition';

export const theme = writable<Theme>('auto');
export const locale = writable<Locale>('en');
export const dict = writable<Dict | undefined>();
export const loading = writable(false);

export const toggleLocale = async () => {
  loading.set(true);
  document.cookie = `locale=${get(locale) === 'en' ? 'nl' : 'en'}`;
  await invalidate(); // force reload of translation .ts files
  locale.update((l) => (l === 'en' ? 'nl' : 'en'));
  loading.set(false);
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
