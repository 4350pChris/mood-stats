<script lang="ts">
  import { icon } from "@fortawesome/fontawesome-svg-core";
  import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
  import type { JournalEntry } from 'src/models/journalEntry';
  import { createEventDispatcher } from 'svelte';
  import JournalContacts from './JournalContacts.svelte';
  import JournalRating from './JournalRating.svelte';

  export let entry: JournalEntry;

  const editIcon = icon(faEdit).html;
  const trashIcon = icon(faTrashAlt).html;

  const dispatch = createEventDispatcher();
</script>

<div class="w-full rounded overflow-hidden shadow px-6 py-4">
  <div class="flex justify-between">
    {#if entry.title}
    <h2 class="font-bold text-xl mb-2">{entry.title}</h2>
    {/if}
    <JournalRating disabled rating={entry.rating} />
    <div class="text-gray-600 text-sm">{new Date(entry.created_at).toLocaleDateString()}</div>
  </div>
  <div class="prose prose-sm mb-2">
    {@html entry.post}
  </div>
  <JournalContacts contacts={entry.contacts} />
  <div class="flex justify-between">
    <button class="btn btn-link btn-blue" on:click={() => dispatch('edit')}>
      {@html editIcon}
      <span>edit</span>
    </button>
    <button class="btn btn-link btn-red" on:click={() => dispatch('delete')}>
      {@html trashIcon}
      <span>delete</span>
    </button>
  </div>
</div>
