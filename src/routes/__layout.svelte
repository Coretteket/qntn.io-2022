<script context="module">
  import { locale, theme } from '../scripts/stores';

  export async function load({ session }) {
    locale.set(session.locale);
    theme.set(session.theme);
    return {};
  }
</script>

<script>
  import ThemeHandler from '../lib/ThemeHandler.svelte';
  import LocaleHandler from '../lib/LocaleHandler.svelte';
  import Navigation from '../lib/Navigation.svelte';
  import '../app.css';
</script>

<ThemeHandler />
<LocaleHandler />
<Navigation />
<slot />
