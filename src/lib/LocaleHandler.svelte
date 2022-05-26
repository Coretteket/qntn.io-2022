<script>
  import { locale } from '../scripts/stores';
  import { browser } from '$app/env';

  $: if (browser) {
    document.documentElement.setAttribute('lang', $locale);
    document.cookie = `locale=${$locale}`;
  }
</script>