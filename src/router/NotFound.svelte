<script lang="ts">
  import Route from "./Route.svelte"
  // page.js catch all handler
  export let path = "*"
  export let component: any = null
</script>

<Route {path} {component}>
  <slot>
    <h2 class="text-2xl">This site could not be found.</h2>
  </slot>
</Route>
