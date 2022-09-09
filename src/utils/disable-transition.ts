export const disableTransition = (fn: () => void) => {
  const d = document.documentElement;
  d.setAttribute('data-transition', 'false');
  fn();
  d.offsetHeight; // force browser to re-render
  d.removeAttribute('data-transition');
};
