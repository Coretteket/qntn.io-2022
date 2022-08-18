<script>
  import { toggleLocale, toggleTheme } from '../../scripts/util';
  import { theme } from '../../scripts/stores';
  import T from '../Translate.svelte';
  import { t } from '../../i18n';
  import Language from '../../svg/language.svg';
  import Moon from '../../svg/moon.svg';
  import Sun from '../../svg/sun.svg';
  // import '../../app.css';

  $: themeSwitch = $t('g.themeSwitch', { theme: $theme == 'dark' ? $t('g.light') : $t('g.dark') });
  $: localeSwitch = $t('g.localeSwitch');
</script>

<nav>
  <div>
    <a sveltekit:prefetch class="title" href="/">Quinten Coret</a>
    <a href="#projects"><T key="g.projects" /></a>
    <a href="#projects"><T key="g.blog" /></a>
    <a href="#about"><T key="g.about" /></a>
    <a href="#contact"><T key="g.contact" /></a>
  </div>
  <div>
    <a href="https://qntn.io/linkedin/" target="_blank">Linkedin</a>
    <a href="https://qntn.io/twitter/" target="_blank">Twitter</a>
    <a href="https://qntn.io/github/" target="_blank">Github</a>

    <button on:click={toggleTheme} title={themeSwitch} aria-label={themeSwitch}>
      {#if $theme == 'light'}
        <Moon />
      {:else}
        <Sun />
      {/if}
    </button>
    <button on:click={toggleLocale} title={localeSwitch} aria-label={localeSwitch}>
      <Language />
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
