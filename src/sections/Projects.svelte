<script>
  import Block from '../components/Block.svelte';
  import Screen from '../components/Screen.svelte';
  import Tweet from '../components/Tweet.svelte';
  import T from '../components/Translate.svelte';
  import { theme } from '../scripts/stores';
  import Carousel from '../components/Carousel.svelte';
</script>

<section id="projects">
  <h2>
    <T key="projects" />
  </h2>

  <Block color="var(--blue-10)" main="start">
    <div slot="main">
      <h3><T key="bdh.title" /></h3>
      <p><T key="bdh.desc" /></p>
      <a href="/">Play the game</a>
    </div>
    <Screen slot="side" url="beterdanhugo.nl">
      {#if $theme === 'dark'}<img src="/bdh-dark.webp" alt="Beter dan hugo" />
      {:else}<img src="/bdh.webp" alt="Beter dan hugo" />{/if}
    </Screen>
  </Block>

  <Block main="end">
    <div slot="main">
      <h4><T key="bdh.subtitle" /></h4>
      <p><T key="bdh.subdesc" /></p>
    </div>
    <Carousel slot="side">
      <Tweet>hoi</Tweet>
    </Carousel>
  </Block>

  <Block color="var(--yllw-10)" main="start">
    <div slot="main">
      <h3><T key="nidk.title" /></h3>
      <p><T key="nidk.desc" /></p>
      <a href="/">Play the game</a>
    </div>
    <Screen slot="side" url="twitter.com/nieuwindekamer" />
  </Block>

  <Block main="end">
    <div slot="main">
      <h4><T key="nidk.subtitle" /></h4>
      <p><T key="nidk.subdesc" /></p>
    </div>
  </Block>
</section>

<style>
  a,
  p {
    font-size: 1.1rem;
  }
</style>
