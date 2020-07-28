<style>
  :global(a) {
    @apply text-gray-600 text-3xl transition-colors duration-300 ease-in-out;

    &.active {
      @apply text-gray-800;
    }
  }
</style>

<script lang="ts">
  import { user } from "../../stores/user"
  import { link } from "svelte-spa-router"
  import active from "svelte-spa-router/active"
</script>

<div class="w-full px-4 z-10 fixed bg-white shadow flex justify-between items-center h-12">
  <nav class="flex items-center flex-grow">
    <a class="mr-4" href="/journal" use:link use:active={/^(\/|\/journal)$/}>Journal</a>
    <a class="mr-4" href="/charts" use:link use:active>Charts</a>
    <a class="text-lg ml-auto mr-4" href="/token" use:link use:active>
      <i class="fas fa-key"></i>
      Token
    </a>
  </nav>
  {#if $user}
    <div>
      <span>{$user.first_name}</span>
      <span>{$user.last_name}</span>
      <span class="mx-2">
        <i class="far fa-envelope" />
        {$user.email}
      </span>
    </div>
  {/if}
</div>
