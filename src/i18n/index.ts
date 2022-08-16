import {
  isType,
  paths,
  type Dict,
  type Locale,
  type PartialDict,
  type Route,
} from '../scripts/types';
import { dict } from '../scripts/stores';
import { derived } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { page } from '$app/stores';
import { routes, type Path } from '../scripts/types';

const files = import.meta.glob('../i18n/*/*.json');

const loader = (locale: Locale, route: Route) => files[`./${locale}/${route}.json`]();

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
): string | null => {
  const { routeId } = page;

  const global = key.startsWith('g.');
  const route = global ? 'global' : routes[('/' + routeId) as Path];

  const parsedKeys = key.replace(/^g\./, '').split('.');
  let partialDict: string | PartialDict = dict[route];
  if (!partialDict) return null;

  let text: string;
  for (const key of parsedKeys) {
    if (typeof partialDict == 'string') return null;
    partialDict = (partialDict as PartialDict)[key];
  }

  if (typeof partialDict != 'string') return null;
  text = partialDict;

  if (vars) for (const k in vars) text = text.replace(`{${k}}`, vars[k]);

  const replace = new Map([
    ['_', '&nbsp;'],
    ['`', '&lsquo;'],
    ["'", '&rsquo;'],
    ['\\*(.*)\\*', '<i>$1</i>'],
  ]);

  replace.forEach((v, k) => (text = text.replace(new RegExp(k, 'g'), v)));

  return text;
};

export const t = derived(
  [dict, page],
  ([dict, page]) =>
    (key: string, vars?: {}) =>
      translate(dict, page, key, vars)
);
