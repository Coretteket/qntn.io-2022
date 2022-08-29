import type { LayoutLoad } from './$types';
import { loadTranslations } from '../locales/loader';
import { dict } from '../scripts/stores';
import type { Locale, Theme } from 'src/scripts/types';

export const load: LayoutLoad = async ({ url, data }) => {
  const global = await loadTranslations(data.locale, '*');
  if (global) dict.update((dict) => ({ ...dict, ...global }));
  const routes = await loadTranslations(data.locale, url);
  if (routes) dict.update((dict) => ({ ...dict, ...routes }));
  return data as { theme: Theme; locale: Locale };
};
