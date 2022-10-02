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

/** Polyfill for window.requestIdleCallback(). */
export const shim = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  const timeout = options?.timeout ?? 50;
  const start = Date.now();

  return setTimeout(function () {
    callback({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, timeout - (Date.now() - start));
      },
    });
  }, 1);
};
