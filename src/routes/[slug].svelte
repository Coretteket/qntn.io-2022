<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  const redir = {
    twitter: 'https://twitter.com/coretteket',
    github: 'https://github.com/coretteket',
    linkedin: 'https://www.linkedin.com/in/qcoret/',
  };

  export const load: Load = async ({ params }) => {
    const slug = params.slug as keyof typeof redir;
    if (slug in redir) return { status: 301, redirect: encodeURI(redir[slug]) };
    else return { status: 404 };
  };
</script>