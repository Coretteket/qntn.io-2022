/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  import type { Locale, Theme } from './scripts/types';

  interface Locals {
    locale: Locale;
    theme: Theme;
  }

  interface Platform {}

  interface Session {
    locale: Locale;
    theme: Theme;
  }

  interface Stuff {}
}
