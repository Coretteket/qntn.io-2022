<script lang="ts">
  import T from './Translate.svelte';
  import { t } from '../i18n';
</script>

<header>
  <h1>
    <T key="title" /><br />
    <T key="subtitle" />
  </h1>

  <p>
    <T key="intro" />
  </p>

  <div role="img" alt={$t('home.headerImg')} />
</header>

<style>
  header {
    position: relative;
    display: flex;
    gap: 10rem;
  }

  h1 {
    font-family: 'AnybodyVariable', sans-serif;
    font-variation-settings: 'wght' 360, 'wdth' 105;
    text-transform: lowercase;
    position: absolute;
    font-size: 4rem;
    line-height: 1.2;
    top: 3rem;
    z-index: 2;
  }

  p {
    flex: 1;
    font-size: 2rem;
    font-family: 'Mulish', sans-serif;
    font-weight: 200;
    margin-top: 18rem;
  }

  div {
    flex: 1;
    right: 0;
    width: 100%;
    height: 40rem;
    background: url('/static/header.webp');
    background-size: auto 100%;
    background-position: 80%;
    border-radius: 10px;
  }
</style>
