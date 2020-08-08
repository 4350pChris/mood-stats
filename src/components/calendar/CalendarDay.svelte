<style>
  button:not(.current) {
    @apply bg-gray-100;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let day: Date
  export let current: boolean

  const dispatch = createEventDispatcher()
</script>

<button
  class="relative h-full w-full btn btn-link {current ? 'btn-blue' : 'btn-gray'}"
  class:current
  on:click={() => dispatch('click', day)}
>
  <span class="absolute top-0 left-0 p-2 {current ? 'text-gray-700' : 'text-gray-500'}">{day.getDate()}</span>
  <slot />
</button>
