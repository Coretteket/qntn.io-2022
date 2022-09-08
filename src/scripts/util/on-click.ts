export const onClick = (selector: string, fn: () => void) => {
  document.querySelectorAll(selector).forEach((el) => el.addEventListener('click', fn));
};
