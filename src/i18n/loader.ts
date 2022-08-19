import { isType, paths, type Dict, type Locale, type Route } from '../scripts/types';
import routes from './routes';

const files = import.meta.glob('../i18n/*/*.json');

const loader = (locale: Locale, route: Route) => files[`./${locale}/${route}.json`]();

export const loadTranslations = async (locale: Locale, url: URL | '*'): Promise<Dict> => {
  const pathname = url === '*' ? '*' : url.pathname;
  if (!isType(pathname, paths)) return {};

  const route = routes[pathname];
  const routeLoader = await loader(locale, route);

  return { [route]: routeLoader };
};
