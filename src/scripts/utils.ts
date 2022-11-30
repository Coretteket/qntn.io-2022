import type { MDXInstance } from 'astro';
import { state } from './translate';

/** Helper function to disable transition until a function has been called. */
export const disableTransition = (fn: (d: HTMLElement) => void) => {
  const d = document.documentElement;
  d.setAttribute('data-transition', 'false');
  fn(d);
  d.offsetHeight; // force browser to re-render
  d.removeAttribute('data-transition');
};

/** Helper function to omit key from object. */
export const omit = <T extends Record<string, any>>(key: string, obj: T) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

/** Decorator that defines a custom element. */
export const define = (name: `${string}-${string}`) => (constructor: CustomElementConstructor) => {
  return customElements.define(name, constructor);
};

/** Format a number in the current locale with either compact or standard notation.
 * @param mode Defaults to compact.
 */
export const format = (value: number, mode: 'compact' | 'standard' = 'compact') => {
  return new Intl.NumberFormat(state.locale, { notation: mode }).format(value);
};

/** Capitalizes the first letter of a string. */
export const capitalize = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

export const getBlogSlug = <T extends Record<string,any>>(post: MDXInstance<T>) => post.file.replace(/.*\/(.+).mdx/, '$1');