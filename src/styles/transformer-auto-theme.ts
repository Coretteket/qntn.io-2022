import type { SourceCodeTransformer } from '@unocss/core';

export interface TransformerAutoThemeOptions {
  /** Prefix for automatic coloring classes
   * @default "theme:"
   */
  prefix?: string;
}

export default function transformerAutoTheme(
  options: TransformerAutoThemeOptions = {}
): SourceCodeTransformer {
  const { prefix = 'theme:' } = options;

  return {
    name: 'auto-theme',
    enforce: 'pre',
    transform(s) {
      const regexString = `([ "'\`]?)(${prefix}.*?-[0-9])([ "'\`]?)`;
      const regex = new RegExp(regexString, 'g');
      const matches = s.toString().match(regex);
      matches?.forEach((match) => {
        const regex = new RegExp(regexString);
        const [, start, selector, end] = regex.exec(match)!;
        const split = selector.split(/([-: "'\`])/g);
        const number = 10 - Number(split.at(-1));
        const light = split.slice(2).join('');
        const dark = `dark:${split.slice(2, -1).join('')}${number}`;
        s.replace(match, `${start}${light} ${dark}${end}`);
      });
    },
  };
}
