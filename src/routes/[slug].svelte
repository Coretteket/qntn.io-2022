<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { env } from '$env/dynamic/public';

  export const load: Load = async ({ params: { slug } }) => {
    const redirect = env[`PUBLIC_SLUG_${slug.toUpperCase()}`];
    if (redirect) return { status: 301, redirect: encodeURI(redirect) };
    else return { status: 404 };
  };
</script>
