<script>
  import '../global.css';
  import Canvas from '$lib/Canvas.svelte';

  let innerWidth;
  $: width = Math.min(50, 100*(1 - 700 / innerWidth));
</script>

<svelte:window bind:innerWidth />

<main>
  <section>
    <slot />
  </section>

  <Canvas {width} y={12} />
</main>

<style>
  main {
    display: flex;
  }

  section {
    flex: 1;
    font-family: 'Rubik', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
