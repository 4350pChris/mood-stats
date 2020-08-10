<script lang="ts">
  import TimeSpentTogether from "./TimeSpentTogether.svelte"
  import { journal } from "../../stores/journal"
  import { activities } from "../../stores/activities"
  import { initialized } from "../../stores/app"
  import { fade } from "svelte/transition"
  import Mood from "./Mood.svelte"

  let contactIds: number[]
  $: contactIds = [...$journal, ...$activities].flatMap(({ contacts }) => contacts)
</script>

{#if $initialized}
  <section class="mb-4">
    <h1 class="text-2xl mb-2">Mood Calendar</h1>
    <Mood />
  </section>
  <section>
    <h1 class="text-2xl mb-2">Time spent together</h1>
    <TimeSpentTogether {contactIds} />
  </section>
{/if}
