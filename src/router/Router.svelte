<script lang="ts">
  import page from "page"
  import { onMount, onDestroy } from "svelte"
  import type { Route } from "./store"
  import { activeRoute } from "./store"
  import { routes } from "./store"

  export let disabled = false
  export let basePath: string | undefined = undefined

  let spinner: boolean

  // this is where we set the active component
  const last = (route: Route) => (ctx: PageJS.Context) => {
    $activeRoute = { ...route, params: ctx.params }
  }

  const setSpinner: (state: boolean) => PageJS.Callback = (state) => (ctx, next) => {
    spinner = state
    next()
  }

  const setupPage = () => {
    for (let [path, route] of Object.entries($routes)) {
      page(path, setSpinner(true), ...route.middleware, setSpinner(false), last(route))
    }
    // set the base url path for our router
    if (basePath) {
      page.base(basePath)
    }
    // setup page and its click handlers
    page.start()
  }
  // wire up the router when component is mounted
  onMount(setupPage)
  // remove click event handlers when component is unmounted
  onDestroy(page.stop)
</script>

<!-- don't render anything if component is disabled -->
{#if !disabled}
  {#if spinner}
    <div class="spinner-xl min-h-screen -mt-16 -mb-2" />
  {/if}
  <slot />
{/if}
