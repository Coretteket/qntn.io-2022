import { writable, type Writable } from 'svelte/store';
import type { Locale, Theme } from './types';

export const theme: Writable<Theme> = writable('auto');
export const locale: Writable<Locale> = writable('en');

export const screenH = writable(1);
export const screenW = writable(1);
export const scrollY = writable(0);
export const mouse = writable({ x: 0, y: 0 });
