<script lang="ts">
  export let action: Function;
  export let url: string;
  $: href = `https://${url}`;
</script>

<div class="screen" use:action>
  <div class="url">
    <a {href} target="_blank">{url}</a>
    <!-- <slot name="url" /> -->
  </div>
  <slot />
</div>

<style>
  div {
    position: absolute;
  }

  .screen {
    background-color: --scrn-10;
    border: 1px solid --ntrl-40;
    inset: 0;
    top: 2rem;
    padding-top: 1.5rem;
    border-radius: --radius;
  }

  .url {
    inset: 0;
    background-color: --scrn-20;
    height: 1rem;
    top: 0.25rem;
    width: 20rem;
    margin-inline: auto;
    border-radius: --radius;
    text-align: center;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: --ntrl-30;
    font-variation-settings: 'wght' 600;
  }

  .screen :global(img) {
    width: 100%;
    height: 100%;
    border-radius: --radius;
    object-fit: cover;
  }
</style>
