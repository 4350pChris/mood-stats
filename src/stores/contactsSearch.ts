import { writable } from 'svelte/store';
import type { Contact } from '../models/contact';
import {  MonicaClient } from './api';

const { subscribe, set } = writable<Contact[]>([]);

const client = new MonicaClient<Contact, {}>('contacts');

export const contacts = {
  async search(query: string) {
    const res = await client.request<Contact[]>('', { query: { query }})
    set(res.data);
  },
  subscribe
}