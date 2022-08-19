import type { LayoutLoad } from './$types';
import { loadTranslations } from '../i18n/loader';
import { dict, locale, theme } from '../scripts/stores';

export const load: LayoutLoad = async ({ url, data }) => {
  theme.set(data.theme);
  locale.set(data.locale);

  const global = await loadTranslations(data.locale, '*');
  const routes = await loadTranslations(data.locale, url);

  dict.update((dict) => ({ ...dict, ...global, ...routes }));

  return { path: url.pathname };
};
