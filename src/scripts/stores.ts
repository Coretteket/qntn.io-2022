import { writable } from 'svelte/store';
import type { Dict, Locale, Theme } from './types';

export const theme = writable<Theme>('auto');
export const locale = writable<Locale>('en');
export const dict = writable<Dict | undefined>();
export const loading = writable(false);
