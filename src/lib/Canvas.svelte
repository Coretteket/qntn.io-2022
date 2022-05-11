<script>
  import Block from '$lib/Block.svelte';
  import { onMount } from 'svelte';

  export let x, y;

  const scheme = ['#D45050', '#4B87D6', '#EFE96D', '#DD99EF', '#4D1C57', '#FFF'];

  const randItem = (arr) => arr[(Math.random() * arr.length) | 0];

  let blocks = [];
  onMount(() => {
    blocks = Array(x * y)
      .fill()
      .map((_, i) => newBlock(i));
  });

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

<div style:width={(100 / y) * x + 'vh'}>
  {#each blocks as block (block.id)}
    <Block {...block} {y} onClick={() => updateBlock(block.id)} />
  {/each}
</div>

<style>
  div {
    display: inline-block;
    height: 100vh;
    margin: 0;
  }

  div:hover {
    cursor: pointer;
  }
</style>
