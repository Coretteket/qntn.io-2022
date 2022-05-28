<script>
  // import { gsap } from 'gsap';
  // import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
  // import { onMount } from 'svelte';

  // gsap.registerPlugin(ScrollTrigger);

  // onMount(() => {
  //   gsap.to('.shift', {
  //     scrollTrigger: {
  //       trigger: 'main',
  //       start: 'center top',
  //       toggleActions: 'play none none reverse',
  //       // end: 'bottom center',
  //       // scrub: 0.5,
  //     },
  //     x: 0,
  //     ease: 'power',
  //     duration: 0.5,
  //   });
  // });

  import { toggleLocale } from '../i18n/translate';
  import { theme } from '../scripts/stores';
  import T from './Translate.svelte';
  import Language from './svg/Language.svelte';
  import Moon from './svg/Moon.svelte';
  import Sun from './svg/Sun.svelte';
  import '../app.css';
</script>

<nav>
  <div>
    <a class="title" href="/">quinten coret</a>
    <a href="#projects"><T key="projects" /></a>
    <a href="#about"><T key="about" /></a>
    <a href="#contact"><T key="contact" /></a>
  </div>
  <div>
    <a href="https://www.linkedin.com/in/qcoret/" target="_blank">linkedin</a>
    <a href="https://twitter.com/coretteket" target="_blank">twitter</a>
    <a href="https://github.com/coretteket" target="_blank">github</a>
    <button class="theme" on:click={() => theme.update((t) => (t == 'light' ? 'dark' : 'light'))}>
      {#if $theme == 'light'}
        <Moon />
      {:else}
        <Sun />
      {/if}
    </button>
    <button class="locale" on:click={toggleLocale}><Language /></button>
  </div>
</nav>

<style>
  nav {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--white);
    color: var(--black);
    height: var(--nav);
    border-bottom: var(--border);
    display: flex;
    justify-content: space-between;
  }

  div {
    display: flex;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Mulish', sans-serif;
    font-size: 1.1rem;
    padding-inline: 1rem;
  }

  .title,
  .theme,
  .locale {
    height: var(--nav);
  }

  .title {
    font-weight: 600;
    border-right: var(--border);
    padding-inline: 2rem;
    margin-right: 1rem;
  }

  button {
    padding: 0.5rem;
    border-left: var(--border);
    aspect-ratio: 1;
  }

  .theme {
    margin-left: 1rem;
  }
</style>
