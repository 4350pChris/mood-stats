import { writable } from 'svelte/store';
import type { Contact } from '../models/contact';
import { client } from './api';

const { subscribe, set } = writable<Contact[]>([]);

const path = '/contacts';

export const contacts = {
  async search(query: string) {
    const res = await client<Contact[]>(`${path}?query=${query}`)
    set(res);
  },
  async getContact(id: number) {
    return client<Contact>([path, id].join('/'));
  },
  subscribe
}