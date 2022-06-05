import type { Dict, Locale } from '../scripts/types';
import { dict } from '../scripts/stores';
import { derived } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { page } from '$app/stores';
import routesJson from './routes.json';

const loader = (locale: Locale, path: string) => import(`../i18n/${locale}/${path}.json`);
const routes: Record<string, string> = routesJson;

export const loadTranslations = async (session: App.Session, url: URL): Promise<Dict> => {
  const { locale } = session;
  const { pathname } = url;

  const route = routes[pathname];

  const global = routes['*'];

  const routeLoader = await loader(locale, route);
  const globalLoader = await loader(locale, global);

  return { [route]: routeLoader, global: globalLoader };
};

export const translate = (dict: Dict, page: Page, key: string): string => {
  const { routeId } = page;

  const global = key.startsWith('g.');
  const route = global ? 'global' : routes['/' + routeId];

  if (!route) throw new Error(`No route found for /${routeId}.`);

  let parsedKey = key.replace(/^g\./, '');

  if (!(route in dict)) throw new Error(`Route ${route} not found in dict.`);
  if (!(parsedKey in dict[route])) throw new Error(`Key ${parsedKey} not found in dict.${route}.`);

  return dict[route][parsedKey];
};

export const t = derived(
  [dict, page],
  ([dict, page]) =>
    (key: string) =>
      translate(dict, page, key)
);
