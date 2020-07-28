<script lang="ts">
  import "./styles/index.css"
  import "@fortawesome/fontawesome-free/js/all.js"
  import Journal from "./components/journal/Journal.svelte"
  import { contacts } from "./stores/contacts"
  import { journal } from "./stores/journal"
</script>

<main class="container mx-auto flex flex-col">
  {#await Promise.all([contacts.fetchAll(), journal.fetchAll()])}
    <div class="spinner-xl min-h-screen" />
  {:then _}
    <h1 class="text-4xl mb-4">Journal</h1>
    <Journal />
  {/await}
</main>
