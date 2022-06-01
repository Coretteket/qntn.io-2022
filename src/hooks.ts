import { isType, locales, themes, type Locale, type Theme } from './scripts/types';
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const acceptLang = headers.get('accept-language')?.substring(0, 2);
  const cookies = cookie.parse(headers.get('cookie') || '');

  const localeHeader = isType<Locale>(acceptLang, locales) ? acceptLang : 'en';
  const locale = isType<Locale>(cookies.locale, locales) ? cookies.locale : localeHeader;
  const theme = isType<Theme>(cookies.theme, themes) ? cookies.theme : 'auto';

  event.locals = { locale, theme };

  const rendered = await resolve(event, {
    transformPage: ({ html }) =>
      html.replace('<html lang="en">', `<html lang="${locale}" data-theme="${theme}">`),
  });
  return rendered;
};

export const getSession: GetSession = ({ locals }) => {
  return { locale: locals.locale, theme: locals.theme };
};
