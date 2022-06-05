import { theme, locale } from './stores';

export const toggleLocale = () => {
  locale.update((l) => (l === 'en' ? 'nl' : 'en'));
};

export const toggleTheme = () => {
  theme.update((t) => (t === 'light' ? 'dark' : 'light'));
};
