<script lang="ts">
  import type { LayoutData } from '../../routes/$types';
  import { dict, locale, theme } from '../../scripts/stores';
  import { onMount } from 'svelte';
  import { loadTranslations } from '../../i18n';
  import { page } from '$app/stores';

  export let data: LayoutData;

  theme.set(data.theme);
  locale.set(data.locale);
  dict.update((dict) => ({ ...dict, ...data.global, ...data.routes }));

  onMount(async () => {
    locale.subscribe(async (locale) => {
      document.documentElement.setAttribute('lang', locale);
      document.cookie = `locale=${locale}`;
      const global = await loadTranslations(locale, '*');
      const routes = await loadTranslations(locale, $page.url);
      dict.update((dict) => ({ ...dict, ...global, ...routes }));
    });

    theme.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = `theme=${theme}`;
    });

    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ($theme == 'auto') theme.set(prefers ? 'dark' : 'light');
  });
</script>
