<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { locale, theme } from '../scripts/stores';

  // export const load: Load = async ({ session }) => {
  //   locale.set(session.locale);
  //   theme.set(session.theme);
  //   return {};
  // };
</script>

<script>
  import ThemeHandler from '../lib/ThemeHandler.svelte';
  import LocaleHandler from '../lib/LocaleHandler.svelte';
  import Navigation from '../lib/Navigation.svelte';
  import '@fontsource/anybody/variable.css';
  import '@fontsource/mulish';
  import '../app.css';
</script>

<ThemeHandler />
<LocaleHandler />
<Navigation />
<slot />
