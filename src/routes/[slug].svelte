<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  const redir = {
    twitter: 'https://twitter.com/coretteket',
    github: 'https://github.com/coretteket',
    linkedin: 'https://www.linkedin.com/in/qcoret/',
  };

  export const load: Load = async () => {
    return { status: 302, redirect: 'https://github.com/coretteket/' };
  };
</script>