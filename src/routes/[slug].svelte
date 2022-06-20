<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ params: { slug } }) => {
    const redir = import.meta.env[`VITE_SLUG_${slug.toUpperCase()}`];
    if (redir) return { status: 302, redirect: encodeURI(redir) };
    else return { status: 404 };
  };
</script>
