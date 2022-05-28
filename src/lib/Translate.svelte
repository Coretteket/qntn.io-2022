<script>
  export let key;

  import translations from '../scripts/translate';
  import { locale, route } from '../scripts/stores';

  export const locales = Object.keys(translations);

  function translate(locale, route, key, vars = {}) {
    let text = translations[locale][route][key];

    if (!text) throw new Error(`No translation found for ${locale}.${route}.${key}`);

    Object.keys(vars).map((k) => {
      text = text.replace(new RegExp(`{${k}}`, 'g'), vars[k]);
    });

    return text;
  }
</script>

{translate($locale, $route, key)}
