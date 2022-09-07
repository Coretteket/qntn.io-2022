import { flatten } from '../scripts/util/nest-deep';
import { intersect, type Locale, type Path } from '../scripts/types';

export const loaders = {
  en: {
    '*': () => import('./en/global'),
    '/': () => import('./en/home'),
    '/about': () => import('./en/about'),
  },
  nl: {
    '*': () => import('./nl/global'),
    '/': () => import('./nl/home'),
    '/about': () => import('./nl/about'),
  },
};

const loader = async (locale: Locale, path: Path) => loaders[locale][path]();

export const loadTranslations = async (locale: Locale, url: URL | '*') => {
  const pathname = url === '*' ? '*' : (url.pathname as Path);
  if (pathname in loaders[locale])
    return flatten(intersect((await loader(locale, pathname)).default));
};

export const loadAllTranslations = async (locale: Locale, url: URL) => {
  const global = await loadTranslations(locale, '*');
  const routed = await loadTranslations(locale, url);
  if (routed && global) return { ...global, ...routed };
};
