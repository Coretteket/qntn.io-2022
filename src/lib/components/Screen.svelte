<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  export let url: string;
  export let offset = 40;
  export let inflect = 5 / 6;
  export let stiffness = 1 / 6;
  export let round = false;
  export let noreturn = false;

  let top = 0;
  let innerHeight = 0;
  let scrollY = 0;
  let stepped = false;
  let nomotion = true;

  let screen: HTMLElement;
  const resizeHandler = () => {
    top = screen.getBoundingClientRect().top;
    nomotion =
      window.matchMedia('(prefers-reduced-motion)').matches ||
      !window.matchMedia('(min-width: 900px)').matches;
  };

  const constrain = (v: number, a: number, b: number) => {
    const clamp = Math.min(Math.max(a, v), b);
    return round ? Math.round(clamp) : clamp;
  };

  $: step = constrain((top - scrollY) / innerHeight / inflect - 0.5, 0, 1);
  $: if (step === 0 && noreturn) stepped = true;

  const translate = spring(offset, { stiffness });
  $: translate.set(nomotion || stepped ? 0 : step * offset);

  onMount(resizeHandler);
</script>

<svelte:window bind:scrollY bind:innerHeight on:resize={resizeHandler} />

<div bind:this={screen} class="screen" style:transform="translateY({$translate}%)">
  <div class="url">
    <a href="https://{url}" target="_blank">{url}</a>
  </div>
  <slot />
</div>

<style>
  div {
    position: absolute;
  }

  .screen {
    background-color: --scrn-10;
    border: 2px solid --ntrl-40;
    inset: 0;
    top: 2rem;
    padding-top: 1.5rem;
    border-radius: --radius;
    transform: translateY(100%);
  }

  .url {
    inset: 0;
    background-color: --scrn-20;
    height: 1rem;
    top: 0.25rem;
    width: max(12rem, 50%);
    margin-inline: auto;
    border-radius: --radius;
    text-align: center;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: --ntrl-30;
    font-weight: 600;
  }

  .screen :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: --radius;
    background-color: --ntrl-50;
  }
</style>
