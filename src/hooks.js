import cookie from 'cookie';

export async function handle({ event, resolve }) {
  const acceptLanguageHeader = event.request.headers.get('accept-language') || 'en';
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const locale = cookies['locale'] || acceptLanguageHeader.substring(0, 2);
  const theme = cookies['theme'] || 'auto';
  event.locals = { locale, theme };
  const rendered = await resolve(event, {
    transformPage: ({ html }) =>
      html.replace('lang="en"', `lang="${locale}" data-theme="${theme}"`),
  });
  return rendered;
}

export function getSession(event) {
  return { locale: event.locals.locale, theme: event.locals.theme };
}
