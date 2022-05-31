import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const acceptLanguageHeader = event.request.headers.get('accept-language') || 'en';
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

  const locale = cookies.locale || acceptLanguageHeader.substring(0, 2);
  const theme = cookies.theme || 'auto';

  event.locals = { locale, theme };

  const rendered = await resolve(event, {
    transformPage: ({ html }) =>
      html.replace('lang="en"', `lang="${locale}" data-theme="${theme}"`),
  });
  return rendered;
}

export const getSession: GetSession = (event) => {
  return { locale: event.locals.locale, theme: event.locals.theme };
}
