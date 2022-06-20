import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const headerParallax = (node: HTMLElement) => {
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

export const parallax = (node: HTMLElement) => {
  gsap.from(node, {
    y: '30%',
    scrollTrigger: {
      end: 'bottom bottom',
      trigger: node,
      scrub: 1,
    },
    ease: 'power1.out',
  });
};
