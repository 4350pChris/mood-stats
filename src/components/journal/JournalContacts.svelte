<script lang="ts">
  import type { Contact } from "../../models/contact"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"

  export let contacts: Contact[]
  export let deletable: boolean = false;

  const dispatch = createEventDispatcher()
</script>

<div class="my-2">
  {#each contacts as contact (contact.id)}
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
      transition:fade|local={{ duration: 200 }}
    >
      {#if deletable}
        <button class="p-1 -ml-1" type="button" on:click={() => dispatch('click', contact)}>
          <i class="far fa-times-circle fa-lg" />
        </button>
      {/if}
      {contact.first_name} {contact.last_name || ''}
    </span>
  {/each}
</div>
