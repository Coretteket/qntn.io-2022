/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  import type { Locale, Theme } from './scripts/types';

  interface Globals {
    locale: Locale;
    theme: Theme;
  }

  interface Locals extends Globals {}

  interface Platform {}

  interface Session extends Globals {}

  interface Stuff {}
}
