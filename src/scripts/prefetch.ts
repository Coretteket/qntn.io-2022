import { listen } from 'quicklink';
import { slugs } from '../pages/[slug]';

const ignores = (s: string) => new URL(s).pathname.replace('/', '') in slugs;

export const quicklink = () => window.addEventListener('load', listen({ ignores }));