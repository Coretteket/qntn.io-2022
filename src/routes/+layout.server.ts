import { loadTranslations } from '../locales/loader';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const global = await loadTranslations(locals.locale, '*');
  const routes = await loadTranslations(locals.locale, url);
  return { ...locals, dict: { global, routes } };
};
