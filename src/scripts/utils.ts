/** Returns true if path is a localized route. */
export const isLocalized = (href: string) => /^\/(en|nl)(\W|$)/.test(new URL(href).pathname);

/** Returns true if path is a public file. */
export const isPublic = (href: string) => /(@vite|\.\w+$)/.test(new URL(href).pathname);

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
export const define = (name: `${string}-${string}`) => (constructor: CustomElementConstructor) =>
  customElements.define(name, constructor);