<script context="module">
  import { writable } from 'svelte/store';

  export const screenH = writable(1);
  export const screenW = writable(1);
  export const scrollY = writable(0);

  export const mouse = writable({ x: 0, y: 0 });
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
