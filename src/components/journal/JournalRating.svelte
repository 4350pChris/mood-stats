<script lang="ts">
  import { library, icon } from '@fortawesome/fontawesome-svg-core'
  import { faStar as liquidStar, faSmileBeam, faFrown } from '@fortawesome/free-regular-svg-icons';
  import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
  import { createEventDispatcher } from "svelte";

  export let disabled: boolean = false
  export let rating: number

  library.add(liquidStar, solidStar, faSmileBeam, faFrown)

  let hoverRating: number = 0;
  const dispatch = createEventDispatcher();
  const ratings = Array.from(Array(10), (_, i) => i + 1)
</script>

<div class="flex items-center justify-center">
  <span class="mr-4">
    {@html icon(faFrown, { classes: ["text-red-700"], transform: { size: 32 } }).html}
  </span>
  {#each ratings as star}
    <button
      class="btn btn-link rounded-full text-yellow-500"
      class:pointer-events-none={disabled}
      type="button"
      {disabled}
      title={`rate ${star} out of 10`}
      on:click={() => dispatch("click", star)}
      on:mouseenter={() => hoverRating = star}
      on:mouseleave={() => hoverRating = 0}
    >
      {@html icon(star <= (hoverRating > 0 ? hoverRating : rating) ? solidStar : liquidStar).html}
    </button>
  {/each}
  <span class="ml-4">
    {@html icon(faSmileBeam, { classes: ["text-green-700"], transform: { size: 32 } }).html}
  </span>
</div>
