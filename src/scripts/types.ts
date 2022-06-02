export type Translations = Record<Locale, Record<Route, Record<string, string>>>;

export const routes = ['global', 'index'] as const;
export type Route = typeof routes[number];

export const locales = ['en', 'nl'] as const;
export type Locale = typeof locales[number];

export const themes = ['dark', 'light', 'auto'] as const;
export type Theme = typeof themes[number];

export const isType = <T>(t: any, l: readonly T[]): t is T => l.includes(t as T);