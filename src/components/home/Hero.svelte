<script lang="ts">
  import { t } from '../../locales';
</script>

<header id="hero" class="y flex flex-col gap-4 text-xl leading-tight">
  <picture>
    <img
      src="/headshot.webp"
      class="u inline-block h-24 aspect-ratio-1"
      alt={$t('home.headshot')}
    />
  </picture>

  <h1 class="u text-3xl leading-tight">
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
