<script lang="ts">
  import { locale, theme } from '../../scripts/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    locale.subscribe((locale) => {
      document.documentElement.setAttribute('lang', locale);
      document.cookie = `locale=${locale}`;
    });

    theme.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = `theme=${theme}`;
    });

    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') theme.set(prefers ? 'dark' : 'light');
  });
</script>
