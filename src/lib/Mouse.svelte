<script>
  import { mouse } from '$stores/Window.svelte';
  import { spring } from 'svelte/motion';

  const coords = spring({ x: 0, y: 0 }, { stiffness: 0.3 });
  $: coords.set($mouse);
</script>

<div style:left="{$coords.x}px" style:top="{$coords.y}px" />

<style>
  :global(body) {
    cursor: none;
  }

  div {
    color: white;
    position: fixed;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background: rgba(20, 1, 20, 0.6);
    border: solid 2px white;
    width: 18px;
    aspect-ratio: 1;
    pointer-events: none;
    z-index: 99;
    /* mix-blend-mode: exclusion; */
  }
</style>
