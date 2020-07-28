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

export type NewJournalEntry = Pick<ApiJournalEntry, 'title' | 'post'>

export type JournalEntry = ApiJournalEntry & { contacts: number[] };
