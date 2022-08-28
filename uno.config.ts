// https://uno.antfu.me/

import { defineConfig, presetUno, presetIcons, transformerCompileClass } from 'unocss';

import dotenv from 'dotenv';
dotenv.config();

const createVariant = (v: string, selector: (s: string) => string) => (m: string) =>
  m.startsWith(v) ? { matcher: m.slice(v.length), selector: selector } : undefined;

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ extraProperties: { display: 'inline-block', 'font-size': '1.25rem' } }),
  ],
  transformers: [
    transformerCompileClass({
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
