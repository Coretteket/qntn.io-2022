<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
  import { onMount } from 'svelte';
  // import { spring } from 'svelte/motion';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    gsap.to('.shift', {
      scrollTrigger: {
        trigger: 'main',
        start: 'center top',
        toggleActions: 'play none none reverse',
        // end: 'bottom center',
        // scrub: 0.5,
      },
      x: 0,
      ease: 'power',
      duration: 0.5,
    });
  });
</script>

<nav>
  <div class="shift">
    <a class="title" href="/">quinten coret</a>
    <a href="#bdh">beter dan hugo</a>
    <a href="#nidk">nieuw in de kamer</a>
    <a href="#qntn">over qntn.io</a>
    <a href="#about">over mij</a>
    <a href="#contact">contact</a>
  </div>
</nav>

<style>
  nav {
    box-sizing: border-box;
    top: 0;
    position: sticky;
    overflow: none;
    width: 100%;
    height: var(--nav);
    border-bottom: var(--border);
    background: #fff;
    padding: 0 2rem;
    z-index: 9;
  }

  div {
    display: flex;
    gap: 2rem;
    height: 101%;
    margin: 0;
  }

  nav a {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Josefin Sans', sans-serif;
  }

  a {
    font-size: 1.3vw;
    font-weight: 350;
    text-decoration: none;
    color: black;
  }

  .title {
    font-size: 1.6vw;
    font-weight: 700;
    border-right: var(--border);
    padding-right: 2rem;
  }

  .shift {
    transform: translateX(-15vw);
  }
</style>
