import type { loaders } from './translate';

export const locales = ['en', 'nl'] as const;
export const themes = ['light', 'dark'] as const;

export type Locale = typeof locales[number];
export type Theme = typeof themes[number];
export type Translations = Awaited<ReturnType<typeof loaders[Locale]>>['default'];

export const isType =
  <T>(l: readonly T[]) =>
  (t: any): t is T =>
    l.includes(t as T);
export const parseType =
  <T>(l: readonly T[]) =>
  (t: any): T =>
    l.includes(t as T) ? t : l[0];
export const matchType =
  <T>(l: readonly T[]) =>
  (t: any): T | null =>
    l.includes(t as T) ? t : null;

export const isLocale = isType(locales);
export const isTheme = isType(themes);

export const parseLocale = parseType(locales);
export const parseTheme = parseType(themes);

export const matchLocale = matchType(locales);
export const matchTheme = matchType(themes);

export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
