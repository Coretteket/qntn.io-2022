import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';

export const config: Config = {
  translations: {
    en: { lang },
    cs: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'en',
      key: 'menu',
      loader: async () => (await import('./en/menu.json')).default,
    },
    {
      locale: 'nl',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./nl/home.json')).default,
    },
    {
      locale: 'nl',
      key: 'menu',
      loader: async () => (await import('./nl/menu.json')).default,
    },
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
