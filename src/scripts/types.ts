import type { loadTranslations } from '../i18n/loader';
import type { loaders } from '../i18n/loader';

export type PartialDict = { [key: string]: string | PartialDict };
export type Dict = NonNullable<Awaited<ReturnType<typeof loadTranslations>>>;

export type Path = keyof typeof loaders[Locale];

export const locales = ['en', 'nl'] as const;
export type Locale = typeof locales[number];

export const themes = ['dark', 'light', 'auto'] as const;
export type Theme = typeof themes[number];

export const isType = <T>(t: unknown, l: readonly T[]): t is T => l.includes(t as T);

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export const mutable = <T>(t: T) => t as Mutable<T>;

export type Intersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

export const intersect = <U>(obj: U) => obj as Intersection<U>;
