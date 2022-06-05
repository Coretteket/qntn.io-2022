import gsap from 'gsap';

const loadScrollTrigger = async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
};

export const headerParallax = async (node: HTMLElement) => {
  await loadScrollTrigger();

  gsap.to(node, {
    backgroundPositionY: '20%',
    scrollTrigger: {
      trigger: node,
      start: `top ${node.getBoundingClientRect().top}px`,
      end: 'bottom top',
      scrub: true,
    },
  });
};
