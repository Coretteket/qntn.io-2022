<script>
  import { locale } from '../i18n';
  import { browser } from '$app/env';

  $: if (browser) {
    document.documentElement.setAttribute('lang', $locale);
    document.cookie = `locale=${$locale}`;
  }
</script>
