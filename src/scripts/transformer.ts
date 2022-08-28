import type { SourceCodeTransformer } from '@unocss/core';
import MagicString from 'magic-string';

export interface TransformerThemeOptions {
  /** Prefix for automatic coloring classes
   * @default "auto-"
   */
  prefix?: string;
}

export default function transformerTheme(
  options: TransformerThemeOptions = {}
): SourceCodeTransformer {
  const { prefix = 'auto-' } = options;

  return {
    name: 'variant-group',
    enforce: 'pre',
    transform(s) {
      const regexString = `([ "'\`]?)(${prefix}.*?-[0-9])([ "'\`]?)`;
      const regex = new RegExp(regexString, 'g');

      const matches = s.toString().match(regex);
      console.log(matches);
      matches?.forEach((match) => {
        const regex = new RegExp(regexString);
        const parts = regex.exec(match);
        if (!parts) return; // <-- this should never happen
        const [, start, selector, end] = parts;
        const split = selector.split(/([-: "'\`])/g);
        const number = 10 - Number(split.at(-1));
        const light = split.slice(2).join('');
        const dark = `dark:${split.slice(2, -1).join('')}${number}`;
        s.replace(match, `${start}${light} ${dark}${end}`);
      });
    },
  };
}
