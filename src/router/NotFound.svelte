<script lang="ts">
  import { register, activeRoute } from "./Router.svelte";
  // page.js catch all handler
  export let path = "*";
  export let component: any = null;
  // need to set empty middlware. Otherwise we get an error
  register({ path, component, middleware: [] });
</script>

{#if $activeRoute.path === path}
  <svelte:component this={component} />
  <slot>
    <h2 class="text-2xl">
      This site could not be found.
    </h2>
  </slot>
{/if}