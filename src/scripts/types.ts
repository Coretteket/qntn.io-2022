import type { loaders } from './translate';

export const locales = ['en', 'nl'] as const;
export const themes = ['light', 'dark'] as const;

export type Locale = typeof locales[number];
export type Theme = typeof themes[number];
export type Translations = Awaited<ReturnType<typeof loaders[Locale]>>['default'];

export const isType = <T>(l: readonly T[]) => (t: unknown): t is T => l.includes(t as T);
export const parseType = <T>(l: readonly T[]) => (t: unknown): T => (isType(l)(t) ? t : l[0]);

export const isLocale = isType(locales);
export const isTheme = isType(themes);

export const parseLocale = parseType(locales);
export const parseTheme = parseType(themes);