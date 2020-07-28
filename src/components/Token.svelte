<script lang="ts">
  import { push } from "svelte-spa-router"
  import { fade } from "svelte/transition"

  let token: string = localStorage.getItem("token")

  function saveToken() {
    localStorage.setItem("token", token)
    push("/")
  }
</script>

<div in:fade class="flex flex-col">
  <textarea class="border my-4" placeholder="Paste your token here" rows={16} bind:value={token} />
  <button class="btn btn-blue" type="button" on:click={saveToken}>Save</button>
</div>
