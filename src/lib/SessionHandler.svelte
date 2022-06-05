<script>
  import { theme, locale } from '../scripts/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { session } from '$app/stores';

  $: if (browser) {
    document.documentElement.setAttribute('lang', $locale);
    document.cookie = `locale=${$locale}`;
    $session.locale = $locale;
  }

  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
    document.cookie = `theme=${$theme}`;
    $session.theme = $theme;
  }

  onMount(() => {
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') $theme = prefers ? 'dark' : 'light';
  });
</script>
