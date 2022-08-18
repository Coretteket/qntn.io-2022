<script>
  import { theme, locale } from '../../scripts/stores';
  import { session } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    locale.subscribe((locale) => {
      document.documentElement.setAttribute('lang', locale);
      document.cookie = `locale=${locale}`;
      $session.locale = locale;
    });

    theme.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = `theme=${theme}`;
      $session.theme = theme;
    });

    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') $theme = prefers ? 'dark' : 'light';
  });
</script>
