<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;

  $: current = $page.url.pathname === href;
</script>

<a
  {href}
  aria-current={current}
  class="u auto:text-zinc-6 auto:current:text-zinc-8 current:font-800"
>
  <slot />
</a>
