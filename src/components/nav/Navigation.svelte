<script>
  import PageSelect from './PageSelect.svelte';
  import { loading, toggleLocale, toggleTheme } from '../../scripts/stores';
  import { theme } from '../../scripts/stores';
  import { t } from '../../locales';
  import Button from './Button.svelte';
</script>

<nav class="u flex items-center justify-between max-w-200 mx-auto z-10 px-6 py-6">
  <div class="u flex w-max gap-8">
    <PageSelect href="/">{$t('global.home')}</PageSelect>
    <PageSelect href="/#projects">{$t('global.projects')}</PageSelect>
    <PageSelect href="/#blog">{$t('global.blog')}</PageSelect>
    <PageSelect href="/about">{$t('global.about')}</PageSelect>
    <PageSelect href="/#contact">{$t('global.contact')}</PageSelect>
  </div>
  <div class="u flex w-max gap-4 items-center">
    <Button
      on:click={toggleTheme}
      title={$t('global.theme-button', {
        theme: $t(`global.${$theme === 'dark' ? 'light' : 'dark'}`),
      })}
    >
      <span data-transition="true" class="u grid gap-2 self-start w-min child:transition-transform">
        <span class="i-tabler-moon" />
        <span class="i-tabler-sun-high" />
      </span>
    </Button>
    <Button on:click={toggleLocale} title={$t('global.locale-button')}>
      {#if $loading}<span class="i-tabler-loader-2" />
      {:else}<span class="i-ion-language" />{/if}
      <span id="locale" class="u w-24 transition-all font-bold">{$t('global.other-locale')}</span>
    </Button>
  </div>
</nav>

<style>
  :global([data-theme='dark']) :is(.i-tabler-moon, .i-tabler-sun-high) {
    transform: translateY(-1.75rem);
  }

  :lang(nl) #locale {
    width: 4rem;
  }

  .i-tabler-loader-2 {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
