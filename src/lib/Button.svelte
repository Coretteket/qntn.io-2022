<script lang="ts">
  export let color = 'var(--pink)';
  export let className: string;
  let click = false;
</script>

<div
  class="button {className}"
  style:--color={color}
  on:mousedown={() => (click = true)}
  on:mouseup={() => (click = false)}
  on:mouseleave={() => (click = false)}
  class:click
>
  <slot />
</div>
<div class="shadow" />

<style>
  .button {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    font-family: 'Mulish', sans-serif;
    font-weight: 400;
    font-size: 1.5vw;
    transform: translate(-6px, -6px);
    transition: transform 0.1s ease;
    user-select: none;
    cursor: pointer;
    z-index: 2;
  }

  .click:hover {
    transform: translate(0, 0);
  }

  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--pink);
    border: var(--border);
    /* z-index: -1; */
  }
</style>
