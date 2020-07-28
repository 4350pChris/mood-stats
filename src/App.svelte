<script lang="ts">
  import "./styles/index.css"
  import "@fortawesome/fontawesome-free/js/all.js"
  import Journal from "./components/journal/Journal.svelte"
  import { contacts } from "./stores/contacts"
  import { journal } from "./stores/journal"
  import { activities } from "./stores/activities"
  import Charts from "./components/charts/Charts.svelte"
  import { MonicaClient } from "./stores/api"

  const initToken = localStorage.getItem("token")

  if (initToken !== null) {
    MonicaClient.token = initToken
  }

  let token: string

  function saveToken() {
    localStorage.setItem("token", token)
    MonicaClient.token = token
  }
</script>

<main class="container mx-auto flex flex-col">
  {#if !MonicaClient.token}
    <textarea class="border my-4" placeholder="Paste your token here" rows={16} bind:value={token} />
    <button class="btn btn-blue" type="button" on:click={saveToken}>Save</button>
  {:else}
    {#await Promise.all([contacts.fetchAll(), journal.fetchAll(), activities.fetchAll()])}
      <div class="spinner-xl min-h-screen" />
    {:then _}
      <h1 class="text-4xl mb-4">Charts</h1>
      <Charts />
      <h1 class="text-4xl mb-4">Journal</h1>
      <Journal />
    {/await}
  {/if}
</main>
