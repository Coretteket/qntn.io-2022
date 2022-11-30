import type { Context } from 'https://edge.netlify.com';

const themeDetect = `
  <script>
    document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")
  </script>
`;

export default async function theme(request: Request, context: Context) {
  const response = await context.next();
  if (!response.headers.get('content-type')?.includes('text/html')) return;

  const theme = context.cookies.get('theme') ?? request.headers.get('sec-ch-prefers-color-scheme');

  const text = await response.text();

  const html = theme
    ? text.replace('data-theme="auto"', `data-theme="${theme}"`)
    : text.replace('</head>', `${themeDetect}</head>`);

  response.headers.set('accept-ch', 'sec-ch-prefers-color-scheme');
  return new Response(html, response);
}
