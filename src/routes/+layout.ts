import type { LayoutLoad } from './$types';
import { loadTranslations } from '../i18n/loader';
import { dict, locale, theme } from '../scripts/stores';

export const load: LayoutLoad = async ({ url, data }) => {
  theme.set(data.theme);
  locale.set(data.locale);

  const global = await loadTranslations(data.locale, '*');
  if (global) dict.update((dict) => ({ ...dict, ...global }));
  const routes = await loadTranslations(data.locale, url);
  if (routes) dict.update((dict) => ({ ...dict, ...routes }));

  return { path: url.pathname };
};
