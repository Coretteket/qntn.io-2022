import { invalidateAll } from '$app/navigation';
import { loading, locale, theme } from '../stores';
import { disableTransitionUntil } from './disable-transition';

export const toggleLocale = async () => {
  const timer = setTimeout(() => loading.set(true), 100);
  locale.update((l) => {
    const locale = l === 'en' ? 'nl' : 'en';
    document.cookie = `locale=${locale}`;
    return locale;
  });
  await invalidateAll(); // force reload of translation .ts files
  clearTimeout(timer);
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
