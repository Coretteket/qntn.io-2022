<script>
  import { toggleLocale, toggleTheme } from '../scripts/util';
  import { theme } from '../scripts/stores';
  import T from './Translate.svelte';
  import Language from '$svg/language.svg';
  import Moon from '$svg/moon.svg';
  import Sun from '$svg/sun.svg';
  import '../app.css';
</script>

<nav>
  <div>
    <a sveltekit:prefetch class="title" href="/">qc</a>
    <a href="#projects"><T key="g.projects" /></a>
    <a href="#about"><T key="g.about" /></a>
    <a href="#contact"><T key="g.contact" /></a>
  </div>
  <div>
    <a href="https://www.linkedin.com/in/qcoret/" target="_blank">linkedin</a>
    <a href="https://twitter.com/coretteket" target="_blank">twitter</a>
    <a href="https://github.com/coretteket" target="_blank">github</a>

    <button on:click={toggleTheme}>
      {#if $theme == 'light'}
        <Moon />
      {:else}
        <Sun />
      {/if}
    </button>
    <button on:click={toggleLocale}><Language /></button>
  </div>
</nav>

<style>
  nav {
    max-width: var(--maxwidth);
    margin-inline: auto;
    /* box-sizing: border-box;
    position: sticky;
    top: 0; */
    z-index: 10;
    background: var(--white);
    color: var(--black);
    padding: 2.5rem 3rem;
    display: flex;
    justify-content: space-between;
  }

  div {
    width: max-content;
    display: flex;
    gap: 2.5rem;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Mulish', sans-serif;
    font-size: 1.3rem;
  }

  .title {
    font-weight: 600;
  }

  button {
    /* padding: 1rem; */
    /* aspect-ratio: 1; */
    width: 2rem;
  }
</style>
