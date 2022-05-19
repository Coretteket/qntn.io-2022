<script context="module">
  import { screenH, screenW, scrollY, mouse } from '../scripts/stores';

  const mouseMove = (e) => {
    mouse.update(() => ({ x: e.clientX, y: e.clientY }));
  };
</script>

<svelte:window
  on:mousemove={mouseMove}
  bind:innerHeight={$screenH}
  bind:innerWidth={$screenW}
  bind:scrollY={$scrollY}
/>
