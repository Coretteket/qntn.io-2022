<script lang="ts">
  export let icon: string;
  export let action: () => void;
</script>

<button on:click={action} class="p-2 rounded-2 bg-zinc-8 h-9"><span class={icon} /></button>
