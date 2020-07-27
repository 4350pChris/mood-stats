import { writable } from 'svelte/store';
import type { JournalEntry, NewJournalEntry, ApiJournalEntry } from '../models/journalEntry';
import { client } from './api';
import { contacts } from "./contacts";

const { set, update, subscribe } = writable<JournalEntry[]>([]);

const path = '/journal';

async function parseApiResponse(entry: ApiJournalEntry): Promise<JournalEntry> {
  let post = entry.post;
  const cons = [];
  const match = post.match(/<p>with: ([\d, ]*)<\/p>/)
  if (match !== null) {
    const ids = match[1].split(',').map(s => Number(s.trim()));
    const res = await Promise.all(ids.map(id => contacts.getContact(id)))
    cons.push(...res);
    post = post.replace(match[0], "");
  }

  return { ...entry, post, contacts: cons };
}

function toApiForm({ contacts, post, ...rest }: NewJournalEntry) {
  if (contacts.length > 0) {
    post = post + "<p>with: " + contacts.map(({ id }) => id).join(", ") + "</p>";
  }
  return { ...rest, post }
}

export const journal = {
  async fetchAll() {
    const journals = await client<ApiJournalEntry[]>(path);
    const parsed = await Promise.all(journals.map(parseApiResponse));
    set(parsed);
  },
  async create(entry: NewJournalEntry) {
    const { title, post } = toApiForm(entry);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("post", post);
    const journal = await client<ApiJournalEntry>(path, { method: 'POST', body: formdata })
    const parsed = await parseApiResponse(journal);
    update(arr => ([...arr, parsed]));
  },
  async delete(id: JournalEntry['id']) {
    await client([path, id].join('/'), { method: 'DELETE' });
    update(arr => arr.filter(j => j.id !== id));
  },
  async edit(entry: NewJournalEntry & Pick<JournalEntry, 'id'>) {
    const { id } = entry;
    const { title, post } = toApiForm(entry);
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("title", title);
    body.append("post", post);
    const requestOptions = {
      method: 'PUT',
      headers,
      body,
    };
    const journal = await client<ApiJournalEntry>([path, id].join('/'), requestOptions)
    const parsed = await parseApiResponse(journal);
    update(arr => {
      const i = arr.findIndex(({ id }) => id === entry.id);
      arr.splice(i, 1, parsed);
      return arr;
    });
  },
  subscribe
};
