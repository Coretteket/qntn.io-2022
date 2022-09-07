import type { LayoutLoad } from './$types';
import { dict, locale, theme } from '../scripts/stores';
import { loadAllTranslations } from '../locales/loader';

export const load: LayoutLoad = async ({ data, url }) => {
  const translations = await loadAllTranslations(data.locale, url);
  if (translations) dict.update((d) => ({ ...d, ...translations }));

  theme.set(data.theme);
  locale.set(data.locale);
};
