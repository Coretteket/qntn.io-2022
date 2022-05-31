export type Theme = 'dark' | 'light' | 'auto';

export type Translations = Record<Locale, Record<Route, Record<string, string>>>;
export type Locale = 'en' | 'nl';

export const routes = ['global', 'index'] as const;
export type Route = typeof routes[number];

export const isRoute = (r: unknown): r is Route => typeof r == 'string' && routes.includes(r as Route);
