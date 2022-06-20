<script lang="ts">
  import T from './Translate.svelte';
  import { t } from '../i18n';
</script>

<header id="#hero">
  <picture>
    <!-- <source srcset="https://source.unsplash.com/random/800x600" media="(min-width: 800px)" /> -->
    <img src="/headshot.webp" alt={$t('headshot')} />
  </picture>

  <h1>
    <T key="title" /><br />
    <T key="subtitle" />
  </h1>

  <p>
    <T key="intro" />
  </p>

  <a href="#contact">
    <T key="contact" />
  </a>
</header>

<style>
  header {
    padding-block: 3rem;
  }

  img {
    width: 5rem;
    aspect-ratio: 1;
    border-radius: 50%;
  }

  h1 {
    font-size: clamp(1.6rem, 2.8vw + 1.1rem, 3rem);
    font-variation-settings: 'wght' 320, 'SOFT' 100, 'WONK' 1;
    line-height: 1.1;
    margin-top: 2rem;
  }

  a,
  p {
    font-size: clamp(1.2rem, 0.6vw + 1rem, 1.5rem);
    font-variation-settings: 'wght' 350;
  }

  p {
    max-width: 50rem;
  }

  a {
    position: relative;
    color: --ntrl-20;
  }

  a::after {
    content: '';
    position: absolute;
    inset: 0;
    top: 110%;
    transition: top 50ms ease-in-out;
    width: 100%;
    height: 1px;
    background-color: --ntrl-40;
  }
</style>
