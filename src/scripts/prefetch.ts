import { listen } from 'quicklink';
import { slugs } from '../pages/[slug]';

const ignores = (s: string) => {
  const path = new URL(s).pathname;
  return path.replace('/', '') in slugs || location.pathname === path;
}

export const quicklink = () => window.addEventListener('load', listen({ ignores }));