<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  const redir = {
    twitter: 'https://twitter.com/coretteket',
    github: 'https://github.com/coretteket',
    linkedin: 'https://www.linkedin.com/in/qcoret/',
    feit: 'https://docs.google.com/document/d/1UeTlVLlBv6X6TB_nUJgCZukggSW8raRi5yoGkP_IvvY',
  };

  export const load: Load = async ({ params }) => {
    const slug = params.slug as keyof typeof redir;
    if (slug in redir) return { status: 302, redirect: redir[slug] };
    else return { status: 404 };
  };
</script>
