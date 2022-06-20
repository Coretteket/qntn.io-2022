<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { theme, locale, dict } from '../scripts/stores';
  import { loadTranslations } from '../i18n';

  export const load: Load = async ({ url, session }) => {
    const { pathname } = url;
    if (pathname.endsWith('.woff2')) return {};

    theme.set(session.theme);
    locale.set(session.locale);

    const global = await loadTranslations(session, '*');
    const route = await loadTranslations(session, url);
    dict.update((dict) => ({ ...dict, ...global, ...route }));

    return {};
  };
</script>

<script lang="ts">
  import SessionHandler from '../lib/SessionHandler.svelte';
  import Navigation from '../lib/Navigation.svelte';
  import '@fontsource/fraunces/variable-full.css';
  import '@fontsource/mulish/variable.css';
  import '../app.css';
</script>

<SessionHandler />

<Navigation />

<main>
  <slot />
</main>

<style>
  main {
    max-width: --maxwidth;
    margin-inline: auto;
    padding-inline: 1.5rem;
    font-family: --mulish;
  }
</style>
