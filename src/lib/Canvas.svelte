<script>
  import Block from '$lib/Block.svelte';
  import { onMount } from 'svelte';

  export let width = 30;
  export let y = 8;

  let innerWidth = 0;
  let innerHeight = 0;

  $: size = 100 / y;
  $: x = Math.max(Math.floor(((width / size) * innerWidth) / innerHeight), 0);

  let scheme = ['#D45050', '#4B87D6', '#EFE96D', '#DD99EF', '#4D1C57', '#0000'];

  const randItem = (arr) => arr[(Math.random() * arr.length) | 0];

  let blocks = [];
  const fillBlocks = () => {
    blocks = Array(x * y | 0)
      .fill()
      .map((_, i) => newBlock(i));
  };

  onMount(fillBlocks);
  $: fillBlocks(x * y);

  const newBlock = (id) => ({
    id,
    background: randItem(scheme),
    corners: Array(4)
      .fill()
      .map(() => Math.random() < 0.5),
  });

  const updateBlock = (id) => {
    blocks[id] = newBlock(id);
  };

  setInterval(() => {
    updateBlock(Math.floor(Math.random() * blocks.length));
  }, 2000);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div style:width={x * size + 'vh'}>
  {#each blocks as block (block.id)}
    <Block {...block} {size} onClick={() => updateBlock(block.id)} />
  {/each}
</div>

<style>
  div {
    /* background: red; */
    max-width:100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0;
  }
</style>
