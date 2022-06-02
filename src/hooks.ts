import { isType, locales, themes, makeMutable, type Locale, type Theme } from './scripts/types';
import type { Handle, GetSession } from '@sveltejs/kit';
import { pick } from 'accept-language-parser';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;

  const acceptLang = headers.get('accept-language') || '';
  const pickAcceptLang = pick(makeMutable(locales), acceptLang, { loose: true });
  const acceptPrefers = headers.get('sec-ch-prefers-color-scheme');
  const cookies = cookie.parse(headers.get('cookie') || '');

  const localeHeader = pickAcceptLang || 'en';
  const locale = isType<Locale>(cookies.locale, locales) ? cookies.locale : localeHeader;

  const themeHeader = isType<Theme>(acceptPrefers, themes) ? acceptPrefers : 'auto';
  const theme = isType<Theme>(cookies.theme, themes) ? cookies.theme : themeHeader;

  event.locals = { locale, theme };

  const response = await resolve(event, {
    transformPage: ({ html }) =>
      html.replace('<html lang="en">', `<html lang="${locale}" data-theme="${theme}">`),
  });

  // set experimental client hints
  response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
  response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme');

  return response;
};

export const getSession: GetSession = ({ locals }) => {
  return { locale: locals.locale, theme: locals.theme };
};
