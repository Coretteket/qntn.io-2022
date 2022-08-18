<script lang="ts">
  import SessionHandler from '../lib/components/SessionHandler.svelte';
  import Navigation from '../lib/sections/Navigation.svelte';
  import Seo from '../lib/sections/SEO.svelte';
  import '../app.css';
</script>

<Seo />

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
