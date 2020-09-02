<script lang="ts">
  import TimeSpentTogether from "./TimeSpentTogether.svelte"
  import { journal } from "../../stores/journal"
  import { activities } from "../../stores/activities"
  import { fade } from "svelte/transition"
  import Mood from "./Mood.svelte"

  let contactIds: number[]
  $: contactIds = [...$journal, ...$activities].flatMap(({ contacts }) => contacts)
</script>

<section class="mb-4 p-2 bg-white shadow">
  <h1 class="text-2xl mb-2">Mood Calendar</h1>
  <Mood />
</section>
<section class="bg-white p-2 shadow">
  <h1 class="text-2xl mb-2">Time spent together</h1>
  <TimeSpentTogether {contactIds} />
</section>
