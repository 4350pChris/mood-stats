import { writable } from 'svelte/store';
import type { User } from '../models/user';
import { MonicaClient } from './api';

const { subscribe, set } = writable<User | null>(null);

const client = new MonicaClient<User, {}>('me')

export const user = {
  async fetchUser() {
    const res = await client.request<User>();
    set(res.data);
  },
  subscribe
}
