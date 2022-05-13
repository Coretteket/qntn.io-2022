<script>
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/dist/SplitText.js';
  import { onMount } from 'svelte';

  import { spring } from 'svelte/motion';

  onMount(() => {
    const split = new SplitText('.qc h1', { type: 'lines' });
    const tl = gsap.timeline();

    tl.fromTo(
      '.qc',
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
        x: '10vw',
        rotateY: 20,
      },
      {
        x: 0,
        rotateY: 0,
        duration: 2,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=1.5'
    );
  });

  const coords = spring({ x: 0, y: 0 }, { stiffness: 0.03, damping: 0.2 });

  const handleMouseMove = (e) => {
    coords.set({
      x: (e.clientX / window.innerWidth) * -10 + 5,
      y: (e.clientY / window.innerHeight) * -10 + 5,
    });
  };
</script>

<section on:mousemove={handleMouseMove} on:mousedown={() => console.log($coords)}>
  <div style:transform="translate({$coords.x}px, {$coords.y}px)" class="qc">
    <h1>quinten coret</h1>
  </div>
</section>

<style>
  section {
    background: radial-gradient(circle, rgba(20, 1, 20, 1) 0%, rgba(22, 10, 22, 1) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .qc {
    width: min-content;
    user-select: none;
  }

  h1 {
    font-family: 'Newsreader', serif;
    margin: 0;
    color: #ffffff;
    font-weight: 100;
    font-size: 19vw;
    line-height: 0.6;
    text-align: right;
    transform-origin: right;
    perspective: 100vh;
    transform-style: preserve-3d;
  }

  .v {
    display: inline-block;
    opacity: 0;
    width: 0;
  }
</style>
