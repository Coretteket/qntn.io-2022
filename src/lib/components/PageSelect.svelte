<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;

  $: active = $page.url.pathname === href;
</script>

<a {href} {...$$restProps} class:active><slot /></a>

<style>
  a {
    display: inline-block;
    font-weight: 600;
    line-height: 1;
    padding: 8px 12px;
    border-radius: 0.5rem;
    transition: background-color 100ms ease-in-out;
  }

  a:hover {
    background-color: --ntrl-40;
  }

  .active {
    font-weight: 700;
  }

  :not(.active) {
    color: --ntrl-30;
  }
</style>
