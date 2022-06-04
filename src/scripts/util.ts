import { locale } from '../i18n';
import { theme } from './stores';

export const toggleLocale = () => {
  locale.update((l) => (l === 'en' ? 'nl' : 'en'));
};

export const toggleTheme = () => {
  theme.update((t) => (t === 'light' ? 'dark' : 'light'));
};
