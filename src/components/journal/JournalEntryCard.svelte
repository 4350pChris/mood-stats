<script lang="ts">
  import type { JournalEntry } from '../../models/journalEntry';
  import { createEventDispatcher } from 'svelte';
  import JournalContacts from './JournalContacts.svelte';

  export let entry: JournalEntry;

  const dispatch = createEventDispatcher();
</script>

<div class="max-w-md rounded overflow-hidden shadow">
  <div class="px-6 py-4">
    <div class="flex justify-between">
      {#if entry.title}
      <h2 class="font-bold text-xl mb-2">{entry.title}</h2>
      {/if}
      <div class="text-gray-600 text-sm">{new Date(entry.created_at).toLocaleDateString()}</div>
    </div>
    <div class="prose prose-sm mb-2">
      {@html entry.post}
    </div>
    <JournalContacts contacts={entry.contacts} />
    <div class="flex justify-between">
      <button class="btn btn-link btn-blue" on:click={() => dispatch('edit')}>
        <i class="fas fa-edit"></i>
        <span>edit</span>
      </button>
      <button class="btn btn-link btn-red" on:click={() => dispatch('delete')}>
        <i class="fas fa-trash-alt"></i>
        <span>delete</span>
      </button>
    </div>
  </div>
</div>
