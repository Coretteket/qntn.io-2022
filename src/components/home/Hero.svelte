<script lang="ts">
  import { t } from '../../locales';
</script>

<header id="hero">
  <picture>
    <!-- <source srcset="/headshot.png, /headshot@2x.png 2x" /> -->
    <img src="/headshot.webp" alt={$t('home.headshot')} />
  </picture>

  <h1>
    {$t('home.title')}<br />
    {$t('home.subtitle')}
  </h1>

  <p>
    {$t('home.intro')}
  </p>

  <a href="#contact">
    {$t('home.contact')}
  </a>
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
  }

  p {
    max-width: 18rem;

    @media (min-width: 600px) {
      max-width: 50rem;
    }
  }

  a {
    position: relative;
    color: var(--ntrl-20);
  }

  a::after {
    content: '';
    position: absolute;
    inset: 0;
    top: 110%;
    transition: top 50ms ease-in-out;
    width: 100%;
    height: 1px;
    background-color: var(--ntrl-40);
  }
</style>
