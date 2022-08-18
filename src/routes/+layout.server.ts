import { loadTranslations } from '../i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals: { theme, locale } }) => {
  const global = await loadTranslations(locale, '*');
  const routes = await loadTranslations(locale, url);

  return { theme, locale, global, routes };
};
