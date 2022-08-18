<script lang="ts">
  import SessionHandler from '../components/SessionHandler.svelte';
  import Navigation from '../components/sections/Navigation.svelte';
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
