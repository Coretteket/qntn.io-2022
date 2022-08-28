// https://uno.antfu.me/

import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerCompileClass,
  type SourceCodeTransformer,
} from 'unocss';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.UNO_TRIGGER);

const createVariant = (v: string, selector: (s: string) => string) => (m: string) =>
  m.startsWith(v) ? { matcher: m.slice(v.length), selector: selector } : undefined;

const createTransformer = <T extends (opts: {}) => SourceCodeTransformer>(
  transformer: T,
  opts: Parameters<T>[0] & { disable?: boolean }
) => {
  const t = transformer(opts);
  if (opts.disable) t.transform = () => {};
  return t;
};

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ extraProperties: { display: 'inline-block', 'font-size': '1.25rem' } }),
  ],
  transformers: [
    createTransformer(transformerCompileClass, {
      disable: false,
      trigger: process.env.UNO_TRIGGER,
      classPrefix: 'u-',
    }),
  ],
  variants: [
    createVariant('child:', (s) => `${s} > *`),
    createVariant('current:', (s) => `${s}[aria-current="true"]`),
    createVariant('dark:', (s) => `[data-theme="dark"] ${s}`),
  ],
});
