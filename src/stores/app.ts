import { writable } from 'svelte/store';

export const initialized = writable<boolean>(false);