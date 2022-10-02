import type { loaders } from './translate';

export const locales = ['en', 'nl'] as const;
export const themes = ['light', 'dark', 'auto'] as const;

export type Locale = typeof locales[number];
export type Theme = typeof themes[number];
export type Translations = Awaited<ReturnType<typeof loaders[Locale]>>['default'];

export const isType = <T>(l: readonly T[], t: unknown): t is T => l.includes(t as T);
export const parseType = <T>(l: readonly T[], t: unknown, d: T): T => (isType(l, t) ? t : d);

export const isLocale = (l: unknown): l is Locale => isType(locales, l);
export const isTheme = (t: unknown): t is Theme => isType(themes, t);

export const parseLocale = (t: unknown, d: Locale): Locale => parseType(locales, t, d);
export const parseTheme = (t: unknown, d: Theme): Theme => parseType(themes, t, d);

declare global {
  interface Window {
    /** Whether or not to refetch already prefetched pages,
     *  by including a `cache-control: no-cache` header. */
    refetchCachedPages: boolean;
  }

  interface Navigator {
    connection: {
      /** Returns true if the user has set a reduced data
       * usage option on the user agent. */
      saveData: boolean;
      /** Returns the effective type of the connection meaning
       *  one of 'slow-2g', '2g', '3g', or '4g'. This value is
       *  determined using a combination of recently observed
       * round-trip time and downlink values. */
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    }
  }
}
