import type { Dict } from '../scripts/types';
import { dict } from '../scripts/stores';
import { derived } from 'svelte/store';

// const specialCharacters = new Map([
//   ['_', '\u00A0'],
//   ['`', '\u2018'],
//   ["'", '\u2019'],
// ]);

/** Replaces parameters such as `{foo}` with given values for translation strings. */
export const formatParams = (value: string, params: Record<string, string> | undefined) => {
  for (const param in params) {
    const regex = new RegExp(`{${param}}`, 'g');
    if (!value.match(regex)) throw new Error(`No parameter '${param}' found in '${value}'`);
    value = value.replace(regex, params[param]);
  }
  return value;
};

/** Localizes content based on a given `dictionary`, `key`, and optional `params`. */
export const translate = (key: keyof Dict, dict?: Dict, params?: Record<string, string>) => {
  if (!dict) throw new Error(`No dictionary loaded.`);
  if (!(key in dict)) throw new Error(`No key '${key}' found in dictionary.`);
  return formatParams(dict[key], params);
};

/** Localizes content based on a given `key` and optional `params`. */
export const t = derived(dict, (dict) => (key: keyof Dict, params?: Record<string, string>) => {
  try {
    return translate(key, dict, params);
  } catch (e) {
    console.warn(e);
    return '';
  }
});
