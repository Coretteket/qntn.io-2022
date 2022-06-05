<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { theme, locale, dict } from '../scripts/stores';
  import { loadTranslations } from '../i18n';
  import routes from '../i18n/routes.json';

  export const load: Load = async ({ url, session }) => {
    theme.set(session.theme);
    locale.set(session.locale);

    const data = url.pathname in routes ? await loadTranslations(session, url) : {};
    dict.update((dict) => ({ ...dict, ...data }));

    return {};
  };
</script>

<script lang="ts">
  import SessionHandler from '$lib/SessionHandler.svelte';
  import Navigation from '../lib/Navigation.svelte';
  import '@fontsource/anybody/variable-full.css';
  import '@fontsource/mulish';
  import '../app.css';
</script>

<SessionHandler />

<Navigation />

<main>
  <slot />
</main>

<style>
  main {
    max-width: var(--maxwidth);
    margin-inline: auto;
    padding-inline: 3rem;
  }
</style>
