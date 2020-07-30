<script lang="ts">
  import { library, icon } from '@fortawesome/fontawesome-svg-core'
  import { faStar as liquidStar } from '@fortawesome/free-regular-svg-icons';
  import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
  import { createEventDispatcher } from "svelte";

  export let disabled: boolean = false
  export let rating: number

  library.add(liquidStar, solidStar)

  let hoverRating: number = 0;
  const dispatch = createEventDispatcher();
  const ratings = [1, 2, 3, 4, 5]
</script>

<div class="flex w-20">
  {#each ratings as star}
    <button
      class="btn btn-link rounded-full text-yellow-500"
      class:pointer-events-none={disabled}
      type="button"
      {disabled}
      title={`${star} stars`}
      on:click={() => dispatch("click", star)}
      on:mouseenter={() => hoverRating = star}
      on:mouseleave={() => hoverRating = 0}
    >
      {@html icon(star <= (hoverRating > 0 ? hoverRating : rating) ? solidStar : liquidStar).html}
    </button>
  {/each}
</div>
