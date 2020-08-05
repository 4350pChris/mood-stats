<script lang="ts">
  import TimeSpentTogether from "./TimeSpentTogether.svelte"
  import { journal } from "src/stores/journal"
  import { activities } from "src/stores/activities"
  import { initialized } from "src/stores/app"
  import { fade } from "svelte/transition"

  let contactIds: number[]
  $: contactIds = [...$journal, ...$activities].flatMap(({ contacts }) => contacts)
</script>

{#if $initialized}
  <div in:fade class="bg-white rounded">
    <TimeSpentTogether {contactIds} />
  </div>
{/if}
