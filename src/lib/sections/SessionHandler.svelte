<script lang="ts">
  import { locale, theme } from '../../scripts/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    locale.subscribe((locale) => {
      document.documentElement.setAttribute('lang', locale);
    });

    theme.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    });

    const prefers = window.matchMedia('(prefers-color-scheme: dark)');
    if ($theme == 'auto') theme.set(prefers.matches ? 'dark' : 'light');
  });
</script>
