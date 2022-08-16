import { browser } from '$app/env';
import { readable, writable } from 'svelte/store';
import type { Dict, Locale, Theme } from './types';

export const theme = writable<Theme>('auto');
export const locale = writable<Locale>('en');
export const dict = writable<Dict>({});

const getMotionPreference = () => browser && window.matchMedia('(prefers-reduced-motion)').matches;
export const reducedMotion = readable(getMotionPreference());
