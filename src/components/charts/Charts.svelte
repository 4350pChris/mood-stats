<script lang="ts">
  import TimeSpentTogether from "./TimeSpentTogether.svelte"
  import { journal } from "../../stores/journal";
  import { activities } from "../../stores/activities";
  
  let contactIds: number[];
  $: contactIds = [...$journal, ...$activities].flatMap(({ contacts }) => contacts);
</script>

<TimeSpentTogether {contactIds} />
