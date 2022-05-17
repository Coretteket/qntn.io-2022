<script>
  import Button from '$lib/Button.svelte';
  import CurvyArrow from '$svg/CurvyArrow.svelte';
  import Stars from '$svg/Stars.svelte';
</script>

<section class="left">
  <div class="stars">
    <Stars />
  </div>
  <h1>quinten <span>coret</span></h1>
  <p>
    <!-- Hey, ik studeer Econometrie en Data Science aan de Vrije Universiteit, en ik hou ervan om data
    op een creatieve manier toegangelijk te maken. -->
    Hey, I study Econometrics and Data Science at the VU Amsterdam, and I love creating accessible ways
    to interact with data.
  </p>
  <div class="button">
    <!-- <Button>get in touch</Button> -->
    <Button>neem contact op</Button>
  </div>
  <div class="arrow">
    <CurvyArrow />
  </div>
</section>

<section class="right">
  <div class="window">
    {#each ['red', 'yellow', 'green'] as color}
      <div class="circle" style:background-color="var(--{color})" />
    {/each}
  </div>
</section>

<style>
  section {
    position: relative;
    float: left;
    width: 50vw;
    height: calc(100vh - var(--header));
  }

  .left {
    background: white;
    border-right: var(--border);
  }

  h1 {
    position: absolute;
    margin: 0;
    left: 50%;
    top: 11%;
    transform: translateX(-50%);
    font-family: 'Josefin Sans', sans-serif;
    width: min-content;
    text-align: right;
    font-size: 10vw;
    line-height: 0.75;
    letter-spacing: -0.25vw;
  }

  span {
    margin-right: -0.7vw;
  }

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 300;
    font-size: 1.75vw;
    position: absolute;
    margin: 0;
    width: 60%;
    left: 15%;
    bottom: 29%;
  }

  .left .button {
    position: absolute;
    width: 15rem;
    overflow: visible;
    height: 4.2rem;
    bottom: 12%;
    right: 14%;
  }

  .left .stars {
    width: 3.5vw;
    position: absolute;
    left: 83%;
    top: 9%;
  }

  .left .arrow {
    position: absolute;
    bottom: calc(12% - 1.5vw);
    right: 50%;
    width: 12vw;
  }

  .right {
    background: var(--pink);
  }

  .window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    height: 60%;
    background: white;
    /* border-radius: 0.3vw; */
    box-shadow: var(--shadow);
    border: var(--border);
  }

  .circle:first-child {
    margin-left: 0.5vw;
  }

  .circle {
    display: inline-block;
    border-radius: 50%;
    border: var(--border);
    width: 0.3vw;
    margin: 0.7vh 0.1vw;
    aspect-ratio: 1;
  }
</style>
