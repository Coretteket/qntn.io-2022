<script>
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/dist/SplitText';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';

  import { spring } from 'svelte/motion';

  gsap.registerPlugin(ScrollTrigger);

  let scrollY;

  onMount(() => {
    const split = new SplitText('.qc h1', { type: 'lines' });
    const tl = gsap.timeline();

    tl.from('.qc', {
      clipPath: 'circle(0% at 0% 50%)',
      duration: 1.5,
      ease: 'power3.out',
    });

    tl.from(
      split.lines,
      {
        x: '10vw',
        rotateY: 20,
        duration: 2,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=1.5'
    );

    gsap.to('.qc', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: '-30vh',
      duration: 1,
    });

    gsap.to('.scroll', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: '-15vh',
      duration: 1,
    });
  });

  const coords = spring({ x: 0, y: 0 }, { stiffness: 0.03, damping: 0.2 });

  const handleMouseMove = (e) => {
    coords.set({
      x: (e.clientX / window.innerWidth) * -10 + 5,
      y: (e.clientY / window.innerHeight) * -10 + 5,
    });
  };
</script>

<svelte:window bind:scrollY />

<section id="hero" on:mousemove={handleMouseMove} on:mousedown={() => console.log($coords)}>
  <div class="qc">
    <h1 style:transform="translate({$coords.x}px, {$coords.y}px)">quinten coret</h1>
  </div>
  <div class="scroll"><i>Scroll down...</i></div>
</section>

<style>
  section {
    font-family: 'Newsreader', serif;
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
    clip-path: circle(140% at 0 50%);
  }

  .scroll {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }

  h1 {
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
