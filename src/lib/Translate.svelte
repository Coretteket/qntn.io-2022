<script lang="ts">
  import type { Page } from '@sveltejs/kit';
  import { type Locale, type Route, isRoute } from '../scripts/types';
  import translations from '../scripts/translate';
  import { locale } from '../scripts/stores';
  import { page } from '$app/stores';

  export let key: string;
  export let g = false;
  let route: Route;

  function translate(locale: Locale, page: Page, key: string) {
    const routeId = page?.routeId;

    if (g) route = 'global';
    else route = isRoute(routeId) ? routeId : 'index';

    let text = translations[locale][route][key];

    if (!text) throw new Error(`No translation found for ${locale}.${route}.${key}`);

    return text;
  }
</script>

{translate($locale, $page, key)}
