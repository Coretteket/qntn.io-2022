<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ status }) => ({
    props: { status },
  });
</script>

<script lang="ts">
  export let status: string;
</script>

<h1>{status}</h1>
