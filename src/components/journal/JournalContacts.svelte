<script lang="ts">
  import type { Contact } from "../../models/contact"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { contacts as contactsStore } from '../../stores/contacts';

  export let contacts: number[]
  export let deletable: boolean = false;

  const dispatch = createEventDispatcher()

  let contactObjects: Contact[];

  $: contactObjects = contacts.map(id => $contactsStore.find(c => c.id === id));
</script>

<div class="my-2">
  {#each contactObjects as contact (contact.id)}
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
      transition:fade|local={{ duration: 200 }}
    >
      {#if deletable}
        <button class="p-1 -ml-1" type="button" on:click={() => dispatch('click', contact)}>
          <i class="far fa-times-circle fa-lg rounded-full hover:bg-gray-400" />
        </button>
      {/if}
      {contact.first_name} {contact.last_name || ''}
    </span>
  {/each}
</div>
