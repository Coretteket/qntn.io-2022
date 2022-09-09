<script lang="ts">
  import Icon from '@iconify/svelte';
  import moon from '@iconify-icons/tabler/moon';
  import sun from '@iconify-icons/tabler/sun-high';

  import { disableTransitionUntil } from '../utils/disable-transition';
  import Button from './Button.svelte';
  import type { Theme } from '../scripts/types';
  export let theme: Theme;

  const toggleTheme = () => {
    disableTransitionUntil(() => {
      theme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = `theme=${theme}`;
    });
  };
</script>

<Button class="toggleTheme" on:click={toggleTheme}>
  <span data-transition="true">
    <Icon width={20} icon={moon} class="light" />
    <Icon width={20} icon={sun} class="dark" />
  </span>
</Button>

<style lang="scss">
  span :global(svg:is(.light, .dark)) {
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

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
