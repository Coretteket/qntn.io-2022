/** Returns true if path is a localized route. */
export const isLocalized = ({ pathname }: URL) => /^\/(en|nl)(\W|$)/.test(pathname);

/** Returns true if path is a public file. */
export const isPublic = ({ pathname }: URL) => /\.\w+$/.test(pathname);

/** Helper function to disable transition until a function has been called. */
export const disableTransition = (fn: () => void) => {
  const d = document.documentElement;
  d.setAttribute('data-transition', 'false');
  fn();
  d.offsetHeight; // force browser to re-render
  d.removeAttribute('data-transition');
};

/** Helper function to omit key from object. */
export const omit = <T extends Record<string, any>>(key: string, obj: T) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};