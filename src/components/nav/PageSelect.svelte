<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;

  $: current = $page.url.pathname === href;
</script>

<a
  {href}
  aria-current={current}
  class="u px-3 py-1 rounded-lg text-zinc-4 current:font-800 current:bg-zinc-8 current:text-zinc-2 hover:text-zinc-3 hover:bg-zinc-8"
>
  <slot />
</a>
