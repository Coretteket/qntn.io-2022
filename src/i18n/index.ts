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

export const translate = (
  dict: Dict,
  page: Page,
  key: string,
  vars?: Record<string, string>
): string => {
  const { routeId } = page;

  const global = key.startsWith('g.');
  const route = global ? 'global' : routes['/' + routeId];

  if (!route) throw new Error(`No route found for /${routeId}.`);
  if (!(route in dict)) throw new Error(`Route ${route} not found in dict.`);

  let parsedKey = key.replace(/^g\./, '');
  if (!(parsedKey in dict[route])) throw new Error(`Key ${parsedKey} not found in dict.${route}.`);

  let text = dict[route][parsedKey];

  if (vars)
    Object.entries(vars).forEach((e) => {
      text = text.replace(`{${e[0]}}`, e[1]);
      console.log(parsedKey);
    });

  return text;
};

export const t = derived(
  [dict, page],
  ([dict, page]) =>
    (key: string, vars?: {}) =>
      translate(dict, page, key, vars)
);
