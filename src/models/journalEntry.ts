import type { Contact } from './contact';
export interface ApiJournalEntry {
    created_at: string
    id: number
    object: "entry"
    post: string
    title: string
    updated_at: string
    url: string
}

export interface JournalEntry extends ApiJournalEntry {
    contacts: Contact[];
}

export type NewJournalEntry = Pick<JournalEntry, 'title' | 'post' | 'contacts'>
