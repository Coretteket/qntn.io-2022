import { invalidateAll } from '$app/navigation';
import { loading, locale, theme } from '../stores';
import { disableTransitionUntil } from './disable-transition';

export const toggleLocale = async () => {
  loading.set(true);
  locale.update((l) => {
    const locale = l === 'en' ? 'nl' : 'en';
    document.cookie = `locale=${locale}`;
    return locale;
  });
  await invalidateAll(); // force reload of translation .ts files
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
