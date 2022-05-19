<script context="module">
  import { locale } from '../scripts/stores';

  export async function load({ params, fetch, session, stuff }) {
    locale.set(session.locale);

    return {};
  }
</script>

<script>
  import Window from '../lib/Window.svelte';
  import Navigation from '../lib/Navigation.svelte';
  import '../app.css';

  // let touchScreen = true;
  // onMount(() => {
  //   touchScreen = 'ontouchstart' in document.documentElement;
  // });
</script>

<Window />

<Navigation />
<slot />
