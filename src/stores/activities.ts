import { writable } from 'svelte/store';
import { MonicaClient } from './api';
import type { Activity, ApiActivity } from '../models/activity';

const { subscribe, set } = writable<Activity[]>([]);

const client = new MonicaClient<ApiActivity, {}>('activities');

export const activities = {
  async fetchAll() {
    const res = await client.getAll();
    const activities = res.map(({ attendees, ...rest }) => ({ ...rest, contacts: attendees.contacts.map(c => c.id)}))
    set(activities);
  },
  subscribe
}