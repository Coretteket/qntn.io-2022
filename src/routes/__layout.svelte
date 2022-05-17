<script>
  import Window from '$stores/Window.svelte';
  import Header from '$lib/Header.svelte';

  import { onMount } from 'svelte';
  import '../global.css';

  // let touchScreen = true;
  // onMount(() => {
  //   touchScreen = 'ontouchstart' in document.documentElement;
  // });
</script>

<Window />

<Header />
<slot />
