<script lang="ts">
  import Icon from '@iconify/svelte';
  import language from '@iconify-icons/ion/language';

  import Button from './Button.svelte';

  import type { Locale, Translations } from '../scripts/types';
  export let locale: Locale;

  export let t: Translations['locale'];

  const toggleLocale = () => {
    document.cookie = `locale=${locale === 'en' ? 'nl' : 'en'}`;
    location.reload();
  };
</script>

<Button class="toggleLocale" on:click={toggleLocale} title={t.other} {...$$restProps}>
  <Icon width={20} icon={language} />
  <span>{t.other}</span>
</Button>
