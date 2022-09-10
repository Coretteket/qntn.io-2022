<script lang="ts">
  import Icon from './Icon.svelte';
  const socials = ['linkedin', 'twitter', 'github', 'telegram'] as const;
</script>

<div>
  {#each socials as social}
    <a href={`/${social}`} rel="external">
      <Icon name={social} width={24} />
    </a>
  {/each}
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
  }
  a {
    color: var(--gray-8);
    text-decoration: none;
  }
</style>
