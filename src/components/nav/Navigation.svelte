<script>
  import PageSelect from './PageSelect.svelte';
  import ToggleLocale from './ToggleLocale.svelte';
  import ToggleTheme from './ToggleTheme.svelte';
  import { t } from '../../locales';
</script>

<nav class="u flex items-center justify-between max-w-200 mx-auto z-10 px-6 py-6">
  <div class="u flex w-max gap-8" data-sveltekit-prefetch>
    <PageSelect href="/">{$t('global.home')}</PageSelect>
    <PageSelect href="/#projects">{$t('global.projects')}</PageSelect>
    <PageSelect href="/#blog">{$t('global.blog')}</PageSelect>
    <PageSelect href="/about">{$t('global.about')}</PageSelect>
    <PageSelect href="/#contact">{$t('global.contact')}</PageSelect>
  </div>
  <div class="u flex w-max gap-4 items-center">
    <ToggleTheme />
    <ToggleLocale />
  </div>
</nav>
