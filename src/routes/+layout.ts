import type { LayoutLoad } from './$types';
import { dict, locale, theme } from '../scripts/stores';

export const load: LayoutLoad = async ({ data }) => {
  const { global, routes } = data.dict;
  if (global) dict.update((dict) => ({ ...dict, ...global }));
  if (routes) dict.update((dict) => ({ ...dict, ...routes }));
  theme.set(data.theme);
  locale.set(data.locale);
};
