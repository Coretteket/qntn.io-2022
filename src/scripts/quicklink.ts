import { listen } from 'quicklink';
import { slugs } from '../pages/[slug]';
const ignores = (s: string) => new URL(s).pathname.replace('/', '') in slugs;
window.addEventListener('load', listen({ ignores }));