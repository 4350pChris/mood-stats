<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { slide } from "svelte/transition"
  import marked from "marked"
  import DOMPurify from "dompurify"
  import type { JournalEntry } from "../../models/journalEntry"
  import Search from "../contacts/Search.svelte"
  import type { Contact } from "../../models/contact"
  import { contacts } from "../../stores/contacts"
  import JournalContacts from "./JournalContacts.svelte"

  export let text: string
  export let entry: Pick<JournalEntry, "title" | "post" | "contacts"> = { title: "", post: "", contacts: [] }

  let preview: boolean = true

  let markdown: string
  $: markdown = DOMPurify.sanitize(marked(entry.post))

  const dispatch = createEventDispatcher()

  function handleSubmit() {
    dispatch("submit", entry)
  }

  async function contactClicked({ detail }: { detail?: Contact }) {
    const contact = await contacts.getContact(detail.id)
    if (entry.contacts.find(({ id }) => contact.id === id) === undefined) {
      entry.contacts = [...entry.contacts, contact]
    }
  }

  function removeContact({ detail }: { detail?: Contact }) {
    entry.contacts = entry.contacts.filter(({ id }) => detail.id !== id);
  }
</script>

<div class="w-full max-w-md">
  <form
    class="flex flex-col bg-white shadow-md rounded px-8 py-4 mb-4"
    on:submit|preventDefault={handleSubmit}
    autocomplete="off"
  >
    <input
      class="mb-2 border-b"
      id="title"
      name="title"
      bind:value={entry.title}
      placeholder="Title"
      required
      maxlength={255}
    />
    <textarea
      class="mb-2 border"
      id="post"
      name="post"
      bind:value={entry.post}
      placeholder="What happened today?"
      required
      maxlength={1000000}
      rows={6}
    />
    <JournalContacts contacts={entry.contacts} deletable={true} on:click={removeContact} />
    <div class="my-2">
      <Search on:click={contactClicked} />
    </div>
    <label class="my-2">
      <input type="checkbox" bind:checked={preview} />
      Preview
    </label>
    {#if preview}
      <div class="prose prose-sm mb-4 p-2 bg-gray-100" transition:slide|local>
        {@html markdown}
      </div>
    {/if}
    <button class="btn btn-blue self-start" type="submit">{text}</button>
  </form>
</div>
