import { writable } from "svelte/store";

export const locale = writable('nl');
export const route = writable('index');

export const screenH = writable(1);
export const screenW = writable(1);
export const scrollY = writable(0);
export const mouse = writable({ x: 0, y: 0 });