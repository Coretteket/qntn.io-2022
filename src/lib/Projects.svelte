<script>
  import Block from './Block.svelte';
  import Screen from './Screen.svelte';
  import T from './Translate.svelte';
  import { parallax } from '../scripts/gsap';
  import { theme } from '../scripts/stores';
</script>

<section id="projects">
  <h2>
    <T key="projects" />
  </h2>

  <Block color="var(--blue-10)" main="start">
    <div slot="main">
      <h3><T key="beterdanhugo" /></h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
      <a href="/">Play the game</a>
    </div>
    <div slot="side">
      <Screen url="beterdanhugo.nl" action={parallax}>
        <img src={$theme === 'dark' ? '/bdh-dark.png' : '/bdh.png'} alt="" />
      </Screen>
    </div>
  </Block>

  <Block main="end">
    <div slot="main">
      <h4><T key="viralgame" /></h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
    </div>
  </Block>

  <Block color="var(--yllw-10)" main="start">
    <div slot="main">
      <h3><T key="nieuwindekamer" /></h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
      <a href="/">Play the game</a>
    </div>
    <div slot="side">
      <Screen url="twitter.com/nieuwindekamer" action={parallax} />
    </div>
  </Block>

  <Block main="end">
    <div slot="main">
      <h4><T key="nichebot" /></h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
    </div>
  </Block>
</section>

<style>
  section {
    margin-block: 3rem;
  }

  h2 {
    font-variation-settings: 'wght' 380, 'SOFT' 100, 'WONK' 1;
    font-size: 1.6rem;
    padding-block: 0.2rem;
    border-bottom: 1px solid --ntrl-40;
  }

  h3 {
    font-variation-settings: 'wght' 500, 'SOFT' 100, 'WONK' 1;
    font-size: 1.5rem;
    margin-top: 0;
  }

  h4 {
    font-variation-settings: 'wght' 400, 'SOFT' 100, 'WONK' 1;
    font-size: 1.3rem;
    margin-top: 0;
  }

  a,
  p {
    font-size: 1.1rem;
  }
</style>
