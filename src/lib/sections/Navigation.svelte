<script>
  import { toggleLocale, toggleTheme } from '../../scripts/stores';
  import { theme } from '../../scripts/stores';
  import { t } from '../../i18n';

  import LinkedIn from 'feather-icons/dist/icons/linkedin.svg';
  import Twitter from 'feather-icons/dist/icons/twitter.svg';
  import Github from 'feather-icons/dist/icons/github.svg';
  import Moon from 'feather-icons/dist/icons/moon.svg';
  import Sun from 'feather-icons/dist/icons/sun.svg';
  import Globe from 'feather-icons/dist/icons/globe.svg';
  import PageSelect from '$lib/components/PageSelect.svelte';

  $: themeSwitch = $t('g.themeSwitch', { theme: $theme == 'dark' ? $t('g.light') : $t('g.dark') });
  $: localeSwitch = $t('g.localeSwitch');
</script>

<nav>
  <div class="links">
    <PageSelect href="/">{$t('g.home')}</PageSelect>
    <PageSelect href="/#projects">{$t('g.projects')}</PageSelect>
    <PageSelect href="/#blog">{$t('g.blog')}</PageSelect>
    <PageSelect href="/about">{$t('g.about')}</PageSelect>
    <PageSelect href="/#contact">{$t('g.contact')}</PageSelect>
  </div>
  <div class="icons">
    <a href="/linkedin" sveltekit:prefetch target="_blank"><LinkedIn /></a>
    <a href="/github" sveltekit:prefetch target="_blank"><Github /></a>
    <a href="/twitter" sveltekit:prefetch target="_blank"><Twitter /></a>

    <button on:click={toggleTheme} title={themeSwitch} aria-label={themeSwitch}>
      {#if $theme == 'light'}
        <Moon />
      {:else}
        <Sun />
      {/if}
    </button>
    <button on:click={toggleLocale} title={localeSwitch} aria-label={localeSwitch}>
      <Globe />
    </button>
  </div>
</nav>

<style>
  nav {
    max-width: --maxwidth;
    margin-inline: auto;
    /* box-sizing: border-box;
    position: sticky;
    top: 0; */
    z-index: 10;
    background: --ntrl-50;
    color: --ntrl-10;
    padding: 2.5rem 1.5rem;
    display: flex;
    justify-content: space-between;
  }

  /* TODO: make responsive */
  a:not(.title) {
    @media (--LG) {
      display: none;
    }
  }

  div {
    width: max-content;
    display: flex;
    gap: 0.5rem;
  }

  .icons {
    gap: 2.5rem;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: --mulish;
    font-size: 1.1rem;
  }

  .title {
    font-family: --fraunces;
    font-size: 1.25rem;
    font-variation-settings: 'SOFT' 100, 'WONK' 1;
    font-weight: 450;
  }

  button {
    /* padding: 1rem; */
    /* aspect-ratio: 1; */
    width: 2rem;
  }
</style>
