// https://uno.antfu.me/

import { defineConfig, presetUno, presetIcons, transformerCompileClass } from 'unocss';
import transformerTheme from './src/scripts/transformer';

import dotenv from 'dotenv';
dotenv.config();

const createVariant = (v: string, selector: (s: string) => string) => (m: string) =>
  m.startsWith(v) ? { matcher: m.slice(v.length), selector: selector } : undefined;

export default defineConfig({
  presets: [
    presetUno({
      dark: { dark: "[data-theme='dark']" },
    }),
    presetIcons({ extraProperties: { display: 'inline-block', 'font-size': '1.25rem' } }),
  ],
  transformers: [
    transformerTheme({
      prefix: process.env.UNO_THEME_TRIGGER,
    }),
    transformerCompileClass({
      trigger: process.env.UNO_COMPILE_TRIGGER,
    }),
  ],
  variants: [
    createVariant('child:', (s) => `${s} > *`),
    createVariant('current:', (s) => `${s}[aria-current="true"]`),
    createVariant('auto:', (s) => s), // here for vscode extension
  ],
});
