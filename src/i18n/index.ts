import { isType, paths, type Dict, type Locale, type Route } from '../scripts/types';
import { dict } from '../scripts/stores';
import { derived } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { page } from '$app/stores';
import { routes, type Path } from '../scripts/types';

const loader = (locale: Locale, route: Route) => import(`../i18n/${locale}/${route}.json`);

export const loadTranslations = async (
  session: App.Session,
  url: URL | '*'
): Promise<Partial<Dict>> => {
  const pathname = url === '*' ? '*' : url.pathname;
  if (!isType(pathname, paths)) return {};

  const { locale } = session;
  const route = routes[pathname];
  const routeLoader = await loader(locale, route);

  return { [route]: routeLoader };
};

export const translate = (
  dict: Dict,
  page: Page,
  key: string,
  vars?: Record<string, string>
): string => {
  const { routeId } = page;

  const global = key.startsWith('g.');
  const route: Route = global ? 'global' : routes[('/' + routeId) as Path];

  const routedDict = dict[route];
  const parsedKey = key.replace(/^g\./, '');

  if (!routedDict || !routedDict[parsedKey]) return key;

  let text = routedDict[parsedKey];

  if (vars) {
    Object.entries(vars).forEach((e) => {
      text = text.replace(`{${e[0]}}`, e[1]);
    });
  }

  return text;
};

export const t = derived(
  [dict, page],
  ([dict, page]) =>
    (key: string, vars?: {}) =>
      translate(dict, page, key, vars)
);
