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
  import { icon } from "@fortawesome/fontawesome-svg-core";
  import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
  import { faKey } from '@fortawesome/free-solid-svg-icons';
  import { activeRoute } from "../../router/Router.svelte";
  
  const active = (node: HTMLAnchorElement) => {
    node.classList.toggle('active', node.href === $activeRoute.path);
  }

  const keyIcon = icon(faKey).html
  const mailIcon = icon(faEnvelope).html
</script>

<div class="w-full px-4 z-10 fixed bg-white shadow flex justify-between items-center h-12">
  <nav class="flex items-center flex-grow">
    <a class="mr-4" href="/" use:active>Journal</a>
    <a class="mr-4" href="/charts" use:active>Charts</a>
    <a class="text-lg ml-auto mr-4" href="/token" use:active>
      {@html keyIcon}
      Token
    </a>
  </nav>
  <div>
    <span>{$user?.first_name}</span>
    <span>{$user?.last_name}</span>
    <span class="mx-2">
      {@html mailIcon}
      {$user?.email}
    </span>
  </div>
</div>
