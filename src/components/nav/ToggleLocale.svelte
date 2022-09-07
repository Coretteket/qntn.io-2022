<script>
  import { loading } from '../../scripts/stores';
  import { toggleLocale } from '../../scripts/util/toggle-stores';
  import { t } from '../../locales';
  import Button from './Button.svelte';
</script>

<Button on:click={toggleLocale} title={$t('global.locale-button')}>
  {#if $loading}<span class="i-tabler-loader-2" />
  {:else}<span class="i-ion-language" />{/if}
  <span id="locale" class="u w-24 transition-all font-bold">
    <span class="nl">Nederlands</span>
    <span class="en">English</span>
  </span>
</Button>

<style>
  :global(:lang(nl)) #locale {
    width: 4rem;
  }

  :global(:lang(en)) .en,
  :global(:lang(nl)) .nl {
    display: none;
  }

  .i-tabler-loader-2 {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
