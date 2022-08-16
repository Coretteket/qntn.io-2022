import { theme, locale } from './stores';

export const toggleLocale = () => locale.update((l) => (l === 'en' ? 'nl' : 'en'));

export const toggleTheme = () => theme.update((t) => (t === 'light' ? 'dark' : 'light'));

export const modulo = (a: number, b: number) => ((a % b) + b) % b;
