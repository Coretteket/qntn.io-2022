<script lang="ts">
  import { modulo } from '../scripts/util';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { quadInOut } from 'svelte/easing';

  let items: HTMLDivElement;
  let offsetWidth: number;
  let length = 0;

  let offset = tweened(0, { easing: quadInOut });
  $: transform = modulo($offset, length) * offsetWidth;

  onMount(() => {
    const { children, childElementCount } = items;
    length = childElementCount - 1;
    items.append(children[0].cloneNode(true));
  });

  const next = () => offset.update((o) => (o += 1));
  const prev = () => offset.update((o) => (o -= 1));
</script>

<div class="container">
  <div class="carousel">
    <div class="items" bind:this={items} bind:offsetWidth style:--transform="-{transform}px">
      <slot />
    </div>
  </div>

  <button on:click={prev}>Prev</button>
  <button on:click={next}>Next</button>
</div>

<style>
  .carousel {
    overflow: hidden;
  }

  .items {
    display: flex;
    justify-content: space-between;
    transform: translateX(--transform);
  }

  .items > :global(*) {
    min-width: 100%;
  }
</style>
