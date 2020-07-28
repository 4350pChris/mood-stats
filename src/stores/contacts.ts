import { writable } from 'svelte/store';
import type { Contact } from '../models/contact';
import { MonicaClient } from './api';

const { subscribe, set } = writable<Contact[]>([]);

const client = new MonicaClient<Contact, {}>('contacts');

export const contacts = {
  async fetchAll() {
    const res = await client.getAll();
    set(res);
  },
  subscribe
}