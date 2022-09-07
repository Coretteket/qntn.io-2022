<script>
  import { theme } from '../../scripts/stores';
  import { toggleTheme } from '../../scripts/util/toggle-stores';
  import { t } from '../../locales';
  import Button from './Button.svelte';
</script>

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

<style>
  :global([data-theme='dark']) :is(.i-tabler-moon, .i-tabler-sun-high) {
    transform: translateY(-1.75rem);
  }
</style>
