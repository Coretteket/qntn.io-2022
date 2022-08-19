import routes from '../i18n/routes';

export type PartialDict = { [key: string]: string | PartialDict };
export type Dict = Partial<Record<Route, PartialDict>>;

export type Route = typeof routes[Path];

export const paths = Object.keys(routes) as Readonly<Path[]>;
export type Path = keyof typeof routes;

export const locales = ['en', 'nl'] as const;
export type Locale = typeof locales[number];

export const themes = ['dark', 'light', 'auto'] as const;
export type Theme = typeof themes[number];

export const isType = <T>(t: unknown, l: readonly T[]): t is T => l.includes(t as T);

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export const mutable = <T>(t: T) => t as Mutable<T>;
