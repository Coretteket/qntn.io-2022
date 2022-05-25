export async function handle({ event, resolve }) {
  const acceptLanguageHeader = event.request.headers.get('accept-language') || '';
  const locale = acceptLanguageHeader.substring(0, 2) == 'nl' ? 'nl' : 'en';
  event.locals = { locale };
  const rendered = await resolve(event, {
    transformPage: ({ html }) => html.replace('lang="en"', `lang="${locale}"`),
  });
  return rendered;
}

export function getSession(event) {
  return { locale: event.locals.locale };
}
