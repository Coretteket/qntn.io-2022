<script>
  import { theme } from '../scripts/stores';
  import { locale } from '../i18n';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';

  $: if (browser) {
    document.documentElement.setAttribute('lang', $locale);
    document.cookie = `locale=${$locale}`;
  }

  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
    document.cookie = `theme=${$theme}`;
  }

  onMount(() => {
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') $theme = prefers ? 'dark' : 'light';
  });
</script>
