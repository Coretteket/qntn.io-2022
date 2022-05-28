<script>
  import translations from '../scripts/translate';
  import { locale } from '../scripts/stores';
  import { page } from '$app/stores';

  export let key;
  export let g = false;
  let route;

  function translate(locale, page, key, vars = {}) {
    if (g) route = 'global';
    else route = page?.routeId;
    if (route == '') route = 'index';

    if (!route in translations) throw new Error(`No translations for route ${route}`);

    let text = translations[locale][route][key];

    if (!text) throw new Error(`No translation found for ${locale}.${route}.${key}`);

    Object.keys(vars).map((k) => {
      text = text.replace(new RegExp(`{${k}}`, 'g'), vars[k]);
    });

    return text;
  }
</script>

{translate($locale, $page, key)}
