<script lang="ts">
  import { fade } from "svelte/transition"
  import { activeRoute } from "./store"
  import { routes } from "./store"

  export let path = "/"
  export let component: any = null
  export let middleware: PageJS.Callback[] = []
  // page.js params placeholder
  let params = {}
  routes.register({ path, component, middleware })
  $: if ($activeRoute.path === path) {
    params = $activeRoute.params
  }
</script>

<!-- if this is current active route -->
{#if $activeRoute.path === path}
  <div in:fade={{ duration: 250 }}>
    <!-- prefer component over slot -->
    {#if $activeRoute.component}
      <svelte:component this={$activeRoute.component} {...$$restProps} {...params} />
    {:else}
      <slot {params} />
    {/if}
  </div>
{/if}
