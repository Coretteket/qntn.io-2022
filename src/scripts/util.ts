import { invalidate } from '$app/navigation';
import { theme, locale } from './stores';

export const toggleLocale = () => {
  locale.update((l) => (l === 'en' ? 'nl' : 'en'));
  invalidate();
};

export const toggleTheme = () => theme.update((t) => (t === 'light' ? 'dark' : 'light'));

export const modulo = (a: number, b: number) => ((a % b) + b) % b;
