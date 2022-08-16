<script lang="ts">
  export let color = '--ntrl-10';
  export let main: 'start' | 'end';

  $: reversed = main === 'end';
</script>

<div class="block" style:background-color={color}>
  <div class="main" class:reversed>
    <slot name="main" />
  </div>
  <div class="side">
    <slot name="side" />
  </div>
</div>

<style>
  .block {
    min-height: 25rem;
    border-radius: --radius;
    margin-bottom: 7rem;
    display: grid;
    grid-auto-rows: 1fr 80vw;
    grid-auto-columns: 1fr;
    overflow: hidden;

    @media (--md) {
      grid-auto-flow: column;
    }
  }

  .main {
    padding: 2rem;
    align-self: center;

    @media (--md) {
      padding: 5rem;
    }
  }

  .side {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reversed {
    @media (--md) {
      order: 1;
    }
  }
</style>
