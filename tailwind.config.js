const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const fluidType = require('tailwindcss-fluid-text');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'], // or 'media' or 'class'
  plugins: [
    // https://github.com/davidhellmann/tailwindcss-fluid-type#readme
    fluidType({
      settings: {
        prefix: 'fluid-',
        screenMax: 64,
        ratioMin: 1.1,
        ratioMax: 1.225,
      },
    }),
    plugin(({ addVariant }) => {
      addVariant('kid', '&>*');
    }),
    typography,
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font)', defaultTheme.fontFamily.sans] },
      screens: { '3xs': '350px', '2xs': '400px', xs: '448px' },
      borderRadius: { '4xl': '2rem' },
      maxWidth: { blog: '38rem', wide: '48rem', content: '64rem' },
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#ECEDEE',
          200: '#CDCFD1',
          300: '#AFB3B6',
          400: '#8F9498',
          500: '#72777C',
          600: '#5A5E62',
          700: '#424548',
          800: '#2A2B2D',
          900: '#111213',
        },
      },
    },
  },
};
