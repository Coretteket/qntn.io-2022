<script lang="ts">
  import { translate } from '../../i18n';
  import { dict } from '../../scripts/stores';
  import { page } from '$app/stores';

  export let key: string;
  export let vars = {};

  $: value = translate($dict, $page, key, vars);
</script>

{#if typeof value === 'object'}
  {@html value.html}
{:else}
  {value}
{/if}
