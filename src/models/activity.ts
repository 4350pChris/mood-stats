import type { Contact } from './contact';

export interface ApiActivity {
  id: number
  summary: string
  descriptiong: string
  happened_at: string
  attendees: {
    total: number
    contacts: Contact[]
  }
}

export interface Activity extends Omit<ApiActivity, 'attendees'> {
  contacts: number[]
}
