<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { slide } from "svelte/transition"
  import marked from "marked"
  import DOMPurify from "dompurify"
  import type { JournalEntry } from "../../models/journalEntry"
  import type { Contact } from "../../models/contact"
  import Search from "src/components/contacts/Search.svelte"
  import JournalContacts from "./JournalContacts.svelte"
  import JournalRating from "./JournalRating.svelte";

  export let text: string
  export let cancel: boolean = false

  const defaultEntry = { title: "", post: "", contacts: [], rating: 0 };
  
  export let entry: Pick<JournalEntry, "title" | "post" | "contacts" | "rating"> = { ...defaultEntry };

  let preview: boolean = true

  let markdown: string
  $: markdown = DOMPurify.sanitize(marked(entry.post))

  const dispatch = createEventDispatcher()

  function handleSubmit() {
    dispatch("submit", entry)
    entry = { ...defaultEntry };
  }

  function handleCancel() {
    dispatch("cancel")
  }

  async function contactClicked({ detail }: { detail: Contact }) {
    if (entry.contacts.find((id) => detail.id === id) === undefined) {
      entry.contacts = [...entry.contacts, detail.id]
    }
  }

  function removeContact({ detail }: { detail: Contact }) {
    entry.contacts = entry.contacts.filter((id) => detail.id !== id)
  }
</script>

<form
  class="w-full flex flex-col bg-white shadow rounded px-8 py-4 mb-4"
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
  <div class="my-2">
    <JournalRating rating={entry.rating} on:click={({ detail }) => entry.rating = detail} />
    <JournalContacts contacts={entry.contacts} deletable on:click={removeContact} />
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
  <div class="flex justify-between">
    <button class="btn btn-blue" type="submit">{text}</button>
    {#if cancel}
      <button class="btn btn-link btn-gray" type="reset" on:click|preventDefault={handleCancel}>cancel</button>
    {/if}
  </div>
</form>
