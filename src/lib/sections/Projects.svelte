<script>
  import Block from '../components/Block.svelte';
  import Screen from '../components/Screen.svelte';
  import T from '../components/Translate.svelte';
  import { theme } from '../../scripts/stores';
  import { t } from '../../i18n';
</script>

<section id="projects">
  <h2>
    {$t('i.projects')}
  </h2>

  <Block color="var(--blue-10)" main="start">
    <div slot="main">
      <h3>{$t('i.bdh.title')}</h3>
      <p>{$t('i.bdh.desc')}</p>
      <a href="/">Play the game</a>
    </div>
    <Screen slot="side" url="beterdanhugo.nl">
      {#if $theme === 'dark'}<img src="/bdh-dark.webp" alt="Beter dan hugo" />
      {:else}<img src="/bdh.webp" alt="Beter dan hugo" />{/if}
    </Screen>
  </Block>

  <Block main="end">
    <div slot="main">
      <h4>{$t('i.bdh.subtitle')}</h4>
      <p>{$t('i.bdh.subdesc')}</p>
    </div>
  </Block>

  <Block color="var(--yllw-10)" main="start">
    <div slot="main">
      <h3>{$t('i.nidk.title')}</h3>
      <p>{$t('i.nidk.desc')}</p>
      <a href="/">Play the game</a>
    </div>
    <Screen slot="side" url="twitter.com/nieuwindekamer" />
  </Block>

  <Block main="end">
    <div slot="main">
      <h4>{$t('i.nidk.subtitle')}</h4>
      <p>{$t('i.nidk.subdesc')}</p>
    </div>
  </Block>
</section>

<style>
  a,
  p {
    font-size: 1.1rem;
  }
</style>
