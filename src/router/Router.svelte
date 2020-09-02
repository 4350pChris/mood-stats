<script context="module" lang="ts">
  import { writable } from "svelte/store";
  import type { Route } from "./Route.svelte";
  const routes: Record<string, Route> = {};
  // default must be an empty object otherwise we will get a null reference
  export const activeRoute = writable<Route>({} as Route);
  // register route from the Route.svelte
  export const register = (route: Route) => {
    routes[route.path] = route;
  };
</script>

<script lang="ts">
  import page from "page";
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  export let disabled = false;
  export let basePath: string | undefined = undefined;
  
  let spinner: boolean;

  // this is where we set the active component
  const last = (route: Route) => 
    (ctx: PageJS.Context) => {
      $activeRoute = { ...route, params: ctx.params };
    };

  const setSpinner: ((state: boolean) => PageJS.Callback) = state => (ctx, next) => {
    spinner = state;
    next();
  };

  $: console.log(spinner);

  const setupPage = () => {
    for (let [path, route] of Object.entries(routes)) {
      page(path, setSpinner(true), ...route.middleware, setSpinner(false), last(route));
    }
    // set the base url path for our router
    if (basePath) {
      page.base(basePath);
    }
    // setup page and its click handlers
    page.start();
  };
  // wire up the router when component is mounted
  onMount(setupPage);
  // remove click event handlers when component is unmounted
  onDestroy(page.stop);
</script>

<!-- don't render anything if component is disabled -->
{#if !disabled}
  {#if spinner}
    <div class="spinner-xl min-h-screen -mt-16 -mb-2" />
  {/if}
  <slot />
{/if}