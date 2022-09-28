import { state } from "./translate";
import { Locale, locales, Theme, themes } from "./types";

export const isType = <T>(l: readonly T[], t: unknown): t is T => l.includes(t as T);
export const parseType = <T>(l: readonly T[], t: unknown, d: T): T => (isType(l, t) ? t : d);

export const isLocale = (l: unknown): l is Locale => isType(locales, l);
export const isTheme = (t: unknown): t is Theme => isType(themes, t);

export const parseLocale = (t: unknown, d: Locale): Locale => parseType(locales, t, d);
export const parseTheme = (t: unknown, d: Theme): Theme => parseType(themes, t, d);


export const disableTransition = (fn: () => void) => {
  const d = document.documentElement;
  d.setAttribute('data-transition', 'false');
  fn();
  d.offsetHeight; // force browser to re-render
  d.removeAttribute('data-transition');
};
