<script lang="ts">
  import { fade } from "svelte/transition"
  import { journal } from "src/stores/journal"
  import JournalEntryCard from "./JournalEntryCard.svelte"
  import JournalEntryInput from "./JournalEntryInput.svelte"
  import type { JournalEntry } from "src/models/journalEntry"
  import { initialized } from "src/stores/app"

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

{#if $initialized}
  <div class="flex flex-col items-center" in:fade>
    <JournalEntryInput text="Create" on:submit={handleCreation} />
    {#each sortedJournals as entry (entry.id)}
      <div in:fade|local={{ duration: 250 }} class="mb-2 w-full">
        {#if editing === entry.id}
          <JournalEntryInput text="Done" cancel {entry} on:submit={handleEdit} on:cancel={() => (editing = -1)} />
        {:else}
          <JournalEntryCard {entry} on:delete={() => handleDeletion(entry.id)} on:edit={() => (editing = entry.id)} />
        {/if}
      </div>
    {/each}
  </div>
{/if}
