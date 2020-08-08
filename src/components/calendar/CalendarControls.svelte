<script lang="ts">
  import { library, icon } from '@fortawesome/fontawesome-svg-core'
  import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

  library.add(faArrowLeft, faArrowRight)

  export let year: number;
  export let month: number;

  function incMonth() {
    if (month === 11) {
      month = 1
      year += 1
    } else {
      month += 1
    }
  }

  function decMonth() {
    if (month === 0) {
      month = 11
      year -= 1
    } else {
      month -= 1
    }
  }
</script>

<div class="flex justify-between items-center p-2">
  <button class="btn btn-link btn-icon btn-gray" title="previous month" on:click={decMonth}>
    {@html icon(faArrowLeft).html}
  </button>
  <div>
    <span class="font-bold flex-grow">
      {(new Date(year, month, 1)).toLocaleString(navigator.language, { month: 'long' })}
    </span>
    <input class="font-bold w-24" type="number" bind:value={year}>
  </div>
  <button class="btn btn-icon btn-link btn-gray" title="next month" on:click={incMonth}>
    {@html icon(faArrowRight).html}
  </button>
</div>