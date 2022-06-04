import { writable, type Writable } from 'svelte/store';
import type { Theme } from './types';

export const theme: Writable<Theme> = writable('auto');

export const screenH = writable(1);
export const screenW = writable(1);
export const scrollY = writable(0);
export const mouse = writable({ x: 0, y: 0 });
