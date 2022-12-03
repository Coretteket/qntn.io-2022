import type { Context } from 'https://edge.netlify.com';
import { matchTheme } from '../../src/scripts/types.ts';

const themeDetect = `
  <script>
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = \`theme=\${theme}; path=/; sameSite=Lax\`;
  </script>
`;

/** Retrieves the user's preferred color scheme from the request parameters and cookies. Checks the query string, cookies, and headers for a known color scheme, and returns the first match it finds.  */
const getTheme = (request: Request, context: Context) => {
  const url = new URL(request.url);

  const searchTheme = matchTheme(url.searchParams.get('theme'));
  const cookieTheme = matchTheme(context.cookies.get('theme'));
  const headerTheme = matchTheme(request.headers.get('sec-ch-prefers-color-scheme'));

  const theme = searchTheme ?? cookieTheme ?? headerTheme;
  return theme;
};

/** Sets the user's preferred color scheme in cookies and applies it to the response HTML. Retrieves the user's preferred color scheme using `getTheme`, sets it in a cookie, and then modifies the HTML of the response to apply the color scheme, or inject a script to detect one client-side. */
export default async function setTheme(request: Request, context: Context) {
  const response = await context.next();
  if (!response.headers.get('content-type')?.includes('text/html')) return;

  const theme = getTheme(request, context);
  if (theme) context.cookies.set({ name: 'theme', value: theme, path: '/', sameSite: 'Lax' });

  const text = await response.text();

  let html = theme ? text.replace(/(data-theme=")auto"/, `$1${theme}"`) : text.replace(/(<\/head>)/, `${themeDetect}$1`);
  html = html.replace('?theme=', `?theme=${theme === 'light' ? 'dark' : 'light'}`);

  response.headers.set('accept-ch', 'sec-ch-prefers-color-scheme');
  return new Response(html, response);
}
