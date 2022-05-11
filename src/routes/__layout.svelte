<script>
  import '../global.css';
  import Canvas from '$lib/Canvas.svelte';
</script>

<main>
  <div>
    <slot />
  </div>

  <Canvas x="9" y="9" />
</main>

<style>
  main {
    display: flex;
  }

  div {
    flex: 1;
  }
</style>
