import type { MarkdownInstance, MDXInstance } from 'astro';
import { state } from './translate';

/** Helper function to disable transition until a function has been called. */
export const disableTransition = (fn: (d: HTMLElement) => void) => {
  const d = document.documentElement;
  d.setAttribute('data-transition', 'false');
  fn(d);
  d.offsetHeight; // force browser to re-render
  d.removeAttribute('data-transition');
};

/** Replaces an element into a new tag, while preserving attributes. */
export const changeTag = (parent: Element, original: Element, tag: string) => {
  const button = document.createElement(tag);
  button.innerHTML = original.innerHTML;
  Array.from(original.attributes).forEach(({ name, value }) => button.setAttribute(name, value));
  parent.replaceChild(button, original);
  return button;
};

/** Turns an anchor into a button with a given `onclick`. */
export const createButtonFromAnchor = (parent: Element, onclick: () => any) => {
  const button = changeTag(parent, parent.children[0], 'button');
  button.addEventListener('click', onclick);
  button.setAttribute('type', 'button');
  button.removeAttribute('href');
  return button;
};

/** Warns and provides fallback image slug for content without assets. */
export const getImageSlug = (images: Record<string,any>[], slug: string, fallback = 'default') => {
  const found = images.filter((i) => (i.default.src as string).match(new RegExp(`\/${slug}.*\.png`))).length > 0;
  if (!found) console.warn(`[WARN] Using fallback image for '${slug}', please find a replacement.`)
  return found ? slug : fallback;
}

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