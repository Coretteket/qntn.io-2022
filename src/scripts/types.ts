import type { loaders } from './translate';

export const locales = ['en', 'nl'] as const;
export const themes = ['light', 'dark'] as const;

export type Locale = typeof locales[number];
export type Theme = typeof themes[number];
export type Translations = Awaited<ReturnType<typeof loaders[Locale]>>['default'];

export const matchType =
  <T>(l: readonly T[]) =>
  (t: unknown): T | null =>
    l.includes(t as T) ? (t as T) : null;

export const matchLocale = matchType(locales);
export const matchTheme = matchType(themes);

export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
