export const locales = ['en', 'nl'] as const;
export const themes = ['light', 'dark', 'auto'] as const;

export type Locale = typeof locales[number];
export type Theme = typeof themes[number];

export const isType = <T>(l: readonly T[], t: unknown): t is T => l.includes(t as T);
export const parseType = <T>(l: readonly T[], t: unknown, d: T): T => (isType(l, t) ? t : d);

export const parseLocale = (t: unknown, d: Locale): Locale => parseType(locales, t, d);
export const parseTheme = (t: unknown, d: Theme): Theme => parseType(themes, t, d);
