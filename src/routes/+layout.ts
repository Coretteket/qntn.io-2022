import type { Load } from '@sveltejs/kit';
import { theme, locale, dict } from '../scripts/stores';
import { loadTranslations } from '../i18n';

export const load: Load = async ({ url, session }) => {
  theme.set(session.theme);
  locale.set(session.locale);

  const global = await loadTranslations(session, '*');
  const route = await loadTranslations(session, url);
  dict.update((dict) => ({ ...dict, ...global, ...route }));

  return {};
};
