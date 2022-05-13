<script>
  import Mouse from '$lib/Mouse.svelte';
  import '../global.css';
  import { onMount } from 'svelte';

  let mobile = false;
  onMount(() => {
    mobile = 'ontouchstart' in document.documentElement;
  });
</script>

<slot />
{#if !mobile}
  <Mouse />
{/if}
