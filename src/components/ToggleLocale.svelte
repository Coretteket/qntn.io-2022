<script lang="ts">
  import Icon from './Icon.svelte';

  import Button from './Button.svelte';

  import type { Locale, Translations } from '../scripts/types';
  export let locale: Locale;

  export let t: Translations['locale'];

  const toggleLocale = () => {
    document.cookie = `locale=${locale === 'en' ? 'nl' : 'en'}`;
    location.reload();
  };
</script>

<Button class="toggleLocale" on:click={toggleLocale} title={t.toggle} {...$$restProps}>
  <Icon width={20} name="language" />
  <span>{t.other}</span>
</Button>
