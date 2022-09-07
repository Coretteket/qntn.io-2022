<script lang="ts">
  export let title: string;
</script>

<button
  type="button"
  on:click
  {title}
  class="u flex items-center gap-1 h-9 p-2 rounded-2 transition-all overflow-hidden auto:text-zinc-7 auto:bg-zinc-2 hover:ring-2 auto:ring-zinc-3"
>
  <slot />
</button>
