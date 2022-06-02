<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  const redir = {
    twitter: 'https://twitter.com/coretteket',
    github: 'https://github.com/coretteket',
    linkedin: 'https://www.linkedin.com/in/qcoret/',
  };

  let slug: keyof typeof redir;

  export const load: Load = async ({ params }) => {
    slug = params.slug as typeof slug;
    console.debug(params);
    console.debug(slug);
    console.debug(redir[slug]);
    console.debug(encodeURIComponent(redir[slug]));
    if (!(slug in redir)) return { status: 404 };
    else return {};
  };
</script>

{slug}<br>
{redir[slug]}<br>
{encodeURIComponent(redir[slug])}