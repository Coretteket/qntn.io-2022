<script lang="ts">
  import LinkedIn from 'feather-icons/dist/icons/linkedin.svg';
  import Twitter from 'feather-icons/dist/icons/twitter.svg';
  import Github from 'feather-icons/dist/icons/github.svg';
  import T from '../components/Translate.svelte';
  import { t } from '../../i18n';
</script>

<header id="hero">
  <picture>
    <!-- <source srcset="/headshot.png, /headshot@2x.png 2x" /> -->
    <img src="/headshot.webp" alt={$t('headshot')} />
  </picture>

  <h1>
    <T key="title" /><br />
    <T key="subtitle" />
  </h1>

  <p>
    <T key="intro" />
  </p>

  <a href="/github" sveltekit:prefetch target="_blank"><Github /></a>
  <a href="/twitter" sveltekit:prefetch target="_blank"><Twitter /></a>
  <a href="/linkedin" sveltekit:prefetch target="_blank"><LinkedIn /></a>
</header>

<style>
  header {
    padding-block: 3rem;
    position: relative;
  }

  img {
    width: 5rem;
    aspect-ratio: 1;
    border-radius: 50%;
  }

  h1 {
    font-size: clamp(1.6rem, 2.8vw + 1.1rem, 3rem);
    font-weight: 350;
    margin-top: 2rem;
  }

  a,
  p {
    font-size: clamp(1.2rem, 0.6vw + 1rem, 1.5rem);
    font-weight: 350;
    margin-bottom: 2.5rem;
  }

  p {
    max-width: 18rem;

    @media (--sm) {
      max-width: 50rem;
    }
  }

  a {
    margin-right: 1.5rem;
  }
</style>
