<script lang="ts">
  export let icon: string;
  export let action: () => void;
</script>

<button on:click={action} class="u h-9 p-2 rounded-2 auto:bg-zinc-2 hover:ring-2 auto:ring-zinc-3">
  <span class={icon} />
</button>
