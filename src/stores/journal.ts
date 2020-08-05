import { writable } from 'svelte/store';
import type { JournalEntry, NewJournalEntry, ApiJournalEntry } from '../models/journalEntry';
import { MonicaClient } from './api';

const client = new MonicaClient<ApiJournalEntry, NewJournalEntry>('journal');

const { set, update, subscribe } = writable<JournalEntry[]>([]);

function parseApiResponse(entry: ApiJournalEntry): JournalEntry {
  let post = entry.post;
  const cons = [];
  let match = post.match(/<p>with: ([\d, ]*)<\/p>/)
  if (match !== null) {
    const ids = match[1].split(',').map(s => Number(s.trim()));
    cons.push(...ids);
    post = post.replace(match[0], "");
  }

  let rating = 0;
  match = post.match(/<p>rating: (\d)<\/p>/)
  if (match !== null) {
    rating = parseInt(match[1])
    post = post.replace(match[0], '')
  }

  return { ...entry, post, contacts: cons, rating };
}

function toApiForm({ contacts, rating, post }: Partial<JournalEntry>): string {
  if (contacts !== undefined && contacts.length > 0) {
    post = post + "<p>with: " + contacts.join(", ") + "</p>";
  }

  if (rating) {
    post = post + `<p>rating: ${rating}</p>`
  }

  return post ?? "";
}

export const journal = {
  async fetchAll() {
    const journals = await client.getAll();
    const parsed = await Promise.all(journals.map(parseApiResponse));
    set(parsed);
  },
  async create(entry: NewJournalEntry) {
    const post = toApiForm(entry);
    const journal = await client.create({ ...entry, post });
    const parsed = parseApiResponse(journal);
    update(arr => ([...arr, parsed]));
  },
  async delete(id: number) {
    await client.delete(id);
    update(arr => arr.filter(j => j.id !== id));
  },
  async edit(entry: JournalEntry) {
    const post = toApiForm(entry);
    const journal = await client.edit({ id: entry.id, title: entry.title, post });
    const parsed = parseApiResponse(journal);
    update(arr => {
      const i = arr.findIndex(({ id }) => id === entry.id);
      arr.splice(i, 1, parsed);
      return arr;
    });
  },
  subscribe
};
