<script>
  import { theme } from '../scripts/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';

  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
    document.cookie = `theme=${$theme}`;
  }

  onMount(() => {
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') $theme = prefers ? 'dark' : 'light';
  });
</script>

<svelte:head>
  <script>
    if ('auto' === document.documentElement.getAttribute('data-theme')) {
      const p = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', p ? 'dark' : 'light');
    }
  </script>
</svelte:head>
