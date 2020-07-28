<script lang="ts">
  import "./styles/index.css"
  import "@fortawesome/fontawesome-free/js/all.js"
  import Journal from "./components/journal/Journal.svelte"
  import { contacts } from "./stores/contacts"
  import { journal } from "./stores/journal"
  import { activities } from "./stores/activities"
  import Charts from "./components/charts/Charts.svelte"
  import { MonicaClient } from "./stores/api"
  import Navbar from "./components/navbar/Navbar.svelte"
  import { user } from "./stores/user"
  import { initialized } from "./stores/app"
  import Router, { wrap, replace } from "svelte-spa-router"
  import Token from "./components/Token.svelte"

  function checkToken() {
    return localStorage.getItem("token") !== null
  }

  const routes = {
    "/": wrap(Journal, checkToken),
    "/journal": wrap(Journal, checkToken),
    "/charts": wrap(Charts, checkToken),
    "/token": Token,
  }

  function routeLoaded() {
    const token = localStorage.getItem("token")
    if (token !== MonicaClient.token) {
      MonicaClient.token = token
    }
    if (MonicaClient.token && !$initialized) {

      Promise.all([contacts.fetchAll(), journal.fetchAll(), activities.fetchAll(), user.fetchUser()]).finally(
        () => ($initialized = true)
      )
    }
  }
</script>

<Navbar />
<main class="container mx-auto flex flex-col pt-16 mb-2">
  {#if !$initialized && MonicaClient.token}
    <div class="spinner-xl min-h-screen -mt-16 -mb-2" />
  {/if}
  <Router {routes} on:conditionsFailed={() => replace('/token')} on:routeLoaded={routeLoaded} />
</main>
