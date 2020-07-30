<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { icon } from "@fortawesome/fontawesome-svg-core";
  import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
  import type { Contact } from "src/models/contact"
  import { contacts as contactsStore } from 'src/stores/contacts';

  export let contacts: number[]
  export let deletable: boolean = false;

  const dispatch = createEventDispatcher()

  let contactObjects: Contact[];

  const circle = icon(faTimesCircle, { classes: ['hover:bg-gray-400']}).html;

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
          {@html circle}
        </button>
      {/if}
      {contact.first_name} {contact.last_name || ''}
    </span>
  {/each}
</div>
