import type { Dict, PartialDict } from '../scripts/types';
import { dict } from '../scripts/stores';
import { derived } from 'svelte/store';
import type { Page } from '@sveltejs/kit';
import { page } from '$app/stores';
import routes from './routes';
import type { Path } from '../scripts/types';

const specialCharacters = new Map([
  ['_', '\u00A0'],
  ['`', '\u2018'],
  ["'", '\u2019'],
]);

const regExpReplace = (text: string, k: string, v: string) => text.replace(new RegExp(k, 'g'), v);

export const translate = (dict: Dict, page: Page, key: string, vars?: Record<string, string>) => {
  const { routeId } = page;
  const path = `/${routeId}`;

  const route = key.startsWith('g.') ? 'global' : routes[path as Path];

  let partialDict: string | PartialDict | undefined = dict[route];
  if (!partialDict) throw new Error(`No translations found for path '${path}'.`);

  const parsedKeys = key.replace(/^g\./, '').split('.');
  for (const key of parsedKeys) {
    if (typeof partialDict == 'string' || !(key in partialDict))
      throw new Error(`Key '${key}' not found for path '${path}'.`);

    partialDict = (partialDict as PartialDict)[key];
  }

  if (typeof partialDict != 'string') throw new Error(`Key '${key}' not found for path '${path}'.`);
  let text = partialDict;

  if (vars) for (const k in vars) text = text.replace(`{${k}}`, vars[k]);

  specialCharacters.forEach((v, k) => (text = regExpReplace(text, k, v)));

  if (text.match('</?[^>]*>')) return { html: text, text: regExpReplace(text, '</?[^>]*>', '') };

  return text;
};

export const t = derived([dict, page], ([dict, page]) => (key: string, vars?: {}) => {
  try {
    const translation = translate(dict, page, key, vars);
    if (typeof translation === 'object') return translation.text;
    else return translation;
  } catch (e) {
    // console.warn(e);
    return '';
  }
});
