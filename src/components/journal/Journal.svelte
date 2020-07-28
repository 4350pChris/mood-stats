<script lang="ts">
  import { fade } from "svelte/transition"
  import { journal } from "../../stores/journal"
  import JournalEntryCard from "./JournalEntryCard.svelte"
  import JournalEntryInput from "./JournalEntryInput.svelte"
  import type { JournalEntry, NewJournalEntry } from "../../models/journalEntry"

  let sortedJournals: JournalEntry[]
  let editing: number

  $: sortedJournals = $journal.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  function handleCreation({ detail: entry }: { detail?: JournalEntry }) {
    journal.create(entry)
  }

  function handleDeletion(id: number) {
    journal.delete(id)
  }

  async function handleEdit({ detail }: { detail?: JournalEntry }) {
    await journal.edit({ id: editing, ...detail })
    editing = -1
  }
</script>

<JournalEntryInput text="Create" on:submit={handleCreation} />
{#each sortedJournals as entry (entry.id)}
  <div in:fade={{ duration: 250 }} class="mb-2">
    {#if editing === entry.id}
      <JournalEntryInput text="Done" cancel {entry} on:submit={handleEdit} on:cancel={() => (editing = -1)} />
    {:else}
      <JournalEntryCard {entry} on:delete={() => handleDeletion(entry.id)} on:edit={() => (editing = entry.id)} />
    {/if}
  </div>
{/each}
