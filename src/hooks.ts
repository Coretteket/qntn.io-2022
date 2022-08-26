import { isType, locales, themes, mutable } from './scripts/types';
import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;

  const acceptLang = headers.get('accept-language') ?? '';
  const acceptPrefers = headers.get('sec-ch-prefers-color-scheme');
  const cookies = parse(headers.get('cookie') ?? '');

  const localeHeader = acceptLang.includes('nl') ? 'nl' : 'en';
  const locale = isType(cookies.locale, locales) ? cookies.locale : localeHeader;

  // const themeHeader = isType(acceptPrefers, themes) ? acceptPrefers : 'auto';
  const theme = isType(cookies.theme, themes) ? cookies.theme : 'auto';

  event.locals = { locale, theme };

  // media query for theme auto
  const themeDetect = `
    <script>document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")</script>
  `;

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('<html>', `<html lang="${locale}" data-theme="${theme}">`)
        .replace('<head>', `<head>${theme === 'auto' ? themeDetect : ''}`),
  });

  // set experimental client hints
  // response.headers.set('accept-ch', 'sec-ch-prefers-color-scheme');
  // response.headers.set('vary', 'sec-ch-prefers-color-scheme');

  return response;
};
