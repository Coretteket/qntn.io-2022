<script>
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/dist/SplitText.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const split = new SplitText('.qcoret h1', { type: 'lines' });
    const tl = gsap.timeline();

    tl.fromTo(
      '.qcoret',
      {
        clipPath: 'circle(0% at 0 50%);',
      },
      {
        clipPath: 'circle(140% at 0 50%)',
        duration: 1.5,
        ease: 'power3.out',
      }
    );

    tl.fromTo(
      split.lines,
      {
        x: 100,
        rotateY: 20,
      },
      {
        x: 0,
        rotateY: 0,
        duration: 2,
        stagger: .15,
        // force3D: true,
        ease: 'power3.out',
      },
      "-=1.5"
    );
  });
</script>

<section>
  <div class='qcoret'>
    <h1>Quinten Coret</h1>
  </div>
</section>

<style>
  section {
    position: relative;
    height: 100vh;
    width: 100vw;
  }

  .qcoret {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min-content;
  }

  h1 {
    margin: 0;
    font-weight: 500;
    font-size: 17rem;
    line-height: 0.75;
    text-align: right;
    transform-origin: right;
    perspective: 100vh;
  }

  .v {
    display: inline-block;
    opacity: 0;
    width: 0;
  }
</style>
