<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;

  $: current = $page.url.pathname === href;
</script>

<a
  {href}
  aria-current={current}
  class="u font-medium auto:text-zinc-600 auto:current:text-zinc-8 current:font-extrabold"
>
  <slot />
</a>
