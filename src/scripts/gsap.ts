import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
