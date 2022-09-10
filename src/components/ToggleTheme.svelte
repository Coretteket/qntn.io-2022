<script lang="ts">
  import Icon from './Icon.svelte';

  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  import { disableTransition } from '../utils/disable-transition';

  import type { Theme } from '../scripts/types';
  export let theme: Theme;

  if (theme === 'auto')
    onMount(() => {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

  const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.cookie = `theme=${theme}`;
    disableTransition(() => (document.documentElement.dataset.theme = theme));
  };
</script>

<Button class="toggleTheme" on:click={toggleTheme}>
  <span data-transition="true">
    <Icon width={20} name="moon" class="light" />
    <Icon width={20} name="sun" class="dark" />
  </span>
</Button>

<style lang="scss">
  span :global(svg:is(.light, .dark)) {
    transition: transform 150ms var(--easing);

    :global([data-theme='dark']) & {
      transform: translateY(-1.75rem);
    }
  }

  [data-transition] {
    display: grid;
    gap: 0.5rem;
    align-self: flex-start;
  }
</style>
