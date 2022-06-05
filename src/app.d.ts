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

declare module 'gsap/dist/ScrollTrigger.js' {
  export * from 'gsap/ScrollTrigger';
  export { ScrollTrigger as default } from 'gsap/ScrollTrigger';
}
