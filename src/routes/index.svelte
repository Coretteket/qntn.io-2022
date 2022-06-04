<script>
  import Hero from '../lib/Hero.svelte';
</script>

<Hero />

{#each Array(10) as _}
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ipsum! Distinctio nobis molestias
    ut voluptas mollitia, voluptates voluptatem exercitationem dolorem modi ratione delectus quis
    ipsum vitae reprehenderit nostrum expedita dolores.
  </p>
{/each}

<p id="contact">Contact</p>

<style>
  p {
    font-family: 'Mulish', sans-serif;
    max-width: 400px;
    margin: 2em auto;
  }
</style>
