<script>
  import Hero from '$lib/Hero.svelte';
</script>

<main>
  <Hero />
  {#each Array(10) as i}
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed cumque nam ea officia possimus dolores quasi. Consequatur aperiam aliquid, illo veniam mollitia sunt modi blanditiis adipisci laboriosam quos. Distinctio, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed cumque nam ea officia possimus dolores quasi. Consequatur aperiam aliquid, illo veniam mollitia sunt modi blanditiis adipisci laboriosam quos. Distinctio, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed cumque nam ea officia possimus dolores quasi. Consequatur aperiam aliquid, illo veniam mollitia sunt modi blanditiis adipisci laboriosam quos. Distinctio, quos.</p>
  {/each}
</main>

<style>
  p {
    font-family: 'Newsreader', serif;
    font-weight: 300;
    font-size: 22px;
    margin: 2em auto;
    width: min(800px, 90vw);
    color: white;
  }
</style>