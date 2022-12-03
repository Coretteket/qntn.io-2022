import type { Context } from 'https://edge.netlify.com';
import { matchTheme } from '../../src/scripts/types.ts';

const themeDetect = `
  <script>
    document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")
  </script>
`;

const getTheme = (request: Request, context: Context) => {
  const url = new URL(request.url);

  const searchTheme = matchTheme(url.searchParams.get('theme'));
  const cookieTheme = matchTheme(context.cookies.get('theme'));
  const headerTheme = matchTheme(request.headers.get('sec-ch-prefers-color-scheme'));

  const theme = searchTheme ?? cookieTheme ?? headerTheme ?? 'light';
  return [theme, theme !== cookieTheme] as const;
};

export default async function setTheme(request: Request, context: Context) {
  const response = await context.next();
  if (!response.headers.get('content-type')?.includes('text/html')) return;

  const [theme, needsCookie] = getTheme(request, context);
  if (needsCookie) context.cookies.set({ name: 'theme', value: theme, path: '/', sameSite: 'Lax' });

  const text = await response.text();

  let html = theme ? text.replace(/(data-theme=")auto"/, `$1${theme}"`) : text.replace('(</head>)', `${themeDetect}$1`);
  html = html.replace('?theme=', `?theme=${theme === 'dark' ? 'light' : 'dark'}`);

  response.headers.set('accept-ch', 'sec-ch-prefers-color-scheme');
  return new Response(html, response);
}
