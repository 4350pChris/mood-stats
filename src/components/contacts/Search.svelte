<style>
  .contacts {
    max-height: 12rem;
    @apply py-2 shadow overflow-y-scroll;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { flip } from "svelte/animate"
  import { contacts } from "src/stores/contactsSearch"
  import debounce from "debounce"

  const dispatch = createEventDispatcher()
  let term: string = ""
  let focus: boolean = false

  $: if (term) search(term)

  const search = debounce(contacts.search, 300)
</script>

<input class="border-b w-full" placeholder="Search contacts..." bind:value={term} on:focus={() => (focus = true)} />
{#if term}
  <ul class="contacts">
    {#each $contacts as contact (contact.id)}
      <li
        class="py-2 px-4 hover:bg-blue-100 cursor-pointer"
        on:click={() => dispatch('click', contact)}
        animate:flip={{ duration: 200 }}
      >
        {contact.first_name} {contact.last_name || ''}
      </li>
    {:else}
      <li class="py-2 px-4">No contact found</li>
    {/each}
  </ul>
{/if}
