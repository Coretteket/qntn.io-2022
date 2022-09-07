<script lang="ts">
  import SessionHandler from '../components/layout/SessionHandler.svelte';
  import Navigation from '../components/nav/Navigation.svelte';
  import Seo from '../components/layout/SEO.svelte';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import '../app.css';
  // import type { LayoutData } from './$types';
  // import { dict, locale, theme } from '../scripts/stores';

  // export let data: LayoutData;
</script>

<Seo />

<SessionHandler />

<Navigation />

<main>
  <slot />
</main>

<style>
  main {
    max-width: var(--maxwidth);
    margin-inline: auto;
    padding-inline: 1.5rem;
    /* font-family: var(--mulish); */
  }
</style>
