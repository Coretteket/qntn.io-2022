<script>
  import PageSelect from './PageSelect.svelte';
  import { toggleLocale, toggleTheme } from '../../scripts/stores';
  import { theme } from '../../scripts/stores';
  import { t } from '../../i18n';
  import { page } from '$app/stores';
  import Button from './Button.svelte';

  // import LinkedIn from 'feather-icons/dist/icons/linkedin.svg';
  // import Twitter from 'feather-icons/dist/icons/twitter.svg';
  // import Github from 'feather-icons/dist/icons/github.svg';
  // import Moon from 'feather-icons/dist/icons/moon.svg';
  // import Sun from 'feather-icons/dist/icons/sun.svg';
  // import Globe from 'feather-icons/dist/icons/globe.svg';

  $: themeSwitch = $t('global.themeSwitch', {
    theme: $theme == 'dark' ? $t('global.light') : $t('global.dark'),
  });
  $: localeSwitch = $t('global.localeSwitch');

  const test = ['i-eva-color-palette-fill', 'i-eva-globe-fill'];
</script>

<nav class="flex child:flex child:w-max justify-between mx-auto z-10 px-10 py-6">
  <div class="gap-2 child:transition-colors font-600">
    <PageSelect href="/">{$t('global.home')}</PageSelect>
    <PageSelect href="/#projects">{$t('global.projects')}</PageSelect>
    <PageSelect href="/#blog">{$t('global.blog')}</PageSelect>
    <PageSelect href="/about">{$t('global.about')}</PageSelect>
    <PageSelect href="/#contact">{$t('global.contact')}</PageSelect>
  </div>
  <div class="gap-4 text-zinc-3 items-center">
    <Button icon="i-eva-color-palette-fill" action={toggleTheme} />
    <Button icon="i-eva-globe-fill" action={toggleLocale} />
  </div>
</nav>

<style>
  nav {
    max-width: var(--maxwidth);
    /* margin-inline: auto; */
    /* box-sizing: border-box;
    position: sticky;
    top: 0; */
    /* z-index: 10; */
    background: var(--ntrl-50);
    color: var(--ntrl-10);
    /* padding: 2.5rem 1.5rem; */
    /* display: flex; */
    /* justify-content: space-between; */
  }

  /* TODO: make responsive */
  /* a:not(.title) {
    @media (max-width: 1200px) {
      display: none;
    }
  } */

  div {
    width: max-content;
    display: flex;
  }
  /*
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mulish);
    font-size: 1.1rem;
  } */

  /* .title {
    font-family: var(--fraunces);
    font-size: 1.25rem;
    font-variation-settings: 'SOFT' 100, 'WONK' 1;
    font-weight: 450;
  } */
</style>
