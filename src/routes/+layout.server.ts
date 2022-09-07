import { loadAllTranslations } from '../locales/loader';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  await loadAllTranslations(locals.locale, url); // necessary to not break router
  return locals;
};
