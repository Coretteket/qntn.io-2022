<script context="module" lang="ts">
  import { screenH, screenW, scrollY, mouse } from '../scripts/stores';

  const mouseMove = (e: MouseEvent) => {
    mouse.update(() => ({ x: e.clientX, y: e.clientY }));
  };
</script>

<svelte:window
  on:mousemove={mouseMove}
  bind:innerHeight={$screenH}
  bind:innerWidth={$screenW}
  bind:scrollY={$scrollY}
/>
