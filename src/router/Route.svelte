<script context="module" lang="ts">
  export interface Route {
    path: string
    component: any
    middleware: PageJS.Callback[]
    params?: PageJS.Context["params"]
  }
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { register, activeRoute } from "./Router.svelte";
  export let path = "/";
  export let component: any = null;
  export let middleware: PageJS.Callback[] = [];
  // page.js params placeholder
  let params = {};
  register({ path, component, middleware });
  $: if ($activeRoute.path === path) {
    params = $activeRoute.params;
  }
</script>

<!-- if this is current active route -->
{#if $activeRoute.path === path}
  <div in:fade={{ duration: 300 }}>
    <!-- prefer component over slot -->
    {#if $activeRoute.component}
      <svelte:component
        this={$activeRoute.component}
        {...$$restProps}
        {...params} />
    {:else}
      <slot {params} />
    {/if}
  </div>
{/if}